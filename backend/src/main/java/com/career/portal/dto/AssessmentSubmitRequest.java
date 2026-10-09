package com.career.portal.dto;

import java.util.Map;

public class AssessmentSubmitRequest {
    private String topic;
    // Question ID -> User's selected option e.g., { 1: "A", 2: "C" }
    private Map<Long, String> answers;

    public AssessmentSubmitRequest() {}

    public AssessmentSubmitRequest(String topic, Map<Long, String> answers) {
        this.topic = topic;
        this.answers = answers;
    }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
}
