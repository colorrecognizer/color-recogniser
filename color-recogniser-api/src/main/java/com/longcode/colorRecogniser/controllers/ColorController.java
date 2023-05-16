package com.longcode.colorRecogniser.controllers;

import com.longcode.colorRecogniser.models.Color;
import com.longcode.colorRecogniser.services.ColorService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/color")
@Getter
public class ColorController extends BaseModelController<Color> {
    private ColorService colorService;

    @Autowired
    public void setColorService(ColorService colorService) {
        this.colorService = colorService;
    }
}
