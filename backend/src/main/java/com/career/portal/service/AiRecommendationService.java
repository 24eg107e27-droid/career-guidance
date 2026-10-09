package com.career.portal.service;

import com.career.portal.dto.CareerRecommendationDto;
import com.career.portal.entity.AssessmentResult;
import com.career.portal.entity.Career;
import com.career.portal.entity.User;
import com.career.portal.entity.UserSkill;
import com.career.portal.repository.AssessmentResultRepository;
import com.career.portal.repository.CareerRepository;
import com.career.portal.repository.UserSkillRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AiRecommendationService {

    private final CareerRepository careerRepository;
    private final UserSkillRepository userSkillRepository;
    private final AssessmentResultRepository assessmentResultRepository;
    private final AuthService authService;

    public AiRecommendationService(CareerRepository careerRepository,
                                  UserSkillRepository userSkillRepository,
                                  AssessmentResultRepository assessmentResultRepository,
                                  AuthService authService) {
        this.careerRepository = careerRepository;
        this.userSkillRepository = userSkillRepository;
        this.assessmentResultRepository = assessmentResultRepository;
        this.authService = authService;
    }

    public List<CareerRecommendationDto> getRecommendationsForCurrentUser() {
        User currentUser = authService.getCurrentUser();
        List<Career> allCareers = careerRepository.findAll();

        List<UserSkill> userSkills = userSkillRepository.findByUserId(currentUser.getId());
        Map<String, UserSkill> userSkillMap = userSkills.stream()
                .collect(Collectors.toMap(s -> s.getSkillName().trim().toLowerCase(), s -> s, (s1, s2) -> s1));

        List<AssessmentResult> results = assessmentResultRepository.findByUserId(currentUser.getId());
        Map<String, Double> topicScoreMap = new HashMap<>();
        for (AssessmentResult res : results) {
            double pct = res.getTotal() > 0 ? ((double) res.getScore() / res.getTotal()) * 100.0 : 0.0;
            topicScoreMap.merge(res.getTopic().trim().toLowerCase(), pct, Math::max);
        }

        String userInterests = (currentUser.getInterests() != null ? currentUser.getInterests() : "").toLowerCase();
        String userEducation = (currentUser.getEducation() != null ? currentUser.getEducation() : "").toLowerCase();

        List<CareerRecommendationDto> recommendations = new ArrayList<>();

        for (Career career : allCareers) {
            String[] reqSkills = career.getSkills() != null ? career.getSkills().split(",") : new String[0];
            List<String> matchedSkills = new ArrayList<>();
            List<String> weakSkills = new ArrayList<>();
            List<String> missingSkills = new ArrayList<>();

            double verifiedCount = 0;
            double declaredCount = 0;

            for (String rSkillRaw : reqSkills) {
                String rSkill = rSkillRaw.trim();
                String rSkillKey = rSkill.toLowerCase();

                boolean isDeclared = userSkillMap.containsKey(rSkillKey);
                Double testScore = topicScoreMap.get(rSkillKey);

                if (testScore != null && testScore < 60.0) {
                    weakSkills.add(rSkill);
                } else if (isDeclared || (testScore != null && testScore >= 60.0)) {
                    matchedSkills.add(rSkill);
                    declaredCount++;
                    if ((testScore != null && testScore >= 60.0) || (isDeclared && userSkillMap.get(rSkillKey).isVerified())) {
                        verifiedCount++;
                    }
                } else {
                    missingSkills.add(rSkill);
                }
            }

            int totalReq = reqSkills.length > 0 ? reqSkills.length : 1;
            double skillCoverageRatio = declaredCount / totalReq; // weight 45%
            double testVerificationRatio = verifiedCount / totalReq; // weight 35%

            // Interest & Domain matching: weight 20%
            double interestScore = 0.0;
            String domain = (career.getDomain() != null ? career.getDomain() : "").toLowerCase();
            String title = (career.getTitle() != null ? career.getTitle() : "").toLowerCase();
            if (!userInterests.isEmpty()) {
                for (String token : userInterests.split(",")) {
                    token = token.trim();
                    if (!token.isEmpty() && (domain.contains(token) || title.contains(token))) {
                        interestScore = 1.0;
                        break;
                    }
                }
            }
            if (interestScore == 0.0 && (!userEducation.isEmpty() && (domain.contains(userEducation) || title.contains(userEducation)))) {
                interestScore = 0.5;
            }

            double rawScore = (skillCoverageRatio * 45.0) + (testVerificationRatio * 35.0) + (interestScore * 20.0);
            int matchPercentage = (int) Math.min(100, Math.max(15, Math.round(rawScore)));

            String tier;
            if (matchPercentage >= 75) {
                tier = "High Match";
            } else if (matchPercentage >= 45) {
                tier = "Moderate Match";
            } else {
                tier = "Emerging Match";
            }

            // AI dynamic rationale
            StringBuilder rationale = new StringBuilder();
            if (!matchedSkills.isEmpty()) {
                rationale.append("You have strong alignment in ").append(String.join(", ", matchedSkills)).append(". ");
            }
            if (!weakSkills.isEmpty()) {
                rationale.append("Assessment shows room for growth in ").append(String.join(", ", weakSkills)).append(". ");
            }
            if (!missingSkills.isEmpty()) {
                rationale.append("Recommended next skills to learn: ").append(String.join(", ", missingSkills)).append(". ");
            }
            if (interestScore > 0) {
                rationale.append("Directly matches your indicated interest in ").append(career.getDomain()).append(".");
            }

            recommendations.add(new CareerRecommendationDto(
                    career,
                    matchPercentage,
                    tier,
                    matchedSkills,
                    weakSkills,
                    missingSkills,
                    rationale.toString().trim()
            ));
        }

        // Sort descending by match percentage
        recommendations.sort((a, b) -> Integer.compare(b.getMatchPercentage(), a.getMatchPercentage()));
        return recommendations;
    }
}
