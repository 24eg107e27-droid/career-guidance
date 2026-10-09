import React, { useState, useEffect } from 'react';
import { assessmentApi } from '../services/api';
import { 
  CheckCircle, 
  HelpCircle, 
  Clock, 
  ArrowRight, 
  Check, 
  X, 
  RotateCcw, 
  TrendingUp,
  BrainCircuit,
  Zap
} from 'lucide-react';

export default function AssessmentHub({ setActiveTab }) {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 min timer

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    let timer;
    if (selectedTopic && !result && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [selectedTopic, result, timeLeft]);

  const loadTopics = async () => {
    try {
      const res = await assessmentApi.getTopics();
      setTopics(res.data);
    } catch (err) {
      console.error('Failed to load topics', err);
    }
  };

  const startAssessment = async (topic) => {
    setLoading(true);
    try {
      const res = await assessmentApi.getQuestions(topic);
      setQuestions(res.data);
      setSelectedTopic(topic);
      setAnswers({});
      setResult(null);
      setTimeLeft(300);
    } catch (err) {
      console.error('Failed to load questions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId, optionKey) => {
    setAnswers({ ...answers, [questionId]: optionKey });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await assessmentApi.submitAssessment({
        topic: selectedTopic,
        answers: answers
      });
      setResult(res.data);
    } catch (err) {
      console.error('Failed to submit test', err);
    } finally {
      setLoading(false);
    }
  };

  const resetAssessment = () => {
    setSelectedTopic(null);
    setQuestions([]);
    setAnswers({});
    setResult(null);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ padding: '36px 0 60px' }}>
      
      {/* 1. Topic Selection Mode */}
      {!selectedTopic && (
        <>
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
              Online Skill Assessment Center
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
              Validate your technical capabilities with randomized topic tests. Scoring 60% or higher automatically grants verified status and boosts your career match ranking!
            </p>
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            {topics.map((topic) => (
              <div key={topic} className="card card-interactive" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#818cf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '18px'
                  }}>
                    {topic.charAt(0)}
                  </div>
                  <span className="badge badge-primary">Timed Quiz</span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                  {topic} Evaluation
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>
                  Multiple-choice questions testing core concepts, best practices, and practical syntax.
                </p>

                <button 
                  onClick={() => startAssessment(topic)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Zap size={16} />
                  <span>Start Assessment</span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 2. Interactive Quiz Mode */}
      {selectedTopic && !result && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div className="card" style={{ marginBottom: '24px', padding: '20px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '6px' }}>{selectedTopic}</span>
                <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Skill Verification Exam</h2>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: timeLeft < 60 ? 'var(--danger-light)' : 'rgba(255,255,255,0.06)',
                color: timeLeft < 60 ? '#f87171' : 'var(--text-main)',
                padding: '8px 16px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '15px'
              }}>
                <Clock size={16} />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
            {questions.map((q, idx) => (
              <div key={q.id} className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(99,102,241,0.2)',
                    color: '#818cf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '13px',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>
                    {q.question}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                  {[
                    { key: 'A', text: q.optionA },
                    { key: 'B', text: q.optionB },
                    { key: 'C', text: q.optionC },
                    { key: 'D', text: q.optionD },
                  ].map((opt) => {
                    const isSelected = answers[q.id] === opt.key;
                    return (
                      <div 
                        key={opt.key}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                          border: isSelected ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          background: isSelected ? '#6366f1' : 'rgba(255,255,255,0.08)',
                          color: isSelected ? '#fff' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          fontSize: '12px'
                        }}>
                          {opt.key}
                        </div>
                        <span style={{ fontSize: '14px', color: isSelected ? '#fff' : 'var(--text-muted)' }}>
                          {opt.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={resetAssessment} className="btn btn-secondary">
              Cancel & Exit
            </button>
            <button 
              onClick={handleSubmit} 
              className="btn btn-primary"
              disabled={loading || Object.keys(answers).length === 0}
            >
              <CheckCircle size={16} />
              <span>{loading ? 'Evaluating...' : 'Submit Answers'}</span>
            </button>
          </div>

        </div>
      )}

      {/* 3. Results & Detailed Review Mode */}
      {result && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div className="card" style={{
            background: result.passed 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.12) 100%)'
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.18) 0%, rgba(245, 158, 11, 0.12) 100%)',
            border: `1px solid ${result.passed ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
            padding: '36px',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: result.passed ? 'var(--success)' : 'var(--danger)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              marginBottom: '16px'
            }}>
              {result.passed ? <Check size={36} /> : <X size={36} />}
            </div>

            <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>
              {result.passed ? 'Assessment Passed! 🎉' : 'Needs More Preparation'}
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '520px', margin: '0 auto 20px' }}>
              {result.passed 
                ? `Congratulations! You scored ${result.score} out of ${result.total} (${result.percentage}%). This skill is now officially verified in your profile.`
                : `You scored ${result.score} out of ${result.total} (${result.percentage}%). Minimum passing score is 60%. Review the answers below and try again.`}
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => startAssessment(result.topic)} className="btn btn-secondary">
                <RotateCcw size={16} />
                <span>Retake Test</span>
              </button>
              <button onClick={() => setActiveTab('recommendations')} className="btn btn-primary">
                <TrendingUp size={16} />
                <span>View Updated Career Matches</span>
              </button>
            </div>
          </div>

          {/* Question Breakdown */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Detailed Answer Review</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {result.reviews?.map((r, idx) => (
                <div key={idx} className="card" style={{
                  borderLeft: `4px solid ${r.correct ? 'var(--success)' : 'var(--danger)'}`,
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ fontWeight: '600', fontSize: '15px' }}>
                      {idx + 1}. {r.question}
                    </div>
                    <span className={`badge ${r.correct ? 'badge-success' : 'badge-danger'}`}>
                      {r.correct ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '20px', fontSize: '13px', marginTop: '12px' }}>
                    <div>
                      <span style={{ color: 'var(--text-subtle)' }}>Your Answer: </span>
                      <strong style={{ color: r.correct ? '#34d399' : '#f87171' }}>
                        Option {r.selectedAnswer}
                      </strong>
                    </div>
                    {!r.correct && (
                      <div>
                        <span style={{ color: 'var(--text-subtle)' }}>Correct Answer: </span>
                        <strong style={{ color: '#34d399' }}>Option {r.correctAnswer}</strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
