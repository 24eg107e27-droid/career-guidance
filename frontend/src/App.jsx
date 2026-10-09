import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import ProfileSkills from './components/ProfileSkills';
import AssessmentHub from './components/AssessmentHub';
import CareerRecommendations from './components/CareerRecommendations';
import SkillGapAnalysis from './components/SkillGapAnalysis';
import ResourcesHub from './components/ResourcesHub';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCareerForGap, setSelectedCareerForGap] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    setActiveTab(userData.role === 'ADMIN' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  if (!currentUser) {
    return <AuthModal onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser} 
        onLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <main className="container" style={{ flex: 1 }}>
        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab} 
            onSelectCareerForGap={setSelectedCareerForGap} 
          />
        )}

        {activeTab === 'profile' && (
          <ProfileSkills />
        )}

        {activeTab === 'assessments' && (
          <AssessmentHub setActiveTab={setActiveTab} />
        )}

        {activeTab === 'recommendations' && (
          <CareerRecommendations 
            setActiveTab={setActiveTab} 
            onSelectCareerForGap={setSelectedCareerForGap} 
          />
        )}

        {activeTab === 'skillgap' && (
          <SkillGapAnalysis 
            selectedCareerId={selectedCareerForGap} 
            onSelectCareerForGap={setSelectedCareerForGap} 
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'resources' && (
          <ResourcesHub />
        )}

        {activeTab === 'admin' && currentUser.role === 'ADMIN' && (
          <AdminPanel />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '24px 0',
        background: 'rgba(10, 13, 20, 0.6)',
        marginTop: 'auto'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '13px',
          color: 'var(--text-subtle)'
        }}>
          <div>
            AI-Based Career Guidance & Skill Management Portal • Built with Spring Boot, MySQL & React
          </div>
          <div>
            Logged in as <strong style={{ color: '#818cf8' }}>{currentUser.email}</strong> ({currentUser.role})
          </div>
        </div>
      </footer>

    </div>
  );
}
