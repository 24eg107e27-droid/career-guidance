package com.career.portal.controller;

import com.career.portal.dto.UserSkillRequest;
import com.career.portal.entity.User;
import com.career.portal.entity.UserSkill;
import com.career.portal.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<User> getProfile() {
        return ResponseEntity.ok(profileService.getProfile());
    }

    @PutMapping
    public ResponseEntity<User> updateProfile(@RequestBody User user) {
        return ResponseEntity.ok(profileService.updateProfile(user));
    }

    @GetMapping("/skills")
    public ResponseEntity<List<UserSkill>> getUserSkills() {
        return ResponseEntity.ok(profileService.getUserSkills());
    }

    @PostMapping("/skills")
    public ResponseEntity<UserSkill> addOrUpdateSkill(@RequestBody UserSkillRequest req) {
        return ResponseEntity.ok(profileService.addOrUpdateUserSkill(req));
    }

    @DeleteMapping("/skills/{skillName}")
    public ResponseEntity<?> deleteSkill(@PathVariable String skillName) {
        profileService.deleteUserSkill(skillName);
        return ResponseEntity.ok().build();
    }
}
