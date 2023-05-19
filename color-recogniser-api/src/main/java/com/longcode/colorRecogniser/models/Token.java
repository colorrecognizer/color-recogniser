package com.longcode.colorRecogniser.models;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Builder
@Getter
@Setter
public class Token extends BaseModel {
    @Column(unique = true)
    private String token;

    @Column(insertable = false)
    private boolean revoked;

    @Column(insertable = false)
    private boolean expired;

    @ManyToOne
    @JoinColumn(name = "userId")
    public User user;
}
