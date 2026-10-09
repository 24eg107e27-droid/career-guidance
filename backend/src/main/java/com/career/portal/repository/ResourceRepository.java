package com.career.portal.repository;

import com.career.portal.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findBySkillIgnoreCase(String skill);
    List<Resource> findBySkillContainingIgnoreCase(String skill);
}
