import React, { useState, useEffect } from 'react';
import { adminApi, careerApi, skillApi, assessmentApi, resourceApi } from '../services/api';
import { 
  Shield, 
  Users, 
  Briefcase, 
  HelpCircle, 
  BookOpen, 
  Plus, 
  Trash2, 
  BarChart3, 
  TrendingUp,
  Award
} from 'lucide-react';

export default function AdminPanel() {
  const [stats, setStats] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('stats');
  const [users, setUsers] = useState([]);
  const [careers, setCareers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // New item modal states
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [newCareer, setNewCareer] = useState({ title: '', domain: 'Technology', description: '', skills: '' });

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ topic: 'Java', question: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: 'A' });
  const [questionTopicFilter, setQuestionTopicFilter] = useState('ALL');

  const [showResourceModal, setShowResourceModal] = useState(false);
  const [newResource, setNewResource] = useState({ skill: 'Java', title: '', type: 'Course', level: 'Beginner', url: '' });

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Technical/Professional' });

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const loadAllAdminData = async () => {
    try {
      setLoading(true);
      const [sRes, uRes, cRes, skRes, rRes, qRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getUsers(),
        careerApi.getAllCareers(),
        skillApi.getAllSkills(),
        resourceApi.getAllResources(),
        adminApi.getAllQuestions().catch(() => ({ data: [] }))
      ]);
      setStats(sRes.data);
      setUsers(uRes.data);
      setCareers(cRes.data);
      setSkills(skRes.data);
      setResources(rRes.data);
      setQuestions(qRes?.data || []);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      await adminApi.updateUserRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCareer = async (e) => {
    e.preventDefault();
    try {
      const res = await adminApi.createCareer(newCareer);
      setCareers([...careers, res.data]);
      setShowCareerModal(false);
      setNewCareer({ title: '', domain: 'Technology', description: '', skills: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCareer = async (id) => {
    try {
      await adminApi.deleteCareer(id);
      setCareers(careers.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    try {
      const res = await adminApi.addQuestion(newQuestion);
      setQuestions([...questions, res.data]);
      setShowQuestionModal(false);
      setNewQuestion({ topic: 'Java', question: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: 'A' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await adminApi.deleteQuestion(id);
      setQuestions(questions.filter(q => q.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    try {
      const res = await adminApi.createSkill(newSkill);
      setSkills([...skills, res.data]);
      setShowSkillModal(false);
      setNewSkill({ name: '', category: 'Technical/Professional' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await adminApi.deleteSkill(id);
      setSkills(skills.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();
    try {
      const res = await adminApi.addResource(newResource);
      setResources([...resources, res.data]);
      setShowResourceModal(false);
      setNewResource({ skill: 'Java', title: '', type: 'Course', level: 'Beginner', url: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      await adminApi.deleteResource(id);
      setResources(resources.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>Loading Admin Console...</div>;
  }

  return (
    <div style={{ padding: '36px 0 60px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Shield size={22} color="#fbbf24" />
            <h1 style={{ fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
              System Administration
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Manage platform users, career paths, assessment questions, and learning content catalogs.
          </p>
        </div>

        {/* Sub Navigation */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-input)',
          borderRadius: '10px',
          padding: '4px',
          gap: '4px'
        }}>
          <button
            onClick={() => setActiveSubTab('stats')}
            className={`btn btn-sm ${activeSubTab === 'stats' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveSubTab('users')}
            className={`btn btn-sm ${activeSubTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveSubTab('careers')}
            className={`btn btn-sm ${activeSubTab === 'careers' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Careers ({careers.length})
          </button>
          <button
            onClick={() => setActiveSubTab('skills')}
            className={`btn btn-sm ${activeSubTab === 'skills' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Skills ({skills.length})
          </button>
          <button
            onClick={() => setActiveSubTab('questions')}
            className={`btn btn-sm ${activeSubTab === 'questions' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Questions ({questions.length})
          </button>
          <button
            onClick={() => setActiveSubTab('resources')}
            className={`btn btn-sm ${activeSubTab === 'resources' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Resources ({resources.length})
          </button>
        </div>
      </div>

      {/* 1. Analytics Stats Tab */}
      {activeSubTab === 'stats' && stats && (
        <div>
          <div className="grid-3" style={{ gap: '20px', marginBottom: '32px' }}>
            <div className="card">
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>Total Registered Users</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#818cf8', marginTop: '6px' }}>
                {stats.totalUsers}
              </div>
            </div>

            <div className="card">
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>Active Career Roles</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#34d399', marginTop: '6px' }}>
                {stats.totalCareers}
              </div>
            </div>

            <div className="card">
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>Total Skills in Catalog</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#fbbf24', marginTop: '6px' }}>
                {stats.totalSkills}
              </div>
            </div>

            <div className="card">
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>Assessments Completed</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#06b6d4', marginTop: '6px' }}>
                {stats.totalAssessmentsTaken}
              </div>
            </div>

            <div className="card">
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>Average Assessment Score</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#c084fc', marginTop: '6px' }}>
                {stats.averageAssessmentScore}%
              </div>
            </div>

            <div className="card">
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>Learning Resources</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#f43f5e', marginTop: '6px' }}>
                {stats.totalResources}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Users Management Tab */}
      {activeSubTab === 'users' && (
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Registered Accounts</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-subtle)', fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px' }}>Name</th>
                  <th style={{ padding: '12px' }}>Email</th>
                  <th style={{ padding: '12px' }}>Education</th>
                  <th style={{ padding: '12px' }}>Role</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '14px' }}>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{u.name}</td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{u.email}</td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{u.education || 'N/A'}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`badge ${u.role === 'ADMIN' ? 'badge-warning' : 'badge-primary'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleRoleChange(u.id, u.role)}
                        className="btn btn-secondary btn-sm"
                      >
                        Switch to {u.role === 'ADMIN' ? 'USER' : 'ADMIN'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Careers Management Tab */}
      {activeSubTab === 'careers' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Career Catalog</h2>
            <button onClick={() => setShowCareerModal(true)} className="btn btn-primary btn-sm">
              <Plus size={16} />
              <span>Add New Career</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {careers.map(c => (
              <div key={c.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '18px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge badge-primary">{c.domain}</span>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>{c.title}</h3>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>
                    {c.description}
                  </p>
                  <div style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
                    <strong>Required Skills:</strong> {c.skills}
                  </div>
                </div>

                <button onClick={() => handleDeleteCareer(c.id)} className="btn btn-danger btn-sm">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Resources Management Tab */}
      {activeSubTab === 'resources' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Curated Learning Resources</h2>
            <button onClick={() => setShowResourceModal(true)} className="btn btn-primary btn-sm">
              <Plus size={16} />
              <span>Add New Resource</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {resources.map(r => (
              <div key={r.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="badge badge-primary">{r.skill}</span>
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{r.title}</span>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                      {r.type} • {r.level}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#818cf8', marginTop: '4px' }}>
                    {r.url}
                  </div>
                </div>

                <button onClick={() => handleDeleteResource(r.id)} className="btn btn-danger btn-sm">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Skills Management Tab */}
      {activeSubTab === 'skills' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Skills Catalog ({skills.length})</h2>
            <button onClick={() => setShowSkillModal(true)} className="btn btn-primary btn-sm">
              <Plus size={16} />
              <span>Add New Skill</span>
            </button>
          </div>

          <div className="grid-3" style={{ gap: '14px' }}>
            {skills.map(s => (
              <div key={s.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '15px' }}>{s.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '2px' }}>
                    {s.category || 'General Skill'}
                  </div>
                </div>
                <button onClick={() => handleDeleteSkill(s.id)} className="btn btn-danger btn-sm" title="Delete skill">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Assessment Questions Bank Tab */}
      {activeSubTab === 'questions' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Assessment Questions Bank</h2>
              <select
                value={questionTopicFilter}
                onChange={e => setQuestionTopicFilter(e.target.value)}
                className="form-select"
                style={{ width: 'auto', padding: '6px 12px', fontSize: '13px' }}
              >
                <option value="ALL">All Topics ({questions.length})</option>
                {Array.from(new Set(questions.map(q => q.topic).filter(Boolean))).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <button onClick={() => setShowQuestionModal(true)} className="btn btn-primary btn-sm">
              <Plus size={16} />
              <span>Add Question</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {(questionTopicFilter === 'ALL' ? questions : questions.filter(q => q.topic?.toLowerCase() === questionTopicFilter.toLowerCase())).map((q, idx) => (
              <div key={q.id || idx} className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <span className="badge badge-primary" style={{ marginBottom: '8px', display: 'inline-block' }}>
                      {q.topic}
                    </span>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', margin: '4px 0 0 0' }}>
                      {idx + 1}. {q.question}
                    </h4>
                  </div>
                  <button onClick={() => handleDeleteQuestion(q.id)} className="btn btn-danger btn-sm" title="Delete question">
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid-2" style={{ gap: '8px', fontSize: '13px', marginBottom: '12px' }}>
                  <div style={{ padding: '8px 12px', borderRadius: '6px', background: q.answer === 'A' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255,255,255,0.03)', border: q.answer === 'A' ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255,255,255,0.06)' }}>
                    <strong>A:</strong> {q.optionA}
                  </div>
                  <div style={{ padding: '8px 12px', borderRadius: '6px', background: q.answer === 'B' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255,255,255,0.03)', border: q.answer === 'B' ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255,255,255,0.06)' }}>
                    <strong>B:</strong> {q.optionB}
                  </div>
                  <div style={{ padding: '8px 12px', borderRadius: '6px', background: q.answer === 'C' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255,255,255,0.03)', border: q.answer === 'C' ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255,255,255,0.06)' }}>
                    <strong>C:</strong> {q.optionC}
                  </div>
                  <div style={{ padding: '8px 12px', borderRadius: '6px', background: q.answer === 'D' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255,255,255,0.03)', border: q.answer === 'D' ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255,255,255,0.06)' }}>
                    <strong>D:</strong> {q.optionD}
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#34d399', fontWeight: '600' }}>
                  ✓ Correct Option: {q.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add Skill */}
      {showSkillModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '18px' }}>Add New Skill</h2>
            <form onSubmit={handleCreateSkill}>
              <div className="form-group">
                <label className="form-label">Skill Name</label>
                <input 
                  type="text" 
                  required 
                  value={newSkill.name} 
                  onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="form-input" 
                  placeholder="e.g. Kubernetes, TypeScript, Go"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={newSkill.category}
                  onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Programming Languages">Programming Languages</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Database & Storage">Database & Storage</option>
                  <option value="DevOps & Infrastructure">DevOps & Infrastructure</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Computer Science Fundamentals">Computer Science Fundamentals</option>
                  <option value="Security">Security</option>
                  <option value="Technical/Professional">Technical/Professional</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowSkillModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Question */}
      {showQuestionModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '18px' }}>Add Assessment Question</h2>
            <form onSubmit={handleCreateQuestion}>
              <div className="form-group">
                <label className="form-label">Topic / Skill</label>
                <input 
                  type="text" 
                  required 
                  value={newQuestion.topic} 
                  onChange={e => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                  className="form-input" 
                  placeholder="e.g. Java, Python, SQL, React"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Question Text</label>
                <textarea 
                  rows="3"
                  required 
                  value={newQuestion.question} 
                  onChange={e => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  className="form-textarea" 
                  placeholder="Enter the question prompt here..."
                />
              </div>

              <div className="grid-2" style={{ gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Option A</label>
                  <input 
                    type="text" 
                    required 
                    value={newQuestion.optionA} 
                    onChange={e => setNewQuestion({ ...newQuestion, optionA: e.target.value })}
                    className="form-input" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Option B</label>
                  <input 
                    type="text" 
                    required 
                    value={newQuestion.optionB} 
                    onChange={e => setNewQuestion({ ...newQuestion, optionB: e.target.value })}
                    className="form-input" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Option C</label>
                  <input 
                    type="text" 
                    required 
                    value={newQuestion.optionC} 
                    onChange={e => setNewQuestion({ ...newQuestion, optionC: e.target.value })}
                    className="form-input" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Option D</label>
                  <input 
                    type="text" 
                    required 
                    value={newQuestion.optionD} 
                    onChange={e => setNewQuestion({ ...newQuestion, optionD: e.target.value })}
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Correct Option</label>
                <select
                  value={newQuestion.answer}
                  onChange={e => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                  className="form-select"
                >
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowQuestionModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Career */}
      {showCareerModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '18px' }}>Add Career Path</h2>
            <form onSubmit={handleCreateCareer}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input 
                  type="text" 
                  required 
                  value={newCareer.title} 
                  onChange={e => setNewCareer({ ...newCareer, title: e.target.value })}
                  className="form-input" 
                  placeholder="e.g. Cloud DevOps Engineer"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Industry Domain</label>
                <input 
                  type="text" 
                  required 
                  value={newCareer.domain} 
                  onChange={e => setNewCareer({ ...newCareer, domain: e.target.value })}
                  className="form-input" 
                  placeholder="e.g. Cloud & Infrastructure"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role Description</label>
                <textarea 
                  rows="3" 
                  required 
                  value={newCareer.description} 
                  onChange={e => setNewCareer({ ...newCareer, description: e.target.value })}
                  className="form-textarea" 
                  placeholder="Responsibilities, expectations, and market outlook..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Required Skills (Comma-separated)</label>
                <input 
                  type="text" 
                  required 
                  value={newCareer.skills} 
                  onChange={e => setNewCareer({ ...newCareer, skills: e.target.value })}
                  className="form-input" 
                  placeholder="e.g. Docker, Kubernetes, AWS, Linux, Python"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowCareerModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Career
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Resource */}
      {showResourceModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '18px' }}>Add Learning Resource</h2>
            <form onSubmit={handleCreateResource}>
              <div className="form-group">
                <label className="form-label">Skill</label>
                <input 
                  type="text" 
                  required 
                  value={newResource.skill} 
                  onChange={e => setNewResource({ ...newResource, skill: e.target.value })}
                  className="form-input" 
                  placeholder="e.g. Java, Python, React"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Resource Title</label>
                <input 
                  type="text" 
                  required 
                  value={newResource.title} 
                  onChange={e => setNewResource({ ...newResource, title: e.target.value })}
                  className="form-input" 
                  placeholder="e.g. Complete Spring Boot Guide"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select 
                    value={newResource.type} 
                    onChange={e => setNewResource({ ...newResource, type: e.target.value })}
                    className="form-select"
                  >
                    <option value="Course">Course</option>
                    <option value="Docs">Official Documentation</option>
                    <option value="Video">Video Tutorial</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Level</label>
                  <select 
                    value={newResource.level} 
                    onChange={e => setNewResource({ ...newResource, level: e.target.value })}
                    className="form-select"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">URL / Documentation Link</label>
                <input 
                  type="url" 
                  required 
                  value={newResource.url} 
                  onChange={e => setNewResource({ ...newResource, url: e.target.value })}
                  className="form-input" 
                  placeholder="https://..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowResourceModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
