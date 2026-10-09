package com.career.portal.dto;

public class UserSkillRequest {
    private String skillName;
    private String proficiency; // Beginner, Intermediate, Advanced

    public UserSkillRequest() {}

    public UserSkillRequest(String skillName, String proficiency) {
        this.skillName = skillName;
        this.proficiency = proficiency;
    }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getProficiency() { return proficiency; }
    public void setProficiency(String proficiency) { this.proficiency = proficiency; }
}
