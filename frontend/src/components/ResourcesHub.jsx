import React, { useState, useEffect } from 'react';
import { resourceApi } from '../services/api';
import { BookOpen, ExternalLink, Filter, Search, Award } from 'lucide-react';

export default function ResourcesHub() {
  const [resources, setResources] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);
      const res = await resourceApi.getAllResources();
      setResources(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error('Failed to load resources', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = resources;

    if (selectedSkill !== 'ALL') {
      result = result.filter(r => r.skill?.toLowerCase() === selectedSkill.toLowerCase());
    }

    if (selectedType !== 'ALL') {
      result = result.filter(r => r.type?.toLowerCase() === selectedType.toLowerCase());
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r => 
        r.title?.toLowerCase().includes(q) || 
        r.skill?.toLowerCase().includes(q)
      );
    }

    setFiltered(result);
  }, [selectedSkill, selectedType, search, resources]);

  const skills = ['ALL', ...new Set(resources.map(r => r.skill).filter(Boolean))];
  const types = ['ALL', ...new Set(resources.map(r => r.type).filter(Boolean))];

  return (
    <div style={{ padding: '36px 0 60px' }}>
      
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Curated Learning Resource Directory
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Industry-vetted tutorials, official documentation, and comprehensive roadmaps to master in-demand tech skills.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: '28px', padding: '18px 24px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 240px', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search by title or skill..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{ minWidth: '160px' }}>
            <select 
              value={selectedSkill} 
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="form-select"
            >
              {skills.map(s => <option key={s} value={s}>Skill: {s}</option>)}
            </select>
          </div>

          <div style={{ minWidth: '140px' }}>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-select"
            >
              {types.map(t => <option key={t} value={t}>Type: {t}</option>)}
            </select>
          </div>

        </div>
      </div>

      {/* Resource Cards */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          Loading resources...
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid-3" style={{ gap: '20px' }}>
          {filtered.map(res => (
            <div key={res.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-primary">{res.skill}</span>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                    {res.level}
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>
                  {res.title}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Format: {res.type}
                </div>
              </div>

              <a 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Access Resource</span>
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          No resources found matching the specified filters.
        </div>
      )}

    </div>
  );
}
