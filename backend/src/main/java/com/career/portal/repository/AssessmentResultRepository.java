package com.career.portal.repository;

import com.career.portal.entity.AssessmentResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentResultRepository extends JpaRepository<AssessmentResult, Long> {
    List<AssessmentResult> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<AssessmentResult> findByUserId(Long userId);
    List<AssessmentResult> findByUserIdAndTopicIgnoreCase(Long userId, String topic);
}
