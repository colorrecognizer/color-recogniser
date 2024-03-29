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
    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false, insertable = false, columnDefinition = "BOOLEAN DEFAULT 0")
    private boolean revoked;

    @Column(nullable = false, insertable = false, columnDefinition = "BOOLEAN DEFAULT 0")
    private boolean expired;

    @ManyToOne
    @JoinColumn(name = "userId")
    public User user;
}
