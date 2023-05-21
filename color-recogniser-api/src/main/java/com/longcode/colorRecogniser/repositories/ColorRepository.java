package com.longcode.colorRecogniser.repositories;

import com.longcode.colorRecogniser.models.Color;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRepository extends BaseModelRepository<Color> {
     boolean existsByName(String name);

     Color findByRedAndGreenAndBlue(short red, short green, short blue);
}
