package com.career.portal.service;

import com.career.portal.dto.SkillGapDto;
import com.career.portal.entity.AssessmentResult;
import com.career.portal.entity.Career;
import com.career.portal.entity.Resource;
import com.career.portal.entity.User;
import com.career.portal.entity.UserSkill;
import com.career.portal.repository.AssessmentResultRepository;
import com.career.portal.repository.CareerRepository;
import com.career.portal.repository.ResourceRepository;
import com.career.portal.repository.UserSkillRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SkillGapService {

    private final CareerRepository careerRepository;
    private final UserSkillRepository userSkillRepository;
    private final AssessmentResultRepository assessmentResultRepository;
    private final ResourceRepository resourceRepository;
    private final AuthService authService;

    public SkillGapService(CareerRepository careerRepository,
                           UserSkillRepository userSkillRepository,
                           AssessmentResultRepository assessmentResultRepository,
                           ResourceRepository resourceRepository,
                           AuthService authService) {
        this.careerRepository = careerRepository;
        this.userSkillRepository = userSkillRepository;
        this.assessmentResultRepository = assessmentResultRepository;
        this.resourceRepository = resourceRepository;
        this.authService = authService;
    }

    public SkillGapDto analyzeGap(Long careerId) {
        User currentUser = authService.getCurrentUser();
        Career career = careerRepository.findById(careerId)
                .orElseThrow(() -> new IllegalArgumentException("Career not found with ID: " + careerId));

        List<UserSkill> userSkills = userSkillRepository.findByUserId(currentUser.getId());
        Map<String, UserSkill> userSkillMap = userSkills.stream()
                .collect(Collectors.toMap(s -> s.getSkillName().trim().toLowerCase(), s -> s, (s1, s2) -> s1));

        List<AssessmentResult> results = assessmentResultRepository.findByUserId(currentUser.getId());
        Map<String, Double> topicScoreMap = new HashMap<>();
        for (AssessmentResult res : results) {
            double pct = res.getTotal() > 0 ? ((double) res.getScore() / res.getTotal()) * 100.0 : 0.0;
            topicScoreMap.merge(res.getTopic().trim().toLowerCase(), pct, Math::max);
        }

        String[] reqSkills = career.getSkills() != null ? career.getSkills().split(",") : new String[0];
        List<String> matchedSkills = new ArrayList<>();
        List<String> weakSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();
        Map<String, List<Resource>> roadmap = new HashMap<>();

        for (String rSkillRaw : reqSkills) {
            String skill = rSkillRaw.trim();
            String skillKey = skill.toLowerCase();

            boolean isDeclared = userSkillMap.containsKey(skillKey);
            Double testScore = topicScoreMap.get(skillKey);

            if (testScore != null && testScore < 60.0) {
                weakSkills.add(skill);
                roadmap.put(skill, resourceRepository.findBySkillContainingIgnoreCase(skill));
            } else if (isDeclared || (testScore != null && testScore >= 60.0)) {
                matchedSkills.add(skill);
            } else {
                missingSkills.add(skill);
                roadmap.put(skill, resourceRepository.findBySkillContainingIgnoreCase(skill));
            }
        }

        int total = reqSkills.length > 0 ? reqSkills.length : 1;
        int readiness = (int) Math.round(((double) matchedSkills.size() / total) * 100.0);

        return new SkillGapDto(career, readiness, matchedSkills, weakSkills, missingSkills, roadmap);
    }
}
