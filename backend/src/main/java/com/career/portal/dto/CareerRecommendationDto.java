package com.career.portal.dto;

import com.career.portal.entity.Career;
import java.util.List;

public class CareerRecommendationDto {
    private Career career;
    private int matchPercentage;
    private String matchTier; // Strong Match, Good Match, Emerging Match
    private List<String> matchedSkills;
    private List<String> weakSkills;
    private List<String> missingSkills;
    private String reason;

    public CareerRecommendationDto() {}

    public CareerRecommendationDto(Career career, int matchPercentage, String matchTier,
                                   List<String> matchedSkills, List<String> weakSkills,
                                   List<String> missingSkills, String reason) {
        this.career = career;
        this.matchPercentage = matchPercentage;
        this.matchTier = matchTier;
        this.matchedSkills = matchedSkills;
        this.weakSkills = weakSkills;
        this.missingSkills = missingSkills;
        this.reason = reason;
    }

    public Career getCareer() { return career; }
    public void setCareer(Career career) { this.career = career; }

    public int getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(int matchPercentage) { this.matchPercentage = matchPercentage; }

    public String getMatchTier() { return matchTier; }
    public void setMatchTier(String matchTier) { this.matchTier = matchTier; }

    public List<String> getMatchedSkills() { return matchedSkills; }
    public void setMatchedSkills(List<String> matchedSkills) { this.matchedSkills = matchedSkills; }

    public List<String> getWeakSkills() { return weakSkills; }
    public void setWeakSkills(List<String> weakSkills) { this.weakSkills = weakSkills; }

    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
