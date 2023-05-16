package com.longcode.colorRecogniser.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@Builder
public class User extends BaseModel {
}
