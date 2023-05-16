package com.longcode.colorRecogniser.models;

import com.longcode.colorRecogniser.models.enums.UserRole;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@Getter
@Setter
@Builder
public class User extends BaseModel {
    @ElementCollection(targetClass = UserRole.class)
    @JoinTable(name = "User_UserRole", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "name", nullable = false)
    @Enumerated(EnumType.STRING)
    private List<UserRole> userRole;
}
