import React, { useState, useEffect } from 'react';
import { 
  profileApi, 
  assessmentApi, 
  recommendationApi 
} from '../services/api';
import { 
  Award, 
  BrainCircuit, 
  CheckCircle, 
  Briefcase, 
  ArrowRight, 
  Clock, 
  Zap, 
  TrendingUp,
  BookOpen
} from 'lucide-react';

export default function Dashboard({ setActiveTab, onSelectCareerForGap }) {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [history, setHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [profRes, skillsRes, histRes, recRes] = await Promise.all([
        profileApi.getProfile(),
        profileApi.getUserSkills(),
        assessmentApi.getHistory(),
        recommendationApi.getRecommendations()
      ]);
      setProfile(profRes.data);
      setSkills(skillsRes.data);
      setHistory(histRes.data);
      setRecommendations(recRes.data);
    } catch (err) {
      console.error('Error loading dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const avgScore = history.length > 0 
    ? Math.round(history.reduce((acc, h) => acc + (h.total > 0 ? (h.score / h.total) * 100 : 0), 0) / history.length) 
    : 0;

  const topMatch = recommendations.length > 0 ? recommendations[0] : null;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <BrainCircuit size={40} style={{ animation: 'spin 2s linear infinite', color: '#818cf8', marginBottom: '16px' }} />
        <p style={{ color: 'var(--text-muted)' }}>Loading AI Career Intelligence...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '36px 0 60px' }}>
      
      {/* Welcome Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.12) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        marginBottom: '32px',
        padding: '32px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge badge-primary">Student Profile</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {profile?.education || 'Degree in Progress'}
              </span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
              Welcome back, <span style={{ color: '#818cf8' }}>{profile?.name || 'Explorer'}</span>! 👋
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '650px' }}>
              Your profile is continuously analyzed against current market demand. Take targeted skill assessments to calibrate your career match accuracy.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setActiveTab('assessments')} className="btn btn-primary">
              <Zap size={16} />
              <span>Take Assessment</span>
            </button>
            <button onClick={() => setActiveTab('recommendations')} className="btn btn-secondary">
              <TrendingUp size={16} />
              <span>View AI Matches</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid-4" style={{ marginBottom: '32px' }}>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            background: 'rgba(99, 102, 241, 0.15)',
            color: '#818cf8',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Declared Skills</div>
            <div style={{ fontSize: '26px', fontWeight: '800' }}>{skills.length}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#34d399',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Tests Completed</div>
            <div style={{ fontSize: '26px', fontWeight: '800' }}>{history.length}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#fbbf24',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Average Score</div>
            <div style={{ fontSize: '26px', fontWeight: '800' }}>{avgScore}%</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            background: 'rgba(6, 182, 212, 0.15)',
            color: '#22d3ee',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Briefcase size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Top Career Match</div>
            <div style={{ fontSize: '26px', fontWeight: '800' }}>
              {topMatch ? `${topMatch.matchPercentage}%` : 'N/A'}
            </div>
          </div>
        </div>

      </div>

      {/* Main 2-column layout */}
      <div className="grid-2" style={{ gap: '32px' }}>
        
        {/* Left: Top Career Match Spotlight */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Top Recommended Career Path</h2>
            <button 
              onClick={() => setActiveTab('recommendations')} 
              className="btn btn-secondary btn-sm"
            >
              <span>View All ({recommendations.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {topMatch ? (
            <div className="card card-interactive" style={{ padding: '26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
                    {topMatch.career.domain}
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: '700' }}>{topMatch.career.title}</h3>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: 'rgba(255,255,255,0.8)' }}>MATCH</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>{topMatch.matchPercentage}%</div>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '18px' }}>
                {topMatch.career.description}
              </p>

              <div style={{
                background: 'rgba(0,0,0,0.25)',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '18px',
                fontSize: '13px',
                color: '#cbd5e1',
                borderLeft: '3px solid #818cf8'
              }}>
                <strong>AI Guidance:</strong> {topMatch.reason}
              </div>

              {/* Matched & Missing Skill Pills */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-subtle)', marginBottom: '8px', fontWeight: '600' }}>
                  REQUIRED SKILLS STATUS
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {topMatch.matchedSkills.map((s) => (
                    <span key={s} className="badge badge-success">✓ {s}</span>
                  ))}
                  {topMatch.missingSkills.map((s) => (
                    <span key={s} className="badge badge-danger">+ {s}</span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  onSelectCareerForGap(topMatch.career.id);
                  setActiveTab('skillgap');
                }} 
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <span>Run Detailed Skill-Gap Analysis</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: 'var(--text-muted)' }}>No career recommendations generated yet.</p>
            </div>
          )}
        </div>

        {/* Right: Assessment History */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Recent Assessment History</h2>
            <button 
              onClick={() => setActiveTab('assessments')} 
              className="btn btn-secondary btn-sm"
            >
              <span>Take New Test</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="card" style={{ padding: '16px 20px' }}>
            {history.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {history.slice(0, 5).map((item) => {
                  const pct = item.total > 0 ? Math.round((item.score / item.total) * 100) : 0;
                  const passed = pct >= 60;
                  return (
                    <div 
                      key={item.id} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          background: passed ? 'var(--success-light)' : 'var(--danger-light)',
                          color: passed ? '#34d399' : '#f87171',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700'
                        }}>
                          {item.topic.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '14px' }}>{item.topic} Assessment</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            Score: {item.score} / {item.total} questions ({pct}%)
                          </div>
                        </div>
                      </div>

                      <span className={`badge ${passed ? 'badge-success' : 'badge-danger'}`}>
                        {passed ? 'Passed' : 'Needs Practice'}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '36px 0' }}>
                <Clock size={32} style={{ color: 'var(--text-subtle)', marginBottom: '10px' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  No assessments taken yet.
                </p>
                <button 
                  onClick={() => setActiveTab('assessments')} 
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: '12px' }}
                >
                  Start First Test
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
