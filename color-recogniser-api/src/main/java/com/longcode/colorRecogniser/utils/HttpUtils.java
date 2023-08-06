package com.longcode.colorRecogniser.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.longcode.colorRecogniser.config.ApiException;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

public class HttpUtils {
    public static String post(String apiUrl, String jsonInput) {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            // Create a POST request
            HttpPost httpPost = new HttpPost(apiUrl);
            StringEntity requestEntity = new StringEntity(jsonInput, ContentType.APPLICATION_JSON);
            httpPost.setEntity(requestEntity);

            // Execute the request and get the response
            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                // Check if the request was successful (status code 200)
                if (response.getStatusLine().getStatusCode() == 200) {
                    // Read the response content
                    HttpEntity responseEntity = response.getEntity();
                    return EntityUtils.toString(responseEntity);

                } else {
                    throw new ApiException("Request failed with status code: " + response.getStatusLine().getStatusCode());
                }
            }
        } catch (IOException e) {
            throw new ApiException(e.getMessage());
        }
    }
}
