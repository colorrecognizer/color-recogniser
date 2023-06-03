package com.longcode.colorRecogniser.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.longcode.colorRecogniser.config.ApiException;
import com.longcode.colorRecogniser.models.Color;
import com.longcode.colorRecogniser.models.enums.SelectionType;
import com.longcode.colorRecogniser.models.shallowModels.Point;
import com.longcode.colorRecogniser.services.modelServices.ColorService;
import com.longcode.colorRecogniser.utils.GeometryUtils;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import lombok.*;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@Getter
public class ApiController {
    private ColorService colorService;

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
    public ResponseEntity<List<Color>> recognise(@RequestParam("image") MultipartFile imageMultipartFile,
                                                 @RequestParam("recogniserRequest") String recogniserRequestString) {
        try {
            RecogniserRequest recogniserRequest = new ObjectMapper().readValue(recogniserRequestString, RecogniserRequest.class);
            BufferedImage image = ImageIO.read(imageMultipartFile.getInputStream());


            int steps = 300;
            double minX = recogniserRequest.minX;
            double maxX = recogniserRequest.maxX;
            double minY = recogniserRequest.minY;
            double maxY = recogniserRequest.maxY;
            double ar = 0, ag = 0, ab = 0;
            int count = 0;

            for (double px = minX; px < maxX; px += (maxX - minX) / steps) {
                for (double py = minY; py < maxY; py += (maxY - minY) / steps) {
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

                        ar = (ar * (count - 1)) / count + red * 1.0 / count;
                        ag = (ag * (count - 1)) / count + green * 1.0 / count;
                        ab = (ab * (count - 1)) / count + blue * 1.0 / count;
                    }
                }
            }

            List<Color> allColors = this.colorService.getAll();
            Color color = Color.builder()
                    .red((short) ar)
                    .green((short) ag)
                    .blue((short) ab)
                    .build();

            List<Color> result = allColors.stream().sorted((color1, color2) -> getDistance(color, color1) - getDistance(color, color2))
                    .limit(10)
                    .toList();

            return ResponseEntity.ok(result);
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


        /**
         * Points for polygon. Assume that the polygon is not self-intersecting
         */
        private List<Point> points;
    }
}
