import React, { useState, useEffect } from 'react';
import { Shield, LogOut, Users, FileText, TrendingUp, DollarSign } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { SkeletonCard } from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import './AdminDashboard.css';

interface AdminDashboardProps {
  user: User;
  profile: {
    role: string;
    full_name: string;
  };
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, profile, onLogout }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
        throw new Error('Failed to load dashboard data');
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
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
          <h1>Admin Dashboard</h1>
          <p>System overview and management</p>
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
            title="Failed to Load Dashboard"
            message="We couldn't load your dashboard data. Please check your connection and try again."
            onRetry={loadDashboardData}
          />
        ) : (
          <>
            <div className="stats-grid" role="region" aria-label="System statistics" aria-live="polite">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(158, 127, 255, 0.1)' }}>
                  <Users size={24} color="#9E7FFF" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>Total Users</h3>
                  <p className="stat-value">1,247</p>
                  <span className="stat-change positive">+12% this month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(56, 189, 248, 0.1)' }}>
                  <FileText size={24} color="#38bdf8" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>Documents Generated</h3>
                  <p className="stat-value">3,892</p>
                  <span className="stat-change positive">+8% this month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <TrendingUp size={24} color="#10b981" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>Active Subscriptions</h3>
                  <p className="stat-value">847</p>
                  <span className="stat-change positive">+15% this month</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                  <DollarSign size={24} color="#f59e0b" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>Monthly Revenue</h3>
                  <p className="stat-value">R 2.1M</p>
                  <span className="stat-change positive">+22% this month</span>
                </div>
              </div>
            </div>

            <div className="dashboard-sections">
              <div className="section-card">
                <h2>Recent Activity</h2>
                <div className="activity-list" role="feed" aria-label="Recent system activity">
                  <div className="activity-item">
                    <div className="activity-icon">
                      <Users size={18} aria-hidden="true" />
                    </div>
                    <div className="activity-details">
                      <p><strong>New user registration</strong></p>
                      <span>John Doe - ABC Construction</span>
                    </div>
                    <time className="activity-time" dateTime="2024-01-15T10:30:00">2 minutes ago</time>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <FileText size={18} aria-hidden="true" />
                    </div>
                    <div className="activity-details">
                      <p><strong>Document generated</strong></p>
                      <span>Health & Safety Plan - Project XYZ</span>
                    </div>
                    <time className="activity-time" dateTime="2024-01-15T10:15:00">15 minutes ago</time>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <TrendingUp size={18} aria-hidden="true" />
                    </div>
                    <div className="activity-details">
                      <p><strong>New subscription</strong></p>
                      <span>Pro Plan - XYZ Builders</span>
                    </div>
                    <time className="activity-time" dateTime="2024-01-15T09:30:00">1 hour ago</time>
                  </div>
                </div>
              </div>

              <div className="section-card">
                <h2>System Health</h2>
                <div className="health-metrics" role="region" aria-label="System health metrics">
                  <div className="health-item">
                    <span>API Response Time</span>
                    <div className="health-bar" role="progressbar" aria-valuenow={85} aria-valuemin={0} aria-valuemax={100}>
                      <div className="health-fill" style={{ width: '85%', background: '#10b981' }}></div>
                    </div>
                    <span className="health-value">142ms</span>
                  </div>
                  <div className="health-item">
                    <span>Database Performance</span>
                    <div className="health-bar" role="progressbar" aria-valuenow={92} aria-valuemin={0} aria-valuemax={100}>
                      <div className="health-fill" style={{ width: '92%', background: '#10b981' }}></div>
                    </div>
                    <span className="health-value">Excellent</span>
                  </div>
                  <div className="health-item">
                    <span>Server Uptime</span>
                    <div className="health-bar" role="progressbar" aria-valuenow={99} aria-valuemin={0} aria-valuemax={100}>
                      <div className="health-fill" style={{ width: '99%', background: '#10b981' }}></div>
                    </div>
                    <span className="health-value">99.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
