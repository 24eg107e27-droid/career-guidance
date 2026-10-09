package com.career.portal.controller;

import com.career.portal.entity.Resource;
import com.career.portal.service.ResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping
    public ResponseEntity<List<Resource>> getAllResources() {
        return ResponseEntity.ok(resourceService.getAllResources());
    }

    @GetMapping("/by-skill/{skill}")
    public ResponseEntity<List<Resource>> getResourcesBySkill(@PathVariable String skill) {
        return ResponseEntity.ok(resourceService.getResourcesForSkill(skill));
    }
}
