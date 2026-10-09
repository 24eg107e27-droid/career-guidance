import React from 'react';
import { 
  Compass, 
  User, 
  CheckCircle, 
  Briefcase, 
  BookOpen, 
  Shield, 
  LogOut, 
  LayoutDashboard,
  BrainCircuit,
  SlidersHorizontal
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentUser, onLogout }) {
  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
          }}>
            <BrainCircuit size={22} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Career<span style={{ color: '#818cf8' }}>OS</span>
          </span>
          <span className="badge badge-primary" style={{ fontSize: '10px', padding: '2px 8px' }}>
            AI-POWERED
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button 
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </button>

          <button 
            className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <User size={16} />
            <span>Profile & Skills</span>
          </button>

          <button 
            className={`nav-link ${activeTab === 'assessments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assessments')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <CheckCircle size={16} />
            <span>Assessments</span>
          </button>

          <button 
            className={`nav-link ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Briefcase size={16} />
            <span>AI Careers</span>
          </button>

          <button 
            className={`nav-link ${activeTab === 'skillgap' ? 'active' : ''}`}
            onClick={() => setActiveTab('skillgap')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <SlidersHorizontal size={16} />
            <span>Skill-Gap</span>
          </button>

          <button 
            className={`nav-link ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <BookOpen size={16} />
            <span>Resources</span>
          </button>

          {currentUser?.role === 'ADMIN' && (
            <button 
              className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Shield size={16} color="#fbbf24" />
              <span style={{ color: '#fbbf24' }}>Admin</span>
            </button>
          )}
        </div>

        {/* User Pill & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              color: '#818cf8',
              fontSize: '13px'
            }}>
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>
                {currentUser?.name || 'User'}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                {currentUser?.role || 'USER'}
              </span>
            </div>
          </div>

          <button 
            onClick={onLogout}
            title="Log Out"
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 10px' }}
          >
            <LogOut size={14} />
          </button>
        </div>

      </div>
    </nav>
  );
}
