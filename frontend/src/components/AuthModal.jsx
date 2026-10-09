import React, { useState } from 'react';
import { authApi } from '../services/api';
import { BrainCircuit, Lock, Mail, User, BookOpen, Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function AuthModal({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
    education: '',
    interests: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const res = await authApi.login({ email: formData.email, password: formData.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));
        onAuthSuccess(res.data);
      } else {
        const res = await authApi.register(formData);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));
        onAuthSuccess(res.data);
      }
    } catch (err) {
      setError(err.response?.data || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (role) => {
    setLoading(true);
    setError('');
    const creds = role === 'ADMIN' 
      ? { email: 'admin@careeros.local', password: 'admin123' }
      : { email: 'student@careeros.local', password: 'student123' };

    try {
      const res = await authApi.login(creds);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      onAuthSuccess(res.data);
    } catch (err) {
      setError(err.response?.data || 'Quick demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '36px' }}>
        
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            width: '54px',
            height: '54px',
            borderRadius: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            marginBottom: '14px',
            boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)'
          }}>
            <BrainCircuit size={30} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Career<span style={{ color: '#818cf8' }}>OS</span> Portal
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            AI-Based Career Guidance & Skill Management System
          </p>
        </div>

        {/* Quick Demo Logins */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px dashed rgba(99, 102, 241, 0.3)',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#818cf8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ⚡ 1-Click Instant Demo Login
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button 
              type="button" 
              onClick={() => handleQuickLogin('USER')} 
              className="btn btn-secondary btn-sm"
              disabled={loading}
              style={{ justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}
            >
              <User size={14} color="#34d399" />
              <span>Demo Student</span>
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickLogin('ADMIN')} 
              className="btn btn-secondary btn-sm"
              disabled={loading}
              style={{ justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}
            >
              <Shield size={14} color="#fbbf24" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Tab Toggle */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-input)',
          borderRadius: '10px',
          padding: '4px',
          marginBottom: '24px'
        }}>
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(''); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              background: isLogin ? 'var(--primary)' : 'transparent',
              color: isLogin ? '#fff' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(''); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              background: !isLogin ? 'var(--primary)' : 'transparent',
              color: !isLogin ? '#fff' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div style={{
            background: 'var(--danger-light)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#f87171',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            marginBottom: '18px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="e.g. Madhuri Sharon"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Education / Degree</label>
                <input 
                  type="text" 
                  name="education" 
                  value={formData.education} 
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="e.g. B.Tech Computer Science / AIML"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Interests (comma-separated)</label>
                <input 
                  type="text" 
                  name="interests" 
                  value={formData.interests} 
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="e.g. software, AI, web development"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className="form-select">
                  <option value="USER">Student / Job Seeker</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required 
              value={formData.email} 
              onChange={handleChange}
              className="form-input" 
              placeholder="user@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              value={formData.password} 
              onChange={handleChange}
              className="form-input" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '10px', padding: '12px' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : (
              <>
                <span>{isLogin ? 'Sign In' : 'Create Free Account'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
