package com.career.portal.service;

import com.career.portal.dto.UserSkillRequest;
import com.career.portal.entity.User;
import com.career.portal.entity.UserSkill;
import com.career.portal.repository.UserRepository;
import com.career.portal.repository.UserSkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;
    private final AuthService authService;

    public ProfileService(UserRepository userRepository, UserSkillRepository userSkillRepository, AuthService authService) {
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
        this.authService = authService;
    }

    public User getProfile() {
        return authService.getCurrentUser();
    }

    public User updateProfile(User updateReq) {
        User currentUser = authService.getCurrentUser();
        if (updateReq.getName() != null) currentUser.setName(updateReq.getName());
        if (updateReq.getEducation() != null) currentUser.setEducation(updateReq.getEducation());
        if (updateReq.getInterests() != null) currentUser.setInterests(updateReq.getInterests());
        if (updateReq.getBio() != null) currentUser.setBio(updateReq.getBio());
        if (updateReq.getOrganization() != null) currentUser.setOrganization(updateReq.getOrganization());
        return userRepository.save(currentUser);
    }

    public List<UserSkill> getUserSkills() {
        User currentUser = authService.getCurrentUser();
        return userSkillRepository.findByUserId(currentUser.getId());
    }

    public UserSkill addOrUpdateUserSkill(UserSkillRequest req) {
        User currentUser = authService.getCurrentUser();
        Optional<UserSkill> existing = userSkillRepository.findByUserIdAndSkillNameIgnoreCase(currentUser.getId(), req.getSkillName().trim());

        UserSkill skill;
        if (existing.isPresent()) {
            skill = existing.get();
            skill.setProficiency(req.getProficiency());
        } else {
            skill = new UserSkill(currentUser.getId(), req.getSkillName().trim(), req.getProficiency(), false);
        }
        return userSkillRepository.save(skill);
    }

    @Transactional
    public void deleteUserSkill(String skillName) {
        User currentUser = authService.getCurrentUser();
        userSkillRepository.deleteByUserIdAndSkillNameIgnoreCase(currentUser.getId(), skillName.trim());
    }
}
