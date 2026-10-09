package com.career.portal.repository;

import com.career.portal.entity.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {
    List<UserSkill> findByUserId(Long userId);
    Optional<UserSkill> findByUserIdAndSkillNameIgnoreCase(Long userId, String skillName);
    void deleteByUserIdAndSkillNameIgnoreCase(Long userId, String skillName);
}
