package com.longcode.colorRecogniser.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
