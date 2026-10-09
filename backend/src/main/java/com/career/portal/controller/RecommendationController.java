package com.career.portal.controller;

import com.career.portal.dto.CareerRecommendationDto;
import com.career.portal.dto.SkillGapDto;
import com.career.portal.service.AiRecommendationService;
import com.career.portal.service.SkillGapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RecommendationController {

    private final AiRecommendationService aiRecommendationService;
    private final SkillGapService skillGapService;

    public RecommendationController(AiRecommendationService aiRecommendationService,
                                    SkillGapService skillGapService) {
        this.aiRecommendationService = aiRecommendationService;
        this.skillGapService = skillGapService;
    }

    @GetMapping
    public ResponseEntity<List<CareerRecommendationDto>> getRecommendations() {
        return ResponseEntity.ok(aiRecommendationService.getRecommendationsForCurrentUser());
    }

    @GetMapping("/gap-analysis/{careerId}")
    public ResponseEntity<SkillGapDto> getGapAnalysis(@PathVariable Long careerId) {
        return ResponseEntity.ok(skillGapService.analyzeGap(careerId));
    }
}
