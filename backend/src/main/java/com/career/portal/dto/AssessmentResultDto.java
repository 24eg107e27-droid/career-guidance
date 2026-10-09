package com.career.portal.dto;

import java.util.List;

public class AssessmentResultDto {
    private String topic;
    private int score;
    private int total;
    private double percentage;
    private boolean passed;
    private List<QuestionReview> reviews;

    public static class QuestionReview {
        private Long questionId;
        private String question;
        private String selectedAnswer;
        private String correctAnswer;
        private boolean isCorrect;
        private String optionA;
        private String optionB;
        private String optionC;
        private String optionD;

        public QuestionReview() {}

        public QuestionReview(Long questionId, String question, String selectedAnswer, String correctAnswer,
                              boolean isCorrect, String optionA, String optionB, String optionC, String optionD) {
            this.questionId = questionId;
            this.question = question;
            this.selectedAnswer = selectedAnswer;
            this.correctAnswer = correctAnswer;
            this.isCorrect = isCorrect;
            this.optionA = optionA;
            this.optionB = optionB;
            this.optionC = optionC;
            this.optionD = optionD;
        }

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }

        public String getSelectedAnswer() { return selectedAnswer; }
        public void setSelectedAnswer(String selectedAnswer) { this.selectedAnswer = selectedAnswer; }

        public String getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

        public boolean isCorrect() { return isCorrect; }
        public void setCorrect(boolean correct) { isCorrect = correct; }

        public String getOptionA() { return optionA; }
        public void setOptionA(String optionA) { this.optionA = optionA; }

        public String getOptionB() { return optionB; }
        public void setOptionB(String optionB) { this.optionB = optionB; }

        public String getOptionC() { return optionC; }
        public void setOptionC(String optionC) { this.optionC = optionC; }

        public String getOptionD() { return optionD; }
        public void setOptionD(String optionD) { this.optionD = optionD; }
    }

    public AssessmentResultDto() {}

    public AssessmentResultDto(String topic, int score, int total, double percentage, boolean passed, List<QuestionReview> reviews) {
        this.topic = topic;
        this.score = score;
        this.total = total;
        this.percentage = percentage;
        this.passed = passed;
        this.reviews = reviews;
    }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total; }

    public double getPercentage() { return percentage; }
    public void setPercentage(double percentage) { this.percentage = percentage; }

    public boolean isPassed() { return passed; }
    public void setPassed(boolean passed) { this.passed = passed; }

    public List<QuestionReview> getReviews() { return reviews; }
    public void setReviews(List<QuestionReview> reviews) { this.reviews = reviews; }
}
