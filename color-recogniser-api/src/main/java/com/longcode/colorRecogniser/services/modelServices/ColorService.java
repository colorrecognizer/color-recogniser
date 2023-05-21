package com.longcode.colorRecogniser.services.modelServices;

import com.longcode.colorRecogniser.config.ApiException;
import com.longcode.colorRecogniser.models.Color;
import com.longcode.colorRecogniser.repositories.BaseModelRepository;
import com.longcode.colorRecogniser.repositories.ColorRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Getter
public class ColorService extends BaseModelService<Color> {
    private ColorRepository colorRepository;

    public ColorService(BaseModelRepository<Color> baseModelRepository) {
        super(baseModelRepository);
    }

    @Autowired
    public void setColorRepository(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }

    @Override
    public Color insert(Color model) {
        if (model == null)
            return null;

        if (colorRepository.existsByName(model.getName()))
            throw new ApiException("Color [%s] existed!".formatted(model.getName()));

        Color existedColor = colorRepository.findByRedAndGreenAndBlue(model.getRed(), model.getGreen(), model.getBlue());
        if (existedColor != null) {
            throw new ApiException("The color code has been used for color [%s]!".formatted(existedColor.getName()));
        }

        return super.insert(model);
    }
}
