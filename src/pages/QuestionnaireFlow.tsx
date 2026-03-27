import React, { useState } from 'react';
import { ClipboardList, AlertTriangle, Users, MapPin, Calendar, DollarSign, ArrowRight, ArrowLeft, CheckCircle, Wrench } from 'lucide-react';
import { QuestionnaireData } from '../types/workflow';
import './QuestionnaireFlow.css';

interface QuestionnaireFlowProps {
  onComplete: (data: QuestionnaireData) => void;
  onBack: () => void;
}

const QuestionnaireFlow: React.FC<QuestionnaireFlowProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<QuestionnaireData>>({
    projectType: 'construction',
    identifiedHazards: [],
    requiredPermits: [],
    workAtHeight: false,
    excavationWork: false,
    confinedSpace: false,
    hotWork: false,
    electricalWork: false,
    heavyMachinery: false,
    hazardousSubstances: false,
    publicTraffic: false,
    hasConstructionManager: false,
    hasHealthSafetyOfficer: false,
    hasFirstAider: false,
    hasFireMarshal: false,
    numberOfEmployees: 0,
    numberOfContractors: 0
  });

  const totalSteps = 5;

  const handleChange = (field: keyof QuestionnaireData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleHazard = (hazard: string) => {
    const current = formData.identifiedHazards || [];
    const updated = current.includes(hazard)
      ? current.filter(h => h !== hazard)
      : [...current, hazard];
    handleChange('identifiedHazards', updated);
  };

  const togglePermit = (permit: string) => {
    const current = formData.requiredPermits || [];
    const updated = current.includes(permit)
      ? current.filter(p => p !== permit)
      : [...current, permit];
    handleChange('requiredPermits', updated);
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData as QuestionnaireData);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.projectName && formData.projectType && formData.projectLocation;
      case 2:
        return formData.clientName && formData.principalContractor && formData.siteAddress;
      case 3:
        return formData.numberOfEmployees !== undefined && formData.numberOfEmployees > 0;
      case 4:
        return true;
      case 5:
        return formData.equipmentList && formData.workingHours;
      default:
        return false;
    }
  };

  return (
    <div className="questionnaire-flow">
      <div className="questionnaire-header">
        <button className="back-btn" onClick={handlePrevious}>
          <ArrowLeft size={20} />
          {step === 1 ? 'Back' : 'Previous'}
        </button>
        <div className="progress-indicator">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
          <span className="progress-text">Step {step} of {totalSteps}</span>
        </div>
      </div>

      <div className="questionnaire-container">
        <div className="questionnaire-content">
          {step === 1 && (
            <div className="form-step">
              <div className="step-header">
                <ClipboardList size={32} />
                <h2>Project Information</h2>
                <p>Tell us about your construction project</p>
              </div>

              <div className="form-group">
                <label>
                  <MapPin size={18} />
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.projectName || ''}
                  onChange={(e) => handleChange('projectName', e.target.value)}
                  placeholder="e.g., N1 Highway Extension Phase 2"
                />
              </div>

              <div className="form-group">
                <label>
                  <ClipboardList size={18} />
                  Project Type *
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleChange('projectType', e.target.value)}
                >
                  <option value="construction">Construction</option>
                  <option value="civil">Civil Engineering</option>
                  <option value="electrical">Electrical</option>
                  <option value="demolition">Demolition</option>
                  <option value="mining">Mining</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <MapPin size={18} />
                  Project Location *
                </label>
                <input
                  type="text"
                  value={formData.projectLocation || ''}
                  onChange={(e) => handleChange('projectLocation', e.target.value)}
                  placeholder="e.g., Johannesburg, Gauteng"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Calendar size={18} />
                    Project Duration
                  </label>
                  <input
                    type="text"
                    value={formData.projectDuration || ''}
                    onChange={(e) => handleChange('projectDuration', e.target.value)}
                    placeholder="e.g., 12 months"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <DollarSign size={18} />
                    Project Value
                  </label>
                  <input
                    type="text"
                    value={formData.projectValue || ''}
                    onChange={(e) => handleChange('projectValue', e.target.value)}
                    placeholder="e.g., R 5,000,000"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="step-header">
                <Users size={32} />
                <h2>Client & Site Information</h2>
                <p>Details about the client and project site</p>
              </div>

              <div className="form-group">
                <label>
                  <Users size={18} />
                  Client Name *
                </label>
                <input
                  type="text"
                  value={formData.clientName || ''}
                  onChange={(e) => handleChange('clientName', e.target.value)}
                  placeholder="e.g., City of Johannesburg Municipality"
                />
              </div>

              <div className="form-group">
                <label>
                  <Users size={18} />
                  Client Contact Person
                </label>
                <input
                  type="text"
                  value={formData.clientContact || ''}
                  onChange={(e) => handleChange('clientContact', e.target.value)}
                  placeholder="e.g., John Smith - Project Manager"
                />
              </div>

              <div className="form-group">
                <label>
                  <Users size={18} />
                  Principal Contractor *
                </label>
                <input
                  type="text"
                  value={formData.principalContractor || ''}
                  onChange={(e) => handleChange('principalContractor', e.target.value)}
                  placeholder="e.g., ABC Construction (Pty) Ltd"
                />
              </div>

              <div className="form-group">
                <label>
                  <MapPin size={18} />
                  Site Address *
                </label>
                <input
                  type="text"
                  value={formData.siteAddress || ''}
                  onChange={(e) => handleChange('siteAddress', e.target.value)}
                  placeholder="e.g., Corner of Main Road and 5th Avenue, Sandton"
                />
              </div>

              <div className="form-group">
                <label>
                  <ClipboardList size={18} />
                  Site Description
                </label>
                <textarea
                  value={formData.siteDescription || ''}
                  onChange={(e) => handleChange('siteDescription', e.target.value)}
                  placeholder="Describe the site conditions, terrain, existing structures, etc."
                  rows={4}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <div className="step-header">
                <Users size={32} />
                <h2>Workforce Information</h2>
                <p>How many people will be working on this project?</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Users size={18} />
                    Number of Direct Employees *
                  </label>
                  <input
                    type="number"
                    value={formData.numberOfEmployees || ''}
                    onChange={(e) => handleChange('numberOfEmployees', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 45"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Users size={18} />
                    Number of Contractors
                  </label>
                  <input
                    type="number"
                    value={formData.numberOfContractors || ''}
                    onChange={(e) => handleChange('numberOfContractors', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 20"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  <Calendar size={18} />
                  Working Hours
                </label>
                <input
                  type="text"
                  value={formData.workingHours || ''}
                  onChange={(e) => handleChange('workingHours', e.target.value)}
                  placeholder="e.g., Monday-Friday 07:00-17:00, Saturday 07:00-13:00"
                />
              </div>

              <div className="info-box">
                <AlertTriangle size={20} />
                <div>
                  <strong>Statutory Requirements:</strong>
                  <p>Projects with more than 20 workers require a dedicated Health and Safety Officer.</p>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step">
              <div className="step-header">
                <AlertTriangle size={32} />
                <h2>Risk Assessment</h2>
                <p>Identify the hazards present on your project</p>
              </div>

              <div className="risk-grid">
                <div className="risk-card">
                  <input
                    type="checkbox"
                    id="workAtHeight"
                    checked={formData.workAtHeight}
                    onChange={(e) => handleChange('workAtHeight', e.target.checked)}
                  />
                  <label htmlFor="workAtHeight">
                    <strong>Work at Height</strong>
                    <p>Working above 2 meters, scaffolding, ladders, elevated platforms</p>
                  </label>
                </div>

                <div className="risk-card">
                  <input
                    type="checkbox"
                    id="excavationWork"
                    checked={formData.excavationWork}
                    onChange={(e) => handleChange('excavationWork', e.target.checked)}
                  />
                  <label htmlFor="excavationWork">
                    <strong>Excavation Work</strong>
                    <p>Trenching, digging, underground work</p>
                  </label>
                </div>

                <div className="risk-card">
                  <input
                    type="checkbox"
                    id="confinedSpace"
                    checked={formData.confinedSpace}
                    onChange={(e) => handleChange('confinedSpace', e.target.checked)}
                  />
                  <label htmlFor="confinedSpace">
                    <strong>Confined Space Entry</strong>
                    <p>Tanks, manholes, vessels, enclosed areas</p>
                  </label>
                </div>

                <div className="risk-card">
                  <input
                    type="checkbox"
                    id="hotWork"
                    checked={formData.hotWork}
                    onChange={(e) => handleChange('hotWork', e.target.checked)}
                  />
                  <label htmlFor="hotWork">
                    <strong>Hot Work</strong>
                    <p>Welding, cutting, grinding, torch work</p>
                  </label>
                </div>

                <div className="risk-card">
                  <input
                    type="checkbox"
                    id="electricalWork"
                    checked={formData.electricalWork}
                    onChange={(e) => handleChange('electricalWork', e.target.checked)}
                  />
                  <label htmlFor="electricalWork">
                    <strong>Electrical Work</strong>
                    <p>Electrical installations, live work, power systems</p>
                  </label>
                </div>

                <div className="risk-card">
                  <input
                    type="checkbox"
                    id="heavyMachinery"
                    checked={formData.heavyMachinery}
                    onChange={(e) => handleChange('heavyMachinery', e.target.checked)}
                  />
                  <label htmlFor="heavyMachinery">
                    <strong>Heavy Machinery</strong>
                    <p>Cranes, excavators, forklifts, mobile plant</p>
                  </label>
                </div>

                <div className="risk-card">
                  <input
                    type="checkbox"
                    id="hazardousSubstances"
                    checked={formData.hazardousSubstances}
                    onChange={(e) => handleChange('hazardousSubstances', e.target.checked)}
                  />
                  <label htmlFor="hazardousSubstances">
                    <strong>Hazardous Substances</strong>
                    <p>Chemicals, solvents, fuels, toxic materials</p>
                  </label>
                </div>

                <div className="risk-card">
                  <input
                    type="checkbox"
                    id="publicTraffic"
                    checked={formData.publicTraffic}
                    onChange={(e) => handleChange('publicTraffic', e.target.checked)}
                  />
                  <label htmlFor="publicTraffic">
                    <strong>Public Traffic</strong>
                    <p>Work near roads, pedestrian areas, public access</p>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <AlertTriangle size={18} />
                  Additional Hazards or Concerns
                </label>
                <textarea
                  value={formData.customHazards || ''}
                  onChange={(e) => handleChange('customHazards', e.target.value)}
                  placeholder="Describe any other specific hazards or safety concerns for this project..."
                  rows={4}
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="form-step">
              <div className="step-header">
                <Wrench size={32} />
                <h2>Equipment & Compliance</h2>
                <p>Final details about equipment and regulatory requirements</p>
              </div>

              <div className="form-group">
                <label>
                  <Wrench size={18} />
                  Equipment and Machinery List *
                </label>
                <textarea
                  value={formData.equipmentList || ''}
                  onChange={(e) => handleChange('equipmentList', e.target.value)}
                  placeholder="List all major equipment, machinery, and tools that will be used (e.g., excavators, scaffolding, power tools, cranes)"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>
                  <AlertTriangle size={18} />
                  Emergency Equipment Available
                </label>
                <textarea
                  value={formData.emergencyEquipment || ''}
                  onChange={(e) => handleChange('emergencyEquipment', e.target.value)}
                  placeholder="List emergency equipment (e.g., first aid kits, fire extinguishers, spill kits, eyewash stations)"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>
                  <ClipboardList size={18} />
                  Required Permits and Licenses
                </label>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.requiredPermits?.includes('building')}
                      onChange={() => togglePermit('building')}
                    />
                    Building Permit
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.requiredPermits?.includes('environmental')}
                      onChange={() => togglePermit('environmental')}
                    />
                    Environmental Authorization
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.requiredPermits?.includes('water')}
                      onChange={() => togglePermit('water')}
                    />
                    Water Use License
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.requiredPermits?.includes('traffic')}
                      onChange={() => togglePermit('traffic')}
                    />
                    Traffic Accommodation Permit
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <MapPin size={18} />
                  Environmental Considerations
                </label>
                <textarea
                  value={formData.environmentalConsiderations || ''}
                  onChange={(e) => handleChange('environmentalConsiderations', e.target.value)}
                  placeholder="Describe environmental impacts, waste management, protected species, water bodies, etc."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>
                  <Users size={18} />
                  Community Impact
                </label>
                <textarea
                  value={formData.communityImpact || ''}
                  onChange={(e) => handleChange('communityImpact', e.target.value)}
                  placeholder="Describe impact on surrounding community, noise, dust, traffic, access restrictions"
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        <div className="questionnaire-footer">
          <button 
            className="btn-primary"
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {step === totalSteps ? (
              <>
                <CheckCircle size={20} />
                Generate SHE File
              </>
            ) : (
              <>
                Next Step
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireFlow;
