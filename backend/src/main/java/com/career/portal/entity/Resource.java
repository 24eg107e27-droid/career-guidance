package com.career.portal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skill;

    private String title;

    private String type; // Course, Docs, Video, Certification

    private String level; // Beginner, Intermediate, Advanced

    @Column(length = 1000)
    private String url;

    public Resource() {}

    public Resource(String skill, String title, String type, String level, String url) {
        this.skill = skill;
        this.title = title;
        this.type = type;
        this.level = level;
        this.url = url;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSkill() { return skill; }
    public void setSkill(String skill) { this.skill = skill; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
