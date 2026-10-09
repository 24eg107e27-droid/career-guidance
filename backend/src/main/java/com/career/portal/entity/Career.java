package com.career.portal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "careers")
public class Career {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String domain;

    @Column(length = 3000)
    private String description;

    @Column(length = 500)
    private String skills; // Comma separated required skills e.g., "Java,React,SQL"

    public Career() {}

    public Career(String title, String domain, String description, String skills) {
        this.title = title;
        this.domain = domain;
        this.description = description;
        this.skills = skills;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
}
