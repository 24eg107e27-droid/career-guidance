package com.career.portal.controller;

import com.career.portal.entity.*;
import com.career.portal.service.AdminService;
import com.career.portal.service.AssessmentService;
import com.career.portal.service.CareerService;
import com.career.portal.service.ResourceService;
import com.career.portal.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {

    private final AdminService adminService;
    private final CareerService careerService;
    private final SkillService skillService;
    private final AssessmentService assessmentService;
    private final ResourceService resourceService;

    public AdminController(AdminService adminService,
                           CareerService careerService,
                           SkillService skillService,
                           AssessmentService assessmentService,
                           ResourceService resourceService) {
        this.adminService = adminService;
        this.careerService = careerService;
        this.skillService = skillService;
        this.assessmentService = assessmentService;
        this.resourceService = resourceService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(adminService.getPlatformStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable Long userId, @RequestParam Role role) {
        return ResponseEntity.ok(adminService.updateUserRole(userId, role));
    }

    // Career management
    @PostMapping("/careers")
    public ResponseEntity<Career> createCareer(@RequestBody Career career) {
        return ResponseEntity.ok(careerService.saveCareer(career));
    }

    @DeleteMapping("/careers/{id}")
    public ResponseEntity<?> deleteCareer(@PathVariable Long id) {
        careerService.deleteCareer(id);
        return ResponseEntity.ok().build();
    }

    // Skill management
    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @PostMapping("/skills")
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        return ResponseEntity.ok(skillService.createSkill(skill));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok().build();
    }

    // Question bank management
    @GetMapping("/assessments")
    public ResponseEntity<List<Assessment>> getAllQuestions() {
        return ResponseEntity.ok(assessmentService.getAllQuestions());
    }

    @PostMapping("/assessments")
    public ResponseEntity<Assessment> addQuestion(@RequestBody Assessment assessment) {
        return ResponseEntity.ok(assessmentService.addQuestion(assessment));
    }

    @DeleteMapping("/assessments/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        assessmentService.deleteQuestion(id);
        return ResponseEntity.ok().build();
    }

    // Resource management
    @PostMapping("/resources")
    public ResponseEntity<Resource> addResource(@RequestBody Resource resource) {
        return ResponseEntity.ok(resourceService.saveResource(resource));
    }

    @DeleteMapping("/resources/{id}")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.ok().build();
    }
}
