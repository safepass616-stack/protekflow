import React, { useState } from 'react';
import { FileText, AlertTriangle } from 'lucide-react';
import FormInput from './FormInput';
import DocumentPreview from './DocumentPreview';
import { generateDocument } from '../utils/documentGenerator';
import { ProjectData, User } from '../types';
import './DocumentGenerator.css';

interface DocumentGeneratorProps {
  user: User;
}

const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ user }) => {
  const [projectData, setProjectData] = useState<ProjectData>({
    project_name: '',
    client_name: '',
    company_name: user.company,
    site_location: '',
    scope_of_work: '',
    project_duration: '',
    workers: '',
    risk_level: 'Medium',
    equipment: '',
    hazards: '',
    controls: '',
    // New safety fields
    work_type: undefined,
    height_work: false,
    excavation: false,
    confined_space: false,
    hazardous_substances: false,
    traffic_management: false
  });

  const [generatedDoc, setGeneratedDoc] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof ProjectData, value: string | boolean) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    const document = generateDocument(projectData);
    setGeneratedDoc(document);
    setShowPreview(true);
  };

  const isFormValid = () => {
    return projectData.project_name && 
           projectData.client_name && 
           projectData.site_location && 
           projectData.scope_of_work;
  };

  return (
    <div className="document-generator">
      <div className="generator-content">
        <div className="form-section">
          <div className="section-header">
            <FileText size={24} />
            <h3>Generate HSE Document</h3>
          </div>

          <div className="form-grid">
            <FormInput
              label="Project Name"
              value={projectData.project_name}
              onChange={(value) => handleInputChange('project_name', value)}
              placeholder="e.g., N1 Highway Extension Phase 2"
              required
            />

            <FormInput
              label="Client Name"
              value={projectData.client_name}
              onChange={(value) => handleInputChange('client_name', value)}
              placeholder="e.g., South African National Roads Agency"
              required
            />

            <FormInput
              label="Company Name"
              value={projectData.company_name}
              onChange={(value) => handleInputChange('company_name', value)}
              placeholder="e.g., BuildSafe Construction (Pty) Ltd"
              required
            />

            <FormInput
              label="Site Location"
              value={projectData.site_location}
              onChange={(value) => handleInputChange('site_location', value)}
              placeholder="e.g., Johannesburg, Gauteng"
              required
            />

            {/* Work Type Classification */}
            <div className="form-group">
              <label>
                Work Type Classification
                <span className="required-indicator">*</span>
              </label>
              <select
                value={projectData.work_type || ''}
                onChange={(e) => handleInputChange('work_type', e.target.value as ProjectData['work_type'])}
                className="select-input"
              >
                <option value="">Select work type</option>
                <option value="construction">Construction</option>
                <option value="electrical">Electrical</option>
                <option value="demolition">Demolition</option>
                <option value="civil">Civil Engineering</option>
              </select>
            </div>

            <FormInput
              label="Scope of Work"
              value={projectData.scope_of_work}
              onChange={(value) => handleInputChange('scope_of_work', value)}
              placeholder="e.g., Road construction, earthworks, drainage installation"
              required
              textarea
            />

            <FormInput
              label="Project Duration"
              value={projectData.project_duration}
              onChange={(value) => handleInputChange('project_duration', value)}
              placeholder="e.g., 12 months"
            />

            <FormInput
              label="Number of Workers"
              value={projectData.workers}
              onChange={(value) => handleInputChange('workers', value)}
              placeholder="e.g., 45"
              type="number"
            />

            <div className="form-group">
              <label>Risk Level</label>
              <select
                value={projectData.risk_level}
                onChange={(e) => handleInputChange('risk_level', e.target.value)}
                className="select-input"
              >
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
              </select>
            </div>

            {/* Hazard Identification Section */}
            <div className="form-group full-width hazard-section">
              <div className="section-divider">
                <AlertTriangle size={20} />
                <h4>Hazard Identification</h4>
              </div>
              <p className="section-description">
                Select all hazards present on this project site
              </p>
              
              <div className="checkbox-grid">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={projectData.height_work || false}
                    onChange={(e) => handleInputChange('height_work', e.target.checked)}
                  />
                  <span>Work at Heights (above 2m)</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={projectData.excavation || false}
                    onChange={(e) => handleInputChange('excavation', e.target.checked)}
                  />
                  <span>Excavation Work</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={projectData.confined_space || false}
                    onChange={(e) => handleInputChange('confined_space', e.target.checked)}
                  />
                  <span>Confined Space Entry</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={projectData.hazardous_substances || false}
                    onChange={(e) => handleInputChange('hazardous_substances', e.target.checked)}
                  />
                  <span>Hazardous Substances</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={projectData.traffic_management || false}
                    onChange={(e) => handleInputChange('traffic_management', e.target.checked)}
                  />
                  <span>Traffic Management Required</span>
                </label>
              </div>
            </div>

            <FormInput
              label="Equipment Used"
              value={projectData.equipment}
              onChange={(value) => handleInputChange('equipment', value)}
              placeholder="e.g., Excavators, bulldozers, compactors, concrete mixers"
              textarea
            />

            <FormInput
              label="Hazards Identified"
              value={projectData.hazards}
              onChange={(value) => handleInputChange('hazards', value)}
              placeholder="e.g., Working at heights, heavy machinery operation, dust exposure"
              textarea
            />

            <FormInput
              label="Control Measures"
              value={projectData.controls}
              onChange={(value) => handleInputChange('controls', value)}
              placeholder="e.g., Fall protection systems, machine guards, dust suppression"
              textarea
            />
          </div>

          <button 
            className="generate-btn"
            onClick={handleGenerate}
            disabled={!isFormValid()}
          >
            <FileText size={20} />
            Generate HSE Document
          </button>
        </div>

        {showPreview && (
          <div className="preview-section">
            <DocumentPreview content={generatedDoc} projectData={projectData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentGenerator;
