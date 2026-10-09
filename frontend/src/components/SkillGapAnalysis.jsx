import React, { useState, useEffect } from 'react';
import { careerApi, recommendationApi } from '../services/api';
import { 
  SlidersHorizontal, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  BookOpen, 
  Zap, 
  BrainCircuit, 
  GraduationCap 
} from 'lucide-react';

export default function SkillGapAnalysis({ selectedCareerId, onSelectCareerForGap, setActiveTab }) {
  const [careers, setCareers] = useState([]);
  const [currentCareerId, setCurrentCareerId] = useState(selectedCareerId || '');
  const [gapData, setGapData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCareers();
  }, []);

  useEffect(() => {
    if (selectedCareerId) {
      setCurrentCareerId(selectedCareerId);
      loadGapAnalysis(selectedCareerId);
    }
  }, [selectedCareerId]);

  const loadCareers = async () => {
    try {
      const res = await careerApi.getAllCareers();
      setCareers(res.data);
      if (!selectedCareerId && res.data.length > 0) {
        setCurrentCareerId(res.data[0].id);
        loadGapAnalysis(res.data[0].id);
      }
    } catch (err) {
      console.error('Failed to load careers', err);
    }
  };

  const loadGapAnalysis = async (cId) => {
    setLoading(true);
    try {
      const res = await recommendationApi.getGapAnalysis(cId);
      setGapData(res.data);
    } catch (err) {
      console.error('Failed to load gap analysis', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCareerChange = (e) => {
    const id = e.target.value;
    setCurrentCareerId(id);
    onSelectCareerForGap(id);
    loadGapAnalysis(id);
  };

  return (
    <div style={{ padding: '36px 0 60px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <SlidersHorizontal size={20} color="#818cf8" />
            <h1 style={{ fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
              Skill-Gap Identification & Roadmap
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Select any target career role to pinpoint exact skill deficiencies and get direct learning links to bridge each gap.
          </p>
        </div>

        {/* Career Selector Dropdown */}
        <div style={{ minWidth: '260px' }}>
          <select 
            value={currentCareerId} 
            onChange={handleCareerChange}
            className="form-select"
            style={{ fontWeight: '600' }}
          >
            {careers.map(c => (
              <option key={c.id} value={c.id}>{c.title} ({c.domain})</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <BrainCircuit size={36} style={{ animation: 'spin 2s linear infinite', color: '#818cf8', marginBottom: '14px' }} />
          <p style={{ color: 'var(--text-muted)' }}>Calculating Skill-Gap Matrices...</p>
        </div>
      ) : gapData ? (
        <>
          {/* Target Role Overview & Readiness Meter */}
          <div className="card" style={{ marginBottom: '32px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '8px' }}>{gapData.career.domain}</span>
                <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>Target: {gapData.career.title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px', maxWidth: '650px' }}>
                  {gapData.career.description}
                </p>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '16px 24px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>
                  ROLE READINESS
                </div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: gapData.readinessScore >= 70 ? '#34d399' : gapData.readinessScore >= 40 ? '#fbbf24' : '#f87171' }}>
                  {gapData.readinessScore}%
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar-bg" style={{ height: '10px' }}>
              <div 
                className="progress-bar-fill" 
                style={{
                  width: `${gapData.readinessScore}%`,
                  background: gapData.readinessScore >= 70 ? 'var(--success)' : gapData.readinessScore >= 40 ? 'var(--warning)' : 'var(--danger)'
                }}
              />
            </div>
          </div>

          {/* 3 Categories: Matched, Weak, Missing */}
          <div className="grid-3" style={{ gap: '24px', marginBottom: '36px' }}>
            
            {/* 1. Matched */}
            <div className="card" style={{ borderTop: '4px solid var(--success)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <CheckCircle size={20} color="#34d399" />
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>
                  Acquired Skills ({gapData.matchedSkills.length})
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Skills already declared or verified via assessments.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {gapData.matchedSkills.length > 0 ? (
                  gapData.matchedSkills.map(s => (
                    <span key={s} className="badge badge-success">✓ {s}</span>
                  ))
                ) : (
                  <span style={{ fontSize: '13px', color: 'var(--text-subtle)' }}>None declared yet</span>
                )}
              </div>
            </div>

            {/* 2. Weak */}
            <div className="card" style={{ borderTop: '4px solid var(--warning)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <AlertCircle size={20} color="#fbbf24" />
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>
                  Needs Practice ({gapData.weakSkills.length})
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Assessment performance was under 60% proficiency.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {gapData.weakSkills.length > 0 ? (
                  gapData.weakSkills.map(s => (
                    <span key={s} className="badge badge-warning">⚠ {s}</span>
                  ))
                ) : (
                  <span style={{ fontSize: '13px', color: 'var(--text-subtle)' }}>No weak skills recorded</span>
                )}
              </div>
            </div>

            {/* 3. Missing */}
            <div className="card" style={{ borderTop: '4px solid var(--danger)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <GraduationCap size={20} color="#f87171" />
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>
                  Missing Skills ({gapData.missingSkills.length})
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Critical industry skills not yet present in your profile.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {gapData.missingSkills.length > 0 ? (
                  gapData.missingSkills.map(s => (
                    <span key={s} className="badge badge-danger">+ {s}</span>
                  ))
                ) : (
                  <span style={{ fontSize: '13px', color: 'var(--text-subtle)' }}>All core skills covered!</span>
                )}
              </div>
            </div>

          </div>

          {/* Curated Learning Roadmap for Weak / Missing Skills */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <BookOpen size={20} color="#818cf8" />
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>
                Personalized Learning Roadmap to Bridge Gaps
              </h2>
            </div>

            {Object.keys(gapData.learningRoadmap || {}).length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(gapData.learningRoadmap).map(([skill, resources]) => (
                  <div key={skill} className="card" style={{ padding: '22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h4 style={{ fontSize: '17px', fontWeight: '700', margin: 0 }}>{skill}</h4>
                        <span className="badge badge-danger">Skill Gap</span>
                      </div>
                      <button 
                        onClick={() => setActiveTab('assessments')}
                        className="btn btn-secondary btn-sm"
                      >
                        <Zap size={14} />
                        <span>Take {skill} Test</span>
                      </button>
                    </div>

                    {resources && resources.length > 0 ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                        {resources.map(res => (
                          <a 
                            key={res.id} 
                            href={res.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <div style={{
                              padding: '12px 16px',
                              background: 'rgba(255,255,255,0.03)',
                              borderRadius: '10px',
                              border: '1px solid rgba(255,255,255,0.06)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'all 0.2s ease'
                            }}>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#818cf8' }}>
                                  {res.title}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                  {res.type} • {res.level}
                                </div>
                              </div>
                              <ExternalLink size={16} color="var(--text-subtle)" />
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Visit the Learning Resources tab for full materials on {skill}.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '36px' }}>
                <CheckCircle size={32} color="#34d399" style={{ marginBottom: '10px' }} />
                <p style={{ color: 'var(--text-muted)' }}>
                  You have no pending skill gaps for this career! You are 100% prepared.
                </p>
              </div>
            )}
          </div>
        </>
      ) : null}

    </div>
  );
}
