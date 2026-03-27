import React from 'react';
import { Download, FileText, CheckCircle } from 'lucide-react';
import { ProjectData } from '../types';
import './DocumentPreview.css';

interface DocumentPreviewProps {
  content: string;
  projectData: ProjectData;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ content, projectData }) => {
  const currentDate = new Date().toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectData.project_name || 'HSE-Document'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="document-preview">
      <div className="preview-header">
        <div className="preview-title">
          <FileText size={24} />
          <h3>Document Preview</h3>
        </div>
        <div className="preview-actions">
          <button className="action-btn print-btn" onClick={handlePrint}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print
          </button>
          <button className="action-btn download-btn" onClick={handleDownload}>
            <Download size={20} />
            Download
          </button>
        </div>
      </div>

      <div className="preview-content pdf-document">
        {/* Document Header/Letterhead */}
        <div className="document-header">
          <div className="header-branding">
            <div className="company-logo">
              <FileText size={32} />
            </div>
            <div className="company-info">
              <h1 className="company-name">Protekflow AI</h1>
              <p className="company-tagline">HSE Compliance Solutions</p>
            </div>
          </div>
          <div className="document-meta">
            <p className="doc-reference">Document Reference: HSE-{Date.now().toString().slice(-6)}</p>
            <p className="doc-date">Generated: {currentDate}</p>
          </div>
        </div>

        {/* Document Title Page */}
        <div className="title-page">
          <div className="title-badge">
            <CheckCircle size={24} />
            <span>CONSTRUCTION REGULATIONS 2014 COMPLIANT</span>
          </div>
          <h1 className="document-title">HEALTH AND SAFETY FILE</h1>
          <h2 className="document-subtitle">Construction Regulations 2014 Compliance Document</h2>
          
          <div className="title-info-grid">
            <div className="title-info-item">
              <label>Project Name</label>
              <p>{projectData.project_name}</p>
            </div>
            <div className="title-info-item">
              <label>Client</label>
              <p>{projectData.client_name}</p>
            </div>
            <div className="title-info-item">
              <label>Principal Contractor</label>
              <p>{projectData.company_name}</p>
            </div>
            <div className="title-info-item">
              <label>Site Location</label>
              <p>{projectData.site_location}</p>
            </div>
          </div>

          <div className="regulation-references">
            <p><strong>Regulation Reference:</strong> Construction Regulations, 2014 (Government Gazette No. 37305)</p>
            <p><strong>Act Reference:</strong> Occupational Health and Safety Act, 1993 (Act No. 85 of 1993)</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="document-section">
          <div className="section-header">
            <div className="section-number">1</div>
            <h2>EXECUTIVE SUMMARY</h2>
          </div>
          <div className="section-content">
            <div className="info-table">
              <div className="info-row">
                <div className="info-label">Project Overview</div>
                <div className="info-value">{projectData.scope_of_work}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Project Duration</div>
                <div className="info-value">{projectData.project_duration || 'To be determined'}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Number of Workers</div>
                <div className="info-value">{projectData.workers || 'To be determined'}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Risk Classification</div>
                <div className="info-value">
                  <span className={`risk-badge ${projectData.risk_level?.toLowerCase()}`}>
                    {projectData.risk_level} Risk Construction Work
                  </span>
                </div>
              </div>
              {projectData.work_type && (
                <div className="info-row">
                  <div className="info-label">Work Type Classification</div>
                  <div className="info-value">
                    <span className="work-type-badge">
                      {projectData.work_type.charAt(0).toUpperCase() + projectData.work_type.slice(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hazard Profile */}
        <div className="document-section">
          <div className="section-header">
            <div className="section-number">2</div>
            <h2>HAZARD PROFILE</h2>
          </div>
          <div className="section-content">
            <p className="section-intro">Major hazards identified on this project:</p>
            
            <div className="hazard-grid">
              {projectData.height_work && (
                <div className="hazard-card active">
                  <div className="hazard-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="hazard-info">
                    <h4>Work at Heights</h4>
                    <p>Fall protection measures required</p>
                    <span className="regulation-tag">Regulation 10</span>
                  </div>
                </div>
              )}
              
              {projectData.excavation && (
                <div className="hazard-card active">
                  <div className="hazard-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="hazard-info">
                    <h4>Excavation Work</h4>
                    <p>Support systems and inspections required</p>
                    <span className="regulation-tag">Regulation 11</span>
                  </div>
                </div>
              )}
              
              {projectData.confined_space && (
                <div className="hazard-card active">
                  <div className="hazard-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="hazard-info">
                    <h4>Confined Space Entry</h4>
                    <p>Permit-to-work and atmospheric testing required</p>
                    <span className="regulation-tag">Permit Required</span>
                  </div>
                </div>
              )}
              
              {projectData.hazardous_substances && (
                <div className="hazard-card active">
                  <div className="hazard-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="hazard-info">
                    <h4>Hazardous Substances</h4>
                    <p>Chemical management and PPE required</p>
                    <span className="regulation-tag">SDS Required</span>
                  </div>
                </div>
              )}
              
              {projectData.traffic_management && (
                <div className="hazard-card active">
                  <div className="hazard-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="hazard-info">
                    <h4>Traffic Management</h4>
                    <p>Vehicle/pedestrian separation required</p>
                    <span className="regulation-tag">TMP Required</span>
                  </div>
                </div>
              )}
            </div>

            {projectData.equipment && (
              <div className="subsection">
                <h3>Equipment Used</h3>
                <p>{projectData.equipment}</p>
              </div>
            )}

            {projectData.hazards && (
              <div className="subsection">
                <h3>Additional Hazards Identified</h3>
                <p>{projectData.hazards}</p>
              </div>
            )}

            {projectData.controls && (
              <div className="subsection">
                <h3>Control Measures</h3>
                <p>{projectData.controls}</p>
              </div>
            )}
          </div>
        </div>

        {/* Project Information */}
        <div className="document-section">
          <div className="section-header">
            <div className="section-number">3</div>
            <h2>PROJECT INFORMATION</h2>
          </div>
          <div className="section-content">
            <div className="subsection">
              <h3>3.1 Project Overview</h3>
              <div className="info-table">
                <div className="info-row">
                  <div className="info-label">Project Name</div>
                  <div className="info-value">{projectData.project_name}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Project Description</div>
                  <div className="info-value">{projectData.scope_of_work}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Project Location</div>
                  <div className="info-value">{projectData.site_location}</div>
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3>3.2 Project Dates</h3>
              <div className="info-table">
                <div className="info-row">
                  <div className="info-label">Commencement Date</div>
                  <div className="info-value">To be confirmed</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Expected Completion Date</div>
                  <div className="info-value">To be confirmed</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Total Duration</div>
                  <div className="info-value">{projectData.project_duration}</div>
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3>3.3 Construction Work Classification</h3>
              <div className="info-table">
                <div className="info-row">
                  <div className="info-label">Type of Construction Work</div>
                  <div className="info-value">{projectData.scope_of_work}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Risk Classification</div>
                  <div className="info-value">
                    <span className={`risk-badge ${projectData.risk_level?.toLowerCase()}`}>
                      {projectData.risk_level} Risk Construction Work
                    </span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-label">Number of Workers</div>
                  <div className="info-value">{projectData.workers}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Permit Required</div>
                  <div className="info-value">
                    {projectData.workers && parseInt(projectData.workers) > 50 
                      ? 'YES - Construction work permit required (more than 50 workers)'
                      : 'To be determined based on project scope'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Checklist */}
        <div className="document-section">
          <div className="section-header">
            <div className="section-number">4</div>
            <h2>COMPLIANCE CHECKLIST</h2>
          </div>
          <div className="section-content">
            <div className="compliance-grid">
              <div className="compliance-item">
                <CheckCircle size={18} className="check-icon" />
                <span>Construction Regulations 2014 - Compliant</span>
              </div>
              <div className="compliance-item">
                <CheckCircle size={18} className="check-icon" />
                <span>OHSA 1993 - Compliant</span>
              </div>
              <div className="compliance-item">
                <CheckCircle size={18} className="check-icon" />
                <span>Risk Assessment - Complete</span>
              </div>
              <div className="compliance-item">
                <CheckCircle size={18} className="check-icon" />
                <span>Method Statements - Included</span>
              </div>
              {projectData.height_work && (
                <div className="compliance-item">
                  <CheckCircle size={18} className="check-icon" />
                  <span>Fall Protection Plan - Regulation 10</span>
                </div>
              )}
              {projectData.excavation && (
                <div className="compliance-item">
                  <CheckCircle size={18} className="check-icon" />
                  <span>Excavation Safety Plan - Regulation 11</span>
                </div>
              )}
              {projectData.confined_space && (
                <div className="compliance-item">
                  <CheckCircle size={18} className="check-icon" />
                  <span>Confined Space Entry Procedures</span>
                </div>
              )}
              {projectData.hazardous_substances && (
                <div className="compliance-item">
                  <CheckCircle size={18} className="check-icon" />
                  <span>Hazardous Substances Management</span>
                </div>
              )}
              {projectData.traffic_management && (
                <div className="compliance-item">
                  <CheckCircle size={18} className="check-icon" />
                  <span>Traffic Management Plan - Complete</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="document-footer">
          <div className="footer-content">
            <div className="footer-section">
              <p><strong>Document Generated by:</strong> Protekflow AI - HSE Compliance Solutions</p>
              <p><strong>Generation Date:</strong> {currentDate}</p>
              <p><strong>Template Version:</strong> 1.0 (Enhanced with Work Type Classification & Hazard-Specific Sections)</p>
            </div>
            <div className="footer-section">
              <p><strong>Regulation Reference:</strong> Construction Regulations, 2014 (Government Gazette No. 37305)</p>
              <p><strong>Act Reference:</strong> Occupational Health and Safety Act, 1993 (Act No. 85 of 1993)</p>
            </div>
          </div>
          <div className="footer-watermark">
            <FileText size={48} />
            <p>DRAFT DOCUMENT - FOR PROFESSIONAL REVIEW</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
