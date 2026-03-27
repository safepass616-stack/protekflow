import React from 'react';
import { Users, Award, Building2, Mail, Shield } from 'lucide-react';
import './UsersManagement.css';

const UsersManagement: React.FC = () => {
  const users = [
    {
      id: '1',
      name: 'John Mbeki',
      email: 'john.mbeki@eccc.co.za',
      role: 'professional',
      company: 'Eastern Cape Civil Contractors',
      certifications: ['SAMTRAC', 'NEBOSH', 'Construction Safety'],
      projects: 2,
      documents: 18,
      status: 'active'
    },
    {
      id: '2',
      name: 'Thabo Dlamini',
      email: 'thabo.dlamini@premier.co.za',
      role: 'professional',
      company: 'Premier Construction (Pty) Ltd',
      certifications: ['SAMTRAC', 'First Aid Level 3'],
      projects: 1,
      documents: 12,
      status: 'active'
    },
    {
      id: '3',
      name: 'David Nkosi',
      email: 'david.nkosi@aqua.co.za',
      role: 'professional',
      company: 'Aqua Infrastructure (Pty) Ltd',
      certifications: ['SAMTRAC', 'Confined Space'],
      projects: 1,
      documents: 8,
      status: 'active'
    },
    {
      id: '4',
      name: 'Sarah van der Merwe',
      email: 'sarah.vdm@bcmm.gov.za',
      role: 'client',
      company: 'Buffalo City Metropolitan Municipality',
      projects: 2,
      status: 'active'
    },
    {
      id: '5',
      name: 'Michael Chen',
      email: 'michael.chen@ecdot.gov.za',
      role: 'client',
      company: 'Eastern Cape Department of Transport',
      projects: 1,
      status: 'active'
    }
  ];

  return (
    <div className="users-management">
      <div className="card">
        <div className="card-header">
          <h3>User Management</h3>
          <button className="action-btn primary">
            <Users size={18} />
            Add New User
          </button>
        </div>

        <div className="users-grid">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-header">
                <div className="user-avatar">
                  {user.role === 'professional' ? <Award size={24} /> : <Building2 size={24} />}
                </div>
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p className="user-email">
                    <Mail size={14} />
                    {user.email}
                  </p>
                </div>
                <span className={`role-badge ${user.role}`}>
                  {user.role === 'professional' ? 'HSE Professional' : 'Client'}
                </span>
              </div>

              <div className="user-details">
                <div className="detail-row">
                  <Building2 size={16} />
                  <span>{user.company}</span>
                </div>
                {user.certifications && (
                  <div className="certifications">
                    {user.certifications.map((cert, idx) => (
                      <span key={idx} className="cert-tag">{cert}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="user-stats">
                <div className="stat">
                  <span className="stat-value">{user.projects}</span>
                  <span className="stat-label">Projects</span>
                </div>
                {user.documents && (
                  <div className="stat">
                    <span className="stat-value">{user.documents}</span>
                    <span className="stat-label">Documents</span>
                  </div>
                )}
                <div className="stat">
                  <span className={`status-indicator ${user.status}`}></span>
                  <span className="stat-label">{user.status}</span>
                </div>
              </div>

              <div className="user-actions">
                <button className="btn-small">Edit</button>
                <button className="btn-small secondary">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
