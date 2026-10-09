package com.career.portal.service;

import com.career.portal.entity.AssessmentResult;
import com.career.portal.entity.Role;
import com.career.portal.entity.User;
import com.career.portal.repository.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final CareerRepository careerRepository;
    private final SkillRepository skillRepository;
    private final AssessmentRepository assessmentRepository;
    private final AssessmentResultRepository assessmentResultRepository;
    private final ResourceRepository resourceRepository;

    public AdminService(UserRepository userRepository,
                        CareerRepository careerRepository,
                        SkillRepository skillRepository,
                        AssessmentRepository assessmentRepository,
                        AssessmentResultRepository assessmentResultRepository,
                        ResourceRepository resourceRepository) {
        this.userRepository = userRepository;
        this.careerRepository = careerRepository;
        this.skillRepository = skillRepository;
        this.assessmentRepository = assessmentRepository;
        this.assessmentResultRepository = assessmentResultRepository;
        this.resourceRepository = resourceRepository;
    }

    public Map<String, Object> getPlatformStats() {
        Map<String, Object> stats = new HashMap<>();
        long userCount = userRepository.count();
        long careerCount = careerRepository.count();
        long skillCount = skillRepository.count();
        long questionCount = assessmentRepository.count();
        long resultCount = assessmentResultRepository.count();
        long resourceCount = resourceRepository.count();

        List<AssessmentResult> results = assessmentResultRepository.findAll();
        double avgScore = results.isEmpty() ? 0.0 :
                results.stream().mapToDouble(r -> r.getTotal() > 0 ? ((double) r.getScore() / r.getTotal()) * 100 : 0).average().orElse(0.0);

        stats.put("totalUsers", userCount);
        stats.put("totalCareers", careerCount);
        stats.put("totalSkills", skillCount);
        stats.put("totalQuestions", questionCount);
        stats.put("totalAssessmentsTaken", resultCount);
        stats.put("totalResources", resourceCount);
        stats.put("averageAssessmentScore", Math.round(avgScore * 10.0) / 10.0);

        return stats;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUserRole(Long userId, Role newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        user.setRole(newRole);
        return userRepository.save(user);
    }
}
