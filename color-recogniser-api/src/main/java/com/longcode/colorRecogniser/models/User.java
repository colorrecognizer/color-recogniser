package com.longcode.colorRecogniser.models;

import com.longcode.colorRecogniser.models.enums.UserRole;
import com.longcode.colorRecogniser.models.enums.UserStatus;
import com.longcode.colorRecogniser.utils.RegexUtils;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
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
    @Column(nullable = false, unique = true, updatable = false)
    @Pattern(regexp = RegexUtils.USERNAME)
    private String username;

    @Column(nullable = false, unique = true, updatable = false)
    @Pattern(regexp = RegexUtils.EMAIL)
    private String email;

    @Column(nullable = false)
    @Pattern(regexp = RegexUtils.PASSWORD)
    private String password;

    @Column(nullable = false)
    @Pattern(regexp = RegexUtils.PHONE_NUMBER)
    private String phoneNumber;

    @ElementCollection(targetClass = UserRole.class)
    @JoinTable(name = "UserRole", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "name", nullable = false)
    @Enumerated(EnumType.STRING)
    private List<UserRole> roles;

    @Column(columnDefinition = "NVARCHAR(16) DEFAULT 'INACTIVE'", insertable = false)
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    // Methods
    public boolean isAdmin() {
        return roles != null && roles.stream().anyMatch(role -> role == UserRole.ADMIN);
    }

    public boolean isUser() {
        return roles != null && roles.stream().anyMatch(role -> role == UserRole.USER);
    }
}
