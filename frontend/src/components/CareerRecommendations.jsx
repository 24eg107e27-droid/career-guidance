import React, { useState, useEffect } from 'react';
import { recommendationApi } from '../services/api';
import { 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  PlusCircle, 
  Filter, 
  BrainCircuit,
  SlidersHorizontal
} from 'lucide-react';

export default function CareerRecommendations({ setActiveTab, onSelectCareerForGap }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState('ALL');

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const res = await recommendationApi.getRecommendations();
      setRecommendations(res.data);
    } catch (err) {
      console.error('Failed to load career recommendations', err);
    } finally {
      setLoading(false);
    }
  };

  const domains = ['ALL', ...new Set(recommendations.map(r => r.career.domain).filter(Boolean))];

  const filtered = selectedDomain === 'ALL'
    ? recommendations
    : recommendations.filter(r => r.career.domain === selectedDomain);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <BrainCircuit size={40} style={{ animation: 'spin 2s linear infinite', color: '#818cf8', marginBottom: '16px' }} />
        <p style={{ color: 'var(--text-muted)' }}>Calculating AI Career Recommendation Matrix...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '36px 0 60px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Sparkles size={20} color="#818cf8" />
            <h1 style={{ fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
              AI Career Recommendations
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Ranked career opportunities computed using your verified test scores, declared skills, and stated academic interests.
          </p>
        </div>

        {/* Domain Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {domains.map(dom => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`btn btn-sm ${selectedDomain === dom ? 'btn-primary' : 'btn-secondary'}`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {filtered.map((item) => {
          const isHighMatch = item.matchPercentage >= 75;
          const isModerate = item.matchPercentage >= 45 && item.matchPercentage < 75;

          return (
            <div key={item.career.id} className="card card-interactive" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span className="badge badge-primary">{item.career.domain}</span>
                    <span className={`badge ${isHighMatch ? 'badge-success' : isModerate ? 'badge-warning' : 'badge-danger'}`}>
                      {item.matchTier}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', margin: 0 }}>
                    {item.career.title}
                  </h2>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '10px 20px',
                  borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-subtle)', fontWeight: '700' }}>
                      MATCH SCORE
                    </div>
                    <div style={{ fontSize: '26px', fontWeight: '800', color: isHighMatch ? '#34d399' : isModerate ? '#fbbf24' : '#818cf8' }}>
                      {item.matchPercentage}%
                    </div>
                  </div>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '18px' }}>
                {item.career.description}
              </p>

              {/* AI Guidance Box */}
              <div style={{
                background: 'rgba(99, 102, 241, 0.08)',
                borderLeft: '4px solid #6366f1',
                padding: '14px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#cbd5e1',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <BrainCircuit size={18} color="#818cf8" style={{ flexShrink: 0 }} />
                <div>
                  <strong>AI Analysis:</strong> {item.reason}
                </div>
              </div>

              {/* Skills breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '22px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-subtle)', fontWeight: '600', marginBottom: '6px' }}>
                    MATCHED & VERIFIED SKILLS ({item.matchedSkills.length})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.matchedSkills.length > 0 ? (
                      item.matchedSkills.map(s => (
                        <span key={s} className="badge badge-success">✓ {s}</span>
                      ))
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>None verified yet</span>
                    )}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-subtle)', fontWeight: '600', marginBottom: '6px' }}>
                    MISSING INDUSTRY SKILLS ({item.missingSkills.length})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.missingSkills.length > 0 ? (
                      item.missingSkills.map(s => (
                        <span key={s} className="badge badge-danger">+ {s}</span>
                      ))
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>None! Full coverage</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    onSelectCareerForGap(item.career.id);
                    setActiveTab('skillgap');
                  }}
                  className="btn btn-primary"
                >
                  <SlidersHorizontal size={16} />
                  <span>Analyze Skill Gap & Learning Plan</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
