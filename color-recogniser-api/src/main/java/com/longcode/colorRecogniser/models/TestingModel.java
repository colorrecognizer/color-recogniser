package com.longcode.colorRecogniser.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table
public class TestingModel extends BaseModel{
    @Column
    private String longNameField;
}
