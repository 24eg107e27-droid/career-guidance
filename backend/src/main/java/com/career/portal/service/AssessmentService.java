package com.career.portal.service;

import com.career.portal.dto.AssessmentResultDto;
import com.career.portal.dto.AssessmentSubmitRequest;
import com.career.portal.entity.Assessment;
import com.career.portal.entity.AssessmentResult;
import com.career.portal.entity.User;
import com.career.portal.entity.UserSkill;
import com.career.portal.repository.AssessmentRepository;
import com.career.portal.repository.AssessmentResultRepository;
import com.career.portal.repository.UserSkillRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final AssessmentResultRepository assessmentResultRepository;
    private final UserSkillRepository userSkillRepository;
    private final AuthService authService;

    public AssessmentService(AssessmentRepository assessmentRepository,
                             AssessmentResultRepository assessmentResultRepository,
                             UserSkillRepository userSkillRepository,
                             AuthService authService) {
        this.assessmentRepository = assessmentRepository;
        this.assessmentResultRepository = assessmentResultRepository;
        this.userSkillRepository = userSkillRepository;
        this.authService = authService;
    }

    public List<String> getAvailableTopics() {
        return assessmentRepository.findDistinctTopics();
    }

    public List<Map<String, Object>> getQuestionsForTopic(String topic) {
        List<Assessment> list = assessmentRepository.findByTopicIgnoreCase(topic);
        List<Map<String, Object>> sanitized = new ArrayList<>();

        for (Assessment a : list) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", a.getId());
            map.put("topic", a.getTopic());
            map.put("question", a.getQuestion());
            map.put("optionA", a.getOptionA());
            map.put("optionB", a.getOptionB());
            map.put("optionC", a.getOptionC());
            map.put("optionD", a.getOptionD());
            // Do not leak 'answer' here!
            sanitized.add(map);
        }
        return sanitized;
    }

    public AssessmentResultDto submitAssessment(AssessmentSubmitRequest req) {
        User currentUser = authService.getCurrentUser();
        List<Assessment> questions = assessmentRepository.findByTopicIgnoreCase(req.getTopic());

        int score = 0;
        int total = questions.size();
        List<AssessmentResultDto.QuestionReview> reviews = new ArrayList<>();

        Map<Long, String> userAnswers = req.getAnswers() != null ? req.getAnswers() : Collections.emptyMap();

        for (Assessment q : questions) {
            String submittedAns = userAnswers.get(q.getId());
            boolean isCorrect = submittedAns != null && submittedAns.trim().equalsIgnoreCase(q.getAnswer().trim());

            if (isCorrect) {
                score++;
            }

            reviews.add(new AssessmentResultDto.QuestionReview(
                    q.getId(),
                    q.getQuestion(),
                    submittedAns != null ? submittedAns.toUpperCase() : "NOT_ANSWERED",
                    q.getAnswer() != null ? q.getAnswer().toUpperCase() : "",
                    isCorrect,
                    q.getOptionA(),
                    q.getOptionB(),
                    q.getOptionC(),
                    q.getOptionD()
            ));
        }

        double percentage = total > 0 ? ((double) score / total) * 100.0 : 0.0;
        boolean passed = percentage >= 60.0;

        // Save result
        AssessmentResult result = new AssessmentResult(currentUser.getId(), req.getTopic(), score, total);
        assessmentResultRepository.save(result);

        // If user passed, update or add their UserSkill as verified!
        if (passed) {
            Optional<UserSkill> opt = userSkillRepository.findByUserIdAndSkillNameIgnoreCase(currentUser.getId(), req.getTopic());
            if (opt.isPresent()) {
                UserSkill s = opt.get();
                s.setVerified(true);
                userSkillRepository.save(s);
            } else {
                UserSkill s = new UserSkill(currentUser.getId(), req.getTopic(), "Intermediate", true);
                userSkillRepository.save(s);
            }
        }

        return new AssessmentResultDto(req.getTopic(), score, total, Math.round(percentage * 10.0) / 10.0, passed, reviews);
    }

    public List<AssessmentResult> getUserAssessmentHistory() {
        User currentUser = authService.getCurrentUser();
        return assessmentResultRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId());
    }

    public List<Assessment> getAllQuestions() {
        return assessmentRepository.findAll();
    }

    public Assessment addQuestion(Assessment assessment) {
        return assessmentRepository.save(assessment);
    }

    public void deleteQuestion(Long id) {
        assessmentRepository.deleteById(id);
    }
}
