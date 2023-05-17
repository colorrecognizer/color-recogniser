package com.longcode.colorRecogniser.services.modelServices;

import com.longcode.colorRecogniser.repositories.ColorRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Getter
public class ColorService extends BaseModelService {
    private ColorRepository colorRepository;

    @Autowired
    public void setColorRepository(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }
}
