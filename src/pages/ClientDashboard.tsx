import React, { useState, useEffect } from 'react';
import { Shield, LogOut, FileText, Plus, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { SkeletonCard, SkeletonTable } from '../components/Skeleton';
import './ClientDashboard.css';

interface ClientDashboardProps {
  user: User;
  profile: {
    role: string;
    full_name: string;
  };
  onLogout: () => void;
  onCreateDocument?: () => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, profile, onLogout, onCreateDocument }) => {
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
      setHasDocuments(false); // Set to false to show empty state initially
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDocument = () => {
    if (onCreateDocument) {
      onCreateDocument();
    } else {
      console.log('Create new document');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="client-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-logo">
          <Shield size={32} aria-hidden="true" />
          <span>Protekflow AI</span>
        </div>
        <div className="nav-user">
          <span>{profile.full_name}</span>
          <button 
            onClick={onLogout} 
            className="logout-button"
            aria-label="Logout from account"
          >
            <LogOut size={18} aria-hidden="true" />
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1>Client Dashboard</h1>
            <p>Manage your HSE documentation and compliance</p>
          </div>
          <button 
            className="create-button"
            onClick={handleCreateDocument}
            aria-label="Create new document"
          >
            <Plus size={20} aria-hidden="true" />
            Create New Document
          </button>
        </div>

        {isLoading ? (
          <>
            <div className="stats-grid">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <div className="documents-section">
              <div className="section-header">
                <h2>Recent Documents</h2>
              </div>
              <SkeletonTable rows={4} />
            </div>
          </>
        ) : hasError ? (
          <ErrorState
            title="Failed to Load Documents"
            message="We couldn't load your documents. Please check your connection and try again."
            onRetry={loadDashboardData}
          />
        ) : (
          <>
            <div className="stats-grid" role="region" aria-label="Document statistics" aria-live="polite">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(56, 189, 248, 0.1)' }}>
                  <FileText size={24} color="#38bdf8" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>Total Documents</h3>
                  <p className="stat-value">{hasDocuments ? '24' : '0'}</p>
                  <span className="stat-change">All time</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                  <Clock size={24} color="#f59e0b" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>In Review</h3>
                  <p className="stat-value">{hasDocuments ? '3' : '0'}</p>
                  <span className="stat-change">Being reviewed</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <CheckCircle size={24} color="#10b981" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>Completed</h3>
                  <p className="stat-value">{hasDocuments ? '18' : '0'}</p>
                  <span className="stat-change positive">Ready to use</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                  <AlertTriangle size={24} color="#ef4444" aria-hidden="true" />
                </div>
                <div className="stat-info">
                  <h3>Requires Action</h3>
                  <p className="stat-value">{hasDocuments ? '2' : '0'}</p>
                  <span className="stat-change">Needs revision</span>
                </div>
              </div>
            </div>

            <div className="documents-section">
              <div className="section-header">
                <h2>Recent Documents</h2>
                {hasDocuments && (
                  <div className="section-filters">
                    <select className="filter-select" aria-label="Filter by status">
                      <option>All Status</option>
                      <option>In Review</option>
                      <option>Completed</option>
                      <option>Requires Action</option>
                    </select>
                    <select className="filter-select" aria-label="Filter by document type">
                      <option>All Types</option>
                      <option>Health & Safety Plan</option>
                      <option>Risk Assessment</option>
                      <option>Method Statement</option>
                    </select>
                  </div>
                )}
              </div>

              {!hasDocuments ? (
                <EmptyState
                  icon="documents"
                  title="No Documents Yet"
                  message="Create your first HSE compliance document to get started with Protekflow AI."
                  actionLabel="Create Document"
                  onAction={handleCreateDocument}
                />
              ) : (
                <div className="documents-table">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Document Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr 
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, () => console.log('View document'))}
                      >
                        <td>
                          <div className="document-name">
                            <FileText size={18} aria-hidden="true" />
                            <span>Bridge Construction - Health & Safety Plan</span>
                          </div>
                        </td>
                        <td>Health & Safety Plan</td>
                        <td>
                          <span className="status-badge in-review">
                            <Clock size={14} aria-hidden="true" />
                            <span>In Review</span>
                          </span>
                        </td>
                        <td>
                          <time dateTime="2024-01-15">2024-01-15</time>
                        </td>
                        <td>
                          <button className="table-action" aria-label="View Bridge Construction document">
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
