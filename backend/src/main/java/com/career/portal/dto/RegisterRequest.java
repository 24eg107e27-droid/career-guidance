package com.career.portal.dto;

import com.career.portal.entity.Role;

public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role = Role.USER;
    private String education;
    private String interests;
    private String bio;
    private String organization;

    public RegisterRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getInterests() { return interests; }
    public void setInterests(String interests) { this.interests = interests; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }
}
