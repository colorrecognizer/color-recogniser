package com.longcode.colorRecogniser.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.longcode.colorRecogniser.config.ApiException;
import com.longcode.colorRecogniser.models.Color;
import com.longcode.colorRecogniser.models.enums.SelectionType;
import com.longcode.colorRecogniser.models.shallowModels.ContactUs;
import com.longcode.colorRecogniser.models.shallowModels.Point;
import com.longcode.colorRecogniser.models.shallowModels.diff.diff_match_patch;
import com.longcode.colorRecogniser.services.modelServices.ColorService;
import com.longcode.colorRecogniser.utils.EmailUtils;
import com.longcode.colorRecogniser.utils.GeometryUtils;
import com.longcode.colorRecogniser.utils.HttpUtils;
import com.longcode.colorRecogniser.utils.RandomUtils;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.mail.MessagingException;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Comparator.comparingInt;
import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toCollection;

@RestController
@RequestMapping("/api")
@Getter
public class ApiController {
    private ColorService colorService;

    @Value("${app.contact-email}")
    private String CONTACT_EMAIL;

    @Autowired
    public void setColorService(ColorService colorService) {
        this.colorService = colorService;
    }

    @GetMapping("/test")
    public ResponseEntity<String> test(@RequestParam String longParameter) {
        return ResponseEntity.ok("OK!");
    }

    private int getDistance(Color color1, Color color2) {
        return (color1.getRed() - color2.getRed()) * (color1.getRed() - color2.getRed())
                + (color1.getGreen() - color2.getGreen()) * (color1.getGreen() - color2.getGreen())
                + (color1.getBlue() - color2.getBlue()) * (color1.getBlue() - color2.getBlue());
    }

    @PostMapping("/recognise")
    public ResponseEntity<RecogniserResponse> recognise(@RequestParam("image") MultipartFile imageMultipartFile,
                                                        @RequestParam("recogniserRequest") String recogniserRequestString) {
        try {
            RecogniserRequest recogniserRequest = new ObjectMapper().readValue(recogniserRequestString, RecogniserRequest.class);
            BufferedImage image = ImageIO.read(imageMultipartFile.getInputStream());

            final int STEPS = 300;
            double minX = recogniserRequest.minX;
            double maxX = recogniserRequest.maxX;
            double minY = recogniserRequest.minY;
            double maxY = recogniserRequest.maxY;
            double ar = 0, ag = 0, ab = 0;
            int count = 0;
            List<Color> colors = new ArrayList<>();

            for (double px = minX; px < maxX; px += (maxX - minX) / STEPS) {
                for (double py = minY; py < maxY; py += (maxY - minY) / STEPS) {
                    boolean isInside = false;
                    switch (recogniserRequest.selectionType) {
                        case RECTANGLE -> isInside = true;
                        case ELLIPSE -> {
                            double centerX = (minX + maxX) / 2;
                            double centerY = (minY + maxY) / 2;
                            double mX = (maxX - minX) / 2;
                            double mY = (maxY - minY) / 2;
                            isInside = ((px - centerX) * (px - centerX)) / (mX * mX)
                                    + ((py - centerY) * (py - centerY)) / (mY * mY)
                                    <= 1;
                        }
                        case FREE -> isInside = GeometryUtils.checkInside(recogniserRequest.points, new Point(px, py));
                    }

                    if (isInside) {
                        ++count;
                        int clr = image.getRGB((int) px, (int) py);
                        int red = (clr & 0x00ff0000) >> 16;
                        int green = (clr & 0x0000ff00) >> 8;
                        int blue = clr & 0x000000ff;

                        colors.add(Color.builder()
                                .red((short) red)
                                .green((short) green)
                                .blue((short) blue)
                                .build());
                    }
                }
            }

            var mapper = new ObjectMapper();
            String jsonInput = mapper.writeValueAsString(colors);
            String apiUrl = String.format("http://localhost:5000/color/recognize?num-colors=%d", recogniserRequest.numColors); // Replace with your actual API URL
            String jsonOutput = HttpUtils.post(apiUrl, jsonInput);
            List<Color> allColors = this.colorService.getAll();
            RecogniserResponse response = RecogniserResponse.builder()
                    .colorCoverages(new ArrayList<>())
                    .build();

            double[][] colorCoverages = mapper.readValue(jsonOutput, double[][].class);

            for (double[] coverage : colorCoverages) {
                ColorCoverage colorCoverage = ColorCoverage.builder()
                        .color(Color.builder()
                                .red((short) coverage[0])
                                .green((short) coverage[1])
                                .blue((short) coverage[2])
                                .build())
                        .coveragePercentage(coverage[3])
                        .build();

                double total = Math.sqrt(Math.pow(Math.max(colorCoverage.color.getRed(), 255 - colorCoverage.color.getRed()), 2)
                        + Math.pow(Math.max(colorCoverage.color.getGreen(), 255 - colorCoverage.color.getGreen()), 2)
                        + Math.pow(Math.max(colorCoverage.color.getBlue(), 255 - colorCoverage.color.getBlue()), 2)
                );

                colorCoverage.setColorMatches(new ArrayList<>(allColors.stream()
                        .sorted((color1, color2) -> getDistance(colorCoverage.color, color1) - getDistance(colorCoverage.color, color2))
                        .limit(3)
                        .map(c -> ColorMatch.builder()
                                .color(c)
                                .matchPercentage(1 - Math.sqrt(getDistance(colorCoverage.color, c)) / total)
                                .build())
                        .toList()));

                response.getColorCoverages().add(colorCoverage);
            }

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            throw new ApiException(e.getMessage());
        }
    }

    // Inner class
    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    private static class RecogniserRequest {
        @NotNull
        private SelectionType selectionType;

        private double minX;
        private double maxX;
        private double minY;
        private double maxY;

        private int numColors;

        /**
         * Points for polygon. Assume that the polygon is not self-intersecting
         */
        private List<Point> points;
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    private static class RecogniserResponse {
        private List<ColorCoverage> colorCoverages;
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    private static class ColorCoverage {
        private Color color;
        private double coveragePercentage;
        private List<ColorMatch> colorMatches;
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    private static class ColorMatch {
        private Color color;
        private double matchPercentage;
    }

    @PostMapping("/generate-tfn")
    public ResponseEntity<String[]> generateTFN(@RequestBody String[] selectedDigits) {
        int len;
        if (selectedDigits.length == 2) {
            len = RandomUtils.randIntRange(8, 9);
        } else if (selectedDigits[0].equals("8")) {
            len = 8;
        } else len = 9;

        String tfn;
        do {
            tfn = randomizeBaseTFN(len);
        } while (!validateTFN(tfn));

        return ResponseEntity.ok(new String[]{tfn});
    }

    private boolean validateTFN(String tfn) {
        if (StringUtils.isEmpty(tfn))
            return false;

        if (tfn.length() != 8 && tfn.length() != 9)
            return false;

        int checksum = 0;
        int[] factors;
        if (tfn.length() == 9) {
            factors = new int[]{10, 7, 8, 4, 6, 3, 5, 2, 1};
        } else {
            factors = new int[]{10, 7, 8, 4, 6, 3, 5, 1};
        }

        for (int i = 0; i < tfn.length(); ++i) {
            checksum += (tfn.charAt(i) - '0') * factors[i];
        }

        return checksum % 11 == 0;
    }

    private String randomizeBaseTFN(int len) {
        String numericString = "0123456789";
        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(len);

        for (int i = 0; i < len; i++) {
            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int) (numericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            sb.append(numericString
                    .charAt(index));
        }

        return sb.toString();
    }

    @PostMapping("/diff")
    public ResponseEntity<LinkedList<diff_match_patch.Diff>> diff(@RequestBody String[] files) {
        if (files == null || files.length != 2)
            throw new ApiException("Invalid input!");

        try {
            var dmp = new diff_match_patch();
            var result = dmp.diff_main(files[0], files[1]);
            dmp.diff_cleanupSemantic(result);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            throw new ApiException(e.getMessage());
        }
    }

    @PostMapping("/send-contact-us")
    public void sendContactUs(@RequestBody @Valid ContactUs contactUs) {
        String subject = String.format("Color Recognizer User Feedback - %s", contactUs.getName());
        if (!StringUtils.isEmpty(contactUs.getCompanyName())) {
            subject += String.format(" from company [%s]", contactUs.getCompanyName());
        }

        String message = String.format("From email [%s]:\n", contactUs.getEmail());

        try {
            EmailUtils.sendEmail(
                    contactUs.getEmail(),
                    CONTACT_EMAIL,
                    subject,
                    message + contactUs.getMessage()
            );
        } catch (MessagingException | IOException e) {
            throw new ApiException(e.getMessage());
        }
    }
}
