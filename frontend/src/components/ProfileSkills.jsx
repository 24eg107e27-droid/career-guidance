import React, { useState, useEffect } from 'react';
import { profileApi, skillApi } from '../services/api';
import { 
  User, 
  Award, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Save, 
  BookOpen, 
  ShieldCheck, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function ProfileSkills() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    education: '',
    interests: '',
    bio: '',
    organization: '',
  });
  const [userSkills, setUserSkills] = useState([]);
  const [globalSkills, setGlobalSkills] = useState([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newProficiency, setNewProficiency] = useState('Intermediate');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [profRes, uSkillsRes, gSkillsRes] = await Promise.all([
        profileApi.getProfile(),
        profileApi.getUserSkills(),
        skillApi.getAllSkills()
      ]);
      setProfile(profRes.data);
      setUserSkills(uSkillsRes.data);
      setGlobalSkills(gSkillsRes.data);
      if (gSkillsRes.data.length > 0) {
        setNewSkillName(gSkillsRes.data[0].name);
      }
    } catch (err) {
      console.error('Failed to load profile data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await profileApi.updateProfile(profile);
      setProfile(res.data);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName) return;

    try {
      await profileApi.addUserSkill({
        skillName: newSkillName,
        proficiency: newProficiency
      });
      const res = await profileApi.getUserSkills();
      setUserSkills(res.data);
      setMessage(`Added ${newSkillName} to your skills!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (skillName) => {
    try {
      await profileApi.deleteUserSkill(skillName);
      setUserSkills(userSkills.filter(s => s.skillName !== skillName));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>Loading Profile...</div>;
  }

  return (
    <div style={{ padding: '36px 0 60px' }}>
      
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Profile & Skills Portfolio
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Keep your educational background, declared technical proficiencies, and career preferences updated.
        </p>
      </div>

      {message && (
        <div style={{
          background: message.includes('Failed') ? 'var(--danger-light)' : 'var(--success-light)',
          border: `1px solid ${message.includes('Failed') ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
          color: message.includes('Failed') ? '#f87171' : '#34d399',
          padding: '12px 18px',
          borderRadius: '10px',
          marginBottom: '24px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {message}
        </div>
      )}

      <div className="grid-2" style={{ gap: '32px', alignItems: 'start' }}>
        
        {/* Left: Profile Form */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <User size={20} color="#818cf8" />
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Academic & Personal Information</h2>
          </div>

          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                value={profile.name || ''} 
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="form-input" 
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address (Read-only)</label>
              <input 
                type="email" 
                value={profile.email || ''} 
                className="form-input" 
                disabled 
                style={{ opacity: 0.6 }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Education / Academic Degree</label>
              <input 
                type="text" 
                value={profile.education || ''} 
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                className="form-input" 
                placeholder="e.g. B.Tech Computer Science / AIML"
              />
            </div>

            <div className="form-group">
              <label className="form-label">College / Organization</label>
              <input 
                type="text" 
                value={profile.organization || ''} 
                onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                className="form-input" 
                placeholder="e.g. Institute of Technology"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Domain Interests (Comma-separated)</label>
              <input 
                type="text" 
                value={profile.interests || ''} 
                onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                className="form-input" 
                placeholder="e.g. software, AI, web development, data"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Professional Bio / Career Goals</label>
              <textarea 
                rows="3"
                value={profile.bio || ''} 
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="form-textarea" 
                placeholder="Brief summary of your learning aspirations and goals..."
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </form>
        </div>

        {/* Right: Skills & Proficiencies Manager */}
        <div>
          
          {/* Add Skill Card */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Plus size={20} color="#34d399" />
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Add Technical or Soft Skill</h2>
            </div>

            <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <select 
                  value={newSkillName} 
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="form-select"
                >
                  {globalSkills.map(s => (
                    <option key={s.id} value={s.name}>{s.name} ({s.category})</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: '1 1 140px' }}>
                <select 
                  value={newProficiency} 
                  onChange={(e) => setNewProficiency(e.target.value)}
                  className="form-select"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <button type="submit" className="btn btn-success" style={{ alignSelf: 'flex-start' }}>
                <Plus size={16} />
                <span>Add Skill</span>
              </button>
            </form>
          </div>

          {/* Current Skills List */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} color="#fbbf24" />
                <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Your Declared Skills</h2>
              </div>
              <span className="badge badge-primary">{userSkills.length} Total</span>
            </div>

            {userSkills.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {userSkills.map((s) => (
                  <div 
                    key={s.id} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontWeight: '700', fontSize: '15px' }}>{s.skillName}</span>
                      <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                        {s.proficiency}
                      </span>
                      {s.verified && (
                        <span className="badge badge-success" title="Verified by Assessment">
                          <CheckCircle2 size={12} />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>

                    <button 
                      onClick={() => handleDeleteSkill(s.skillName)}
                      className="btn btn-danger btn-sm"
                      title="Remove Skill"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
                <p>No skills declared yet. Select a skill above to start building your profile.</p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
