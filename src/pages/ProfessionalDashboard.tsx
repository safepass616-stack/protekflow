import React, { useState, useEffect } from 'react';
import { Shield, LogOut, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { SkeletonCard } from '../components/Skeleton';
import './ProfessionalDashboard.css';

interface ProfessionalDashboardProps {
  user: User;
  profile: {
    role: string;
    full_name: string;
  };
  onLogout: () => void;
}

const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({ user, profile, onLogout }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasDocuments, setHasDocuments] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Simulate random error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Failed to load documents');
      }
      setHasDocuments(true);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="professional-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-logo">
          <Shield size={32} aria-hidden="true" />
          <span>Protekflow AI</span>
        </div>
        <div className="nav-user">
          <span>{profile.full_name}</span>
          <button onClick={onLogout} className="logout-button" aria-label="Logout from account">
            <LogOut size={18} aria-hidden="true" />
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Professional Dashboard</h1>
          <p>Review and approve HSE documentation</p>
        </div>

        {isLoading ? (
          <div className="stats-grid">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : hasError ? (
          <ErrorState
            title="Failed to Load Reviews"
            message="We couldn't load your pending reviews. Please check your connection and try again."
            onRetry={loadDashboardData}
          />
        ) : (
          <>
            <div className="stats-grid" role="region" aria-label="Review statistics" aria-live="polite">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                  <Clock size={24} color="#f59e0b" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>Pending Reviews</h3>
                  <p className="stat-value">12</p>
                  <span className="stat-change">Requires attention</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <CheckCircle size={24} color="#10b981" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>Completed This Month</h3>
                  <p className="stat-value">47</p>
                  <span className="stat-change positive">+18% from last month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(56, 189, 248, 0.1)' }}>
                  <FileText size={24} color="#38bdf8" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>Total Reviews</h3>
                  <p className="stat-value">284</p>
                  <span className="stat-change">All time</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(158, 127, 255, 0.1)' }}>
                  <AlertCircle size={24} color="#9E7FFF" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>Avg. Turnaround</h3>
                  <p className="stat-value">18hrs</p>
                  <span className="stat-change positive">Better than target</span>
                </div>
              </div>
            </div>

            <div className="documents-section">
              <div className="section-header">
                <h2>Documents Awaiting Review</h2>
                {hasDocuments && (
                  <select className="filter-select" aria-label="Filter documents">
                    <option>All Documents</option>
                    <option>High Priority</option>
                    <option>Standard</option>
                  </select>
                )}
              </div>

              {!hasDocuments ? (
                <EmptyState
                  icon="inbox"
                  title="No Pending Reviews"
                  message="All caught up! No documents are currently waiting for your review."
                  actionLabel="Refresh"
                  onAction={loadDashboardData}
                />
              ) : (
                <div className="documents-list">
                  <div className="document-card priority-high">
                    <div className="document-header">
                      <div>
                        <h3>Health & Safety Plan - Bridge Construction</h3>
                        <p>ABC Construction (Pty) Ltd</p>
                      </div>
                      <span className="priority-badge high">High Priority</span>
                    </div>
                    <div className="document-meta">
                      <span><Clock size={16} aria-hidden="true" /> Submitted 2 hours ago</span>
                      <span>Due: 10 hours remaining</span>
                    </div>
                    <div className="document-actions">
                      <button className="action-button primary">Review Document</button>
                      <button className="action-button secondary">View Details</button>
                    </div>
                  </div>

                  <div className="document-card">
                    <div className="document-header">
                      <div>
                        <h3>Risk Assessment - Road Expansion Project</h3>
                        <p>XYZ Builders</p>
                      </div>
                      <span className="priority-badge">Standard</span>
                    </div>
                    <div className="document-meta">
                      <span><Clock size={16} aria-hidden="true" /> Submitted 5 hours ago</span>
                      <span>Due: 19 hours remaining</span>
                    </div>
                    <div className="document-actions">
                      <button className="action-button primary">Review Document</button>
                      <button className="action-button secondary">View Details</button>
                    </div>
                  </div>

                  <div className="document-card">
                    <div className="document-header">
                      <div>
                        <h3>Method Statement - Excavation Works</h3>
                        <p>DEF Construction</p>
                      </div>
                      <span className="priority-badge">Standard</span>
                    </div>
                    <div className="document-meta">
                      <span><Clock size={16} aria-hidden="true" /> Submitted 1 day ago</span>
                      <span>Due: 12 hours remaining</span>
                    </div>
                    <div className="document-actions">
                      <button className="action-button primary">Review Document</button>
                      <button className="action-button secondary">View Details</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
