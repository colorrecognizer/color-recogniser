package com.longcode.colorRecogniser.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table
public class OneOffScript extends BaseLogModel {
    @Column(nullable = false)
    private String description;
}
