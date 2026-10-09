package com.career.portal.repository;

import com.career.portal.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    List<Assessment> findByTopicIgnoreCase(String topic);

    @Query("SELECT DISTINCT a.topic FROM Assessment a")
    List<String> findDistinctTopics();
}
