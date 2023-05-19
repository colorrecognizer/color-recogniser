package com.longcode.colorRecogniser.models;

import com.longcode.colorRecogniser.models.enums.UserRole;
import com.longcode.colorRecogniser.models.enums.UserStatus;
import com.longcode.colorRecogniser.utils.RegexUtils;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseModel implements UserDetails {
    @Column(nullable = false, unique = true, updatable = false)
    @Pattern(regexp = RegexUtils.USERNAME)
    private String username;

    @Column(nullable = false, unique = true, updatable = false)
    @Pattern(regexp = RegexUtils.EMAIL)
    private String email;

    @Column(nullable = false)
    private String password;

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.name())).toList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
