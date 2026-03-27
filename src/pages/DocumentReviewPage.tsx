import React, { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  AlertCircle,
  Send,
  Edit3,
  Eye,
  Calendar,
  User,
  Building,
  MapPin,
  Users,
  TrendingUp,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { Document, User as UserType } from '../types';
import './DocumentReviewPage.css';

interface DocumentReviewPageProps {
  document: Document;
  user: UserType;
  onBack: () => void;
}

interface Comment {
  id: string;
  author: string;
  role: 'professional' | 'client';
  content: string;
  timestamp: string;
  type: 'comment' | 'revision-request' | 'approval' | 'rejection';
}

const DocumentReviewPage: React.FC<DocumentReviewPageProps> = ({ document, user, onBack }) => {
  const [activeTab, setActiveTab] = useState<'document' | 'comments' | 'history'>('document');
  const [reviewStatus, setReviewStatus] = useState<'reviewing' | 'approved' | 'rejected' | 'revision-requested'>('reviewing');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Client User',
      role: 'client',
      content: 'Initial document submission. Please review the safety measures outlined in Section 9.',
      timestamp: '2026-01-18 09:30',
      type: 'comment'
    }
  ]);

  // Mock document data - in production, this would come from the backend
  const documentContent = {
    projectName: 'N2 Highway Extension - Safety Plan',
    clientName: 'Buffalo City Metropolitan',
    companyName: 'BuildSafe Construction (Pty) Ltd',
    siteLocation: 'East London, Eastern Cape',
    scopeOfWork: 'Highway extension, bridge construction, earthworks, drainage installation',
    projectDuration: '18 months',
    workers: '85',
    riskLevel: 'High',
    workType: 'civil',
    equipment: 'Excavators, bulldozers, compactors, concrete mixers, cranes, piling equipment',
    hazards: 'Work at heights, excavation work, heavy machinery operation, traffic management, confined space entry',
    controls: 'Fall protection systems, excavation support, machine guards, traffic control, confined space procedures',
    createdDate: '2026-01-18',
    version: 1,
    // Hazards
    heightWork: true,
    excavation: true,
    confinedSpace: false,
    hazardousSubstances: false,
    trafficManagement: true
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: user.name,
        role: 'professional',
        content: comment,
        timestamp: new Date().toLocaleString(),
        type: 'comment'
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleRequestRevision = () => {
    if (comment.trim()) {
      const revisionRequest: Comment = {
        id: Date.now().toString(),
        author: user.name,
        role: 'professional',
        content: comment,
        timestamp: new Date().toLocaleString(),
        type: 'revision-request'
      };
      setComments([...comments, revisionRequest]);
      setReviewStatus('revision-requested');
      setComment('');
    }
  };

  const handleApprove = () => {
    const approvalComment: Comment = {
      id: Date.now().toString(),
      author: user.name,
      role: 'professional',
      content: 'Document approved. All safety requirements meet Construction Regulations 2014 compliance standards.',
      timestamp: new Date().toLocaleString(),
      type: 'approval'
    };
    setComments([...comments, approvalComment]);
    setReviewStatus('approved');
  };

  const handleReject = () => {
    if (comment.trim()) {
      const rejectionComment: Comment = {
        id: Date.now().toString(),
        author: user.name,
        role: 'professional',
        content: comment,
        timestamp: new Date().toLocaleString(),
        type: 'rejection'
      };
      setComments([...comments, rejectionComment]);
      setReviewStatus('rejected');
      setComment('');
    }
  };

  const openInGoogleDocs = () => {
    // In production, this would open the actual Google Docs link
    window.open('https://docs.google.com/document/d/example', '_blank');
  };

  return (
    <div className="document-review-page">
      {/* Header */}
      <div className="review-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        
        <div className="header-actions">
          <button className="btn-secondary" onClick={openInGoogleDocs}>
            <ExternalLink size={20} />
            Open in Google Docs
          </button>
          <button className="btn-secondary">
            <Download size={20} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Document Title & Status */}
      <div className="document-title-section">
        <div className="title-content">
          <div className="document-icon-large">
            <FileText size={32} />
          </div>
          <div>
            <h1>{documentContent.projectName}</h1>
            <div className="document-meta-row">
              <span className="meta-item">
                <Building size={16} />
                {documentContent.clientName}
              </span>
              <span className="meta-item">
                <Calendar size={16} />
                Submitted: {documentContent.createdDate}
              </span>
              <span className="meta-item">
                <Clock size={16} />
                Version {documentContent.version}
              </span>
            </div>
          </div>
        </div>
        
        <div className={`status-badge-large ${reviewStatus}`}>
          {reviewStatus === 'reviewing' && <><Clock size={20} /> In Review</>}
          {reviewStatus === 'approved' && <><CheckCircle size={20} /> Approved</>}
          {reviewStatus === 'rejected' && <><XCircle size={20} /> Rejected</>}
          {reviewStatus === 'revision-requested' && <><AlertCircle size={20} /> Revision Requested</>}
        </div>
      </div>

      {/* Tabs */}
      <div className="review-tabs">
        <button
          className={activeTab === 'document' ? 'active' : ''}
          onClick={() => setActiveTab('document')}
        >
          <Eye size={20} />
          Document Content
        </button>
        <button
          className={activeTab === 'comments' ? 'active' : ''}
          onClick={() => setActiveTab('comments')}
        >
          <MessageSquare size={20} />
          Comments & Revisions
          {comments.length > 0 && <span className="tab-badge">{comments.length}</span>}
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          <Clock size={20} />
          Review History
        </button>
      </div>

      {/* Content Area */}
      <div className="review-content-grid">
        <div className="main-content">
          {activeTab === 'document' && (
            <div className="document-content-view">
              <div className="content-section">
                <h2>Project Information</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Project Name</label>
                    <p>{documentContent.projectName}</p>
                  </div>
                  <div className="info-item">
                    <label>Client</label>
                    <p>{documentContent.clientName}</p>
                  </div>
                  <div className="info-item">
                    <label>Principal Contractor</label>
                    <p>{documentContent.companyName}</p>
                  </div>
                  <div className="info-item">
                    <label>Site Location</label>
                    <p><MapPin size={14} /> {documentContent.siteLocation}</p>
                  </div>
                  <div className="info-item full-width">
                    <label>Scope of Work</label>
                    <p>{documentContent.scopeOfWork}</p>
                  </div>
                  <div className="info-item">
                    <label>Project Duration</label>
                    <p><Calendar size={14} /> {documentContent.projectDuration}</p>
                  </div>
                  <div className="info-item">
                    <label>Number of Workers</label>
                    <p><Users size={14} /> {documentContent.workers}</p>
                  </div>
                  <div className="info-item">
                    <label>Risk Level</label>
                    <p className={`risk-badge ${documentContent.riskLevel.toLowerCase()}`}>
                      <TrendingUp size={14} />
                      {documentContent.riskLevel} Risk
                    </p>
                  </div>
                  <div className="info-item">
                    <label>Work Type</label>
                    <p className="work-type-badge">{documentContent.workType}</p>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h2><AlertTriangle size={24} /> Hazard Profile</h2>
                <div className="hazard-checklist">
                  <div className={`hazard-item ${documentContent.heightWork ? 'active' : 'inactive'}`}>
                    {documentContent.heightWork ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    <span>Work at Heights (above 2m)</span>
                    {documentContent.heightWork && <span className="regulation-tag">Regulation 10</span>}
                  </div>
                  <div className={`hazard-item ${documentContent.excavation ? 'active' : 'inactive'}`}>
                    {documentContent.excavation ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    <span>Excavation Work</span>
                    {documentContent.excavation && <span className="regulation-tag">Regulation 11</span>}
                  </div>
                  <div className={`hazard-item ${documentContent.confinedSpace ? 'active' : 'inactive'}`}>
                    {documentContent.confinedSpace ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    <span>Confined Space Entry</span>
                    {documentContent.confinedSpace && <span className="regulation-tag">Permit Required</span>}
                  </div>
                  <div className={`hazard-item ${documentContent.hazardousSubstances ? 'active' : 'inactive'}`}>
                    {documentContent.hazardousSubstances ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    <span>Hazardous Substances</span>
                    {documentContent.hazardousSubstances && <span className="regulation-tag">SDS Required</span>}
                  </div>
                  <div className={`hazard-item ${documentContent.trafficManagement ? 'active' : 'inactive'}`}>
                    {documentContent.trafficManagement ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    <span>Traffic Management Required</span>
                    {documentContent.trafficManagement && <span className="regulation-tag">TMP Required</span>}
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h2>Equipment & Controls</h2>
                <div className="info-grid">
                  <div className="info-item full-width">
                    <label>Equipment Used</label>
                    <p>{documentContent.equipment}</p>
                  </div>
                  <div className="info-item full-width">
                    <label>Hazards Identified</label>
                    <p>{documentContent.hazards}</p>
                  </div>
                  <div className="info-item full-width">
                    <label>Control Measures</label>
                    <p>{documentContent.controls}</p>
                  </div>
                </div>
              </div>

              <div className="compliance-checklist">
                <h2>Compliance Checklist</h2>
                <div className="checklist-grid">
                  <div className="checklist-item">
                    <CheckCircle size={18} className="check-icon" />
                    <span>Construction Regulations 2014 - Compliant</span>
                  </div>
                  <div className="checklist-item">
                    <CheckCircle size={18} className="check-icon" />
                    <span>OHSA 1993 - Compliant</span>
                  </div>
                  <div className="checklist-item">
                    <CheckCircle size={18} className="check-icon" />
                    <span>Risk Assessment - Complete</span>
                  </div>
                  <div className="checklist-item">
                    <CheckCircle size={18} className="check-icon" />
                    <span>Method Statements - Included</span>
                  </div>
                  {documentContent.heightWork && (
                    <div className="checklist-item">
                      <CheckCircle size={18} className="check-icon" />
                      <span>Fall Protection Plan - Regulation 10</span>
                    </div>
                  )}
                  {documentContent.excavation && (
                    <div className="checklist-item">
                      <CheckCircle size={18} className="check-icon" />
                      <span>Excavation Safety Plan - Regulation 11</span>
                    </div>
                  )}
                  {documentContent.trafficManagement && (
                    <div className="checklist-item">
                      <CheckCircle size={18} className="check-icon" />
                      <span>Traffic Management Plan - Complete</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="comments-view">
              <div className="comments-list">
                {comments.map(c => (
                  <div key={c.id} className={`comment-card ${c.type}`}>
                    <div className="comment-header">
                      <div className="comment-author">
                        <User size={20} />
                        <div>
                          <p className="author-name">{c.author}</p>
                          <p className="author-role">{c.role === 'professional' ? 'HSE Professional' : 'Client'}</p>
                        </div>
                      </div>
                      <div className="comment-meta">
                        <span className={`comment-type-badge ${c.type}`}>
                          {c.type === 'comment' && 'Comment'}
                          {c.type === 'revision-request' && 'Revision Request'}
                          {c.type === 'approval' && 'Approved'}
                          {c.type === 'rejection' && 'Rejected'}
                        </span>
                        <span className="comment-time">{c.timestamp}</span>
                      </div>
                    </div>
                    <div className="comment-content">
                      <p>{c.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {reviewStatus === 'reviewing' && (
                <div className="comment-input-section">
                  <textarea
                    className="comment-textarea"
                    placeholder="Add a comment or request revisions..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                  />
                  <div className="comment-actions">
                    <button
                      className="btn-secondary"
                      onClick={handleAddComment}
                      disabled={!comment.trim()}
                    >
                      <Send size={18} />
                      Add Comment
                    </button>
                    <button
                      className="btn-warning"
                      onClick={handleRequestRevision}
                      disabled={!comment.trim()}
                    >
                      <Edit3 size={18} />
                      Request Revision
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-view">
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot submitted"></div>
                  <div className="timeline-content">
                    <h4>Document Submitted</h4>
                    <p>Client submitted document for professional review</p>
                    <span className="timeline-time">2026-01-18 09:30</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot in-progress"></div>
                  <div className="timeline-content">
                    <h4>Review Started</h4>
                    <p>{user.name} started reviewing the document</p>
                    <span className="timeline-time">2026-01-18 10:15</span>
                  </div>
                </div>
                {reviewStatus === 'revision-requested' && (
                  <div className="timeline-item">
                    <div className="timeline-dot revision"></div>
                    <div className="timeline-content">
                      <h4>Revision Requested</h4>
                      <p>Professional requested changes to the document</p>
                      <span className="timeline-time">{new Date().toLocaleString()}</span>
                    </div>
                  </div>
                )}
                {reviewStatus === 'approved' && (
                  <div className="timeline-item">
                    <div className="timeline-dot approved"></div>
                    <div className="timeline-content">
                      <h4>Document Approved</h4>
                      <p>{user.name} approved the document</p>
                      <span className="timeline-time">{new Date().toLocaleString()}</span>
                    </div>
                  </div>
                )}
                {reviewStatus === 'rejected' && (
                  <div className="timeline-item">
                    <div className="timeline-dot rejected"></div>
                    <div className="timeline-content">
                      <h4>Document Rejected</h4>
                      <p>{user.name} rejected the document</p>
                      <span className="timeline-time">{new Date().toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Actions */}
        <div className="review-sidebar">
          <div className="sidebar-card">
            <h3>Review Actions</h3>
            
            {reviewStatus === 'reviewing' && (
              <>
                <button className="action-btn approve" onClick={handleApprove}>
                  <CheckCircle size={20} />
                  Approve Document
                </button>
                <button className="action-btn reject" onClick={handleReject} disabled={!comment.trim()}>
                  <XCircle size={20} />
                  Reject Document
                </button>
                <button className="action-btn edit" onClick={openInGoogleDocs}>
                  <Edit3 size={20} />
                  Edit in Google Docs
                </button>
              </>
            )}

            {reviewStatus === 'approved' && (
              <div className="status-message success">
                <CheckCircle size={24} />
                <p>Document has been approved</p>
              </div>
            )}

            {reviewStatus === 'rejected' && (
              <div className="status-message error">
                <XCircle size={24} />
                <p>Document has been rejected</p>
              </div>
            )}

            {reviewStatus === 'revision-requested' && (
              <div className="status-message warning">
                <AlertCircle size={24} />
                <p>Waiting for client revisions</p>
              </div>
            )}
          </div>

          <div className="sidebar-card">
            <h3>Document Details</h3>
            <div className="detail-list">
              <div className="detail-item">
                <label>Document Type</label>
                <p>Site Safety Plan</p>
              </div>
              <div className="detail-item">
                <label>Submitted By</label>
                <p>{documentContent.clientName}</p>
              </div>
              <div className="detail-item">
                <label>Submission Date</label>
                <p>{documentContent.createdDate}</p>
              </div>
              <div className="detail-item">
                <label>Current Version</label>
                <p>Version {documentContent.version}</p>
              </div>
              <div className="detail-item">
                <label>Review Deadline</label>
                <p className="deadline-text">2026-01-20 (2 days)</p>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Compliance Status</h3>
            <div className="compliance-status-list">
              <div className="compliance-item compliant">
                <CheckCircle size={16} />
                <span>Construction Regulations 2014</span>
              </div>
              <div className="compliance-item compliant">
                <CheckCircle size={16} />
                <span>OHSA 1993</span>
              </div>
              <div className="compliance-item compliant">
                <CheckCircle size={16} />
                <span>Risk Assessment Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentReviewPage;
