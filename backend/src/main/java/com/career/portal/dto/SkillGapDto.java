package com.career.portal.dto;

import com.career.portal.entity.Career;
import com.career.portal.entity.Resource;
import java.util.List;
import java.util.Map;

public class SkillGapDto {
    private Career career;
    private int readinessScore;
    private List<String> matchedSkills;
    private List<String> weakSkills;
    private List<String> missingSkills;
    // Map of skill name -> list of learning resources
    private Map<String, List<Resource>> learningRoadmap;

    public SkillGapDto() {}

    public SkillGapDto(Career career, int readinessScore, List<String> matchedSkills,
                       List<String> weakSkills, List<String> missingSkills,
                       Map<String, List<Resource>> learningRoadmap) {
        this.career = career;
        this.readinessScore = readinessScore;
        this.matchedSkills = matchedSkills;
        this.weakSkills = weakSkills;
        this.missingSkills = missingSkills;
        this.learningRoadmap = learningRoadmap;
    }

    public Career getCareer() { return career; }
    public void setCareer(Career career) { this.career = career; }

    public int getReadinessScore() { return readinessScore; }
    public void setReadinessScore(int readinessScore) { this.readinessScore = readinessScore; }

    public List<String> getMatchedSkills() { return matchedSkills; }
    public void setMatchedSkills(List<String> matchedSkills) { this.matchedSkills = matchedSkills; }

    public List<String> getWeakSkills() { return weakSkills; }
    public void setWeakSkills(List<String> weakSkills) { this.weakSkills = weakSkills; }

    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }

    public Map<String, List<Resource>> getLearningRoadmap() { return learningRoadmap; }
    public void setLearningRoadmap(Map<String, List<Resource>> learningRoadmap) { this.learningRoadmap = learningRoadmap; }
}
