package com.career.portal.controller;

import com.career.portal.dto.AssessmentResultDto;
import com.career.portal.dto.AssessmentSubmitRequest;
import com.career.portal.entity.AssessmentResult;
import com.career.portal.service.AssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @GetMapping("/topics")
    public ResponseEntity<List<String>> getTopics() {
        return ResponseEntity.ok(assessmentService.getAvailableTopics());
    }

    @GetMapping("/questions")
    public ResponseEntity<List<Map<String, Object>>> getQuestions(@RequestParam String topic) {
        return ResponseEntity.ok(assessmentService.getQuestionsForTopic(topic));
    }

    @PostMapping("/submit")
    public ResponseEntity<AssessmentResultDto> submitAssessment(@RequestBody AssessmentSubmitRequest req) {
        return ResponseEntity.ok(assessmentService.submitAssessment(req));
    }

    @GetMapping("/history")
    public ResponseEntity<List<AssessmentResult>> getHistory() {
        return ResponseEntity.ok(assessmentService.getUserAssessmentHistory());
    }
}
