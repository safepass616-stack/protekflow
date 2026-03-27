import React, { useState } from 'react';
import { Shield, ArrowLeft, Mail, Lock, User, Building, Briefcase, Award, FileText, Hash, CreditCard } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import './RegisterPage.css';

interface RegisterPageProps {
  onRegister: (
    email: string,
    password: string,
    name: string,
    role: 'admin' | 'professional' | 'client',
    company: string,
    additionalInfo: any
  ) => void;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onBack, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'professional' | 'client'>('client');
  const [company, setCompany] = useState('');
  
  // Client/Constructor specific fields
  const [companyRegNumber, setCompanyRegNumber] = useState('');
  const [coidNumber, setCoidNumber] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [department, setDepartment] = useState('');
  
  // HSE Professional specific fields
  const [profession, setProfession] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [certifications, setCertifications] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [sacpcmpNumber, setSacpcmpNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setFieldErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      setFieldErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordBlur = () => {
    if (password && password.length < 6) {
      setFieldErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
    } else {
      setFieldErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword && confirmPassword !== password) {
      setFieldErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setFieldErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const additionalInfo: any = {};

      if (role === 'professional') {
        if (!profession) {
          setError('Please enter your profession/title');
          setIsLoading(false);
          return;
        }
        if (!qualifications) {
          setError('Please enter your qualifications');
          setIsLoading(false);
          return;
        }
        
        additionalInfo.profession = profession;
        additionalInfo.qualifications = qualifications;
        additionalInfo.yearsExperience = yearsExperience;
        additionalInfo.sacpcmpNumber = sacpcmpNumber;
        additionalInfo.idNumber = idNumber;
        
        if (certifications) {
          additionalInfo.certifications = certifications.split(',').map(c => c.trim());
        }
      } else if (role === 'client') {
        if (!companyRegNumber) {
          setError('Please enter your company registration number');
          setIsLoading(false);
          return;
        }
        
        additionalInfo.companyRegNumber = companyRegNumber;
        additionalInfo.coidNumber = coidNumber;
        additionalInfo.taxNumber = taxNumber;
        additionalInfo.vatNumber = vatNumber;
        additionalInfo.companyAddress = companyAddress;
        additionalInfo.contactNumber = contactNumber;
        additionalInfo.department = department;
      }

      await onRegister(email, password, name, role, company, additionalInfo);
      setShowSuccessToast(true);
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      {showSuccessToast && (
        <Toast
          message="Account created successfully! Logging you in..."
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}

      <button 
        className="back-button" 
        onClick={onBack}
        aria-label="Go back to home page"
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>

      <div className="register-container">
        <div className="register-header">
          <Shield size={48} className="register-logo" aria-hidden="true" />
          <h1>Create Your Account</h1>
          <p>Join Protekflow AI's HSE Compliance Platform</p>
        </div>

        {error && (
          <div className="error-message" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* Account Type Selection */}
          <div className="form-section">
            <h3 className="section-title">Account Type</h3>
            <div className="role-selector" role="radiogroup" aria-label="Account type">
              <label className={`role-option ${role === 'client' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={role === 'client'}
                  onChange={(e) => setRole(e.target.value as 'client')}
                  disabled={isLoading}
                  aria-label="Client or Constructor account"
                />
                <div className="role-content">
                  <Building size={24} aria-hidden="true" />
                  <div>
                    <strong>Client/Constructor</strong>
                    <p>Municipality or Construction Company</p>
                  </div>
                </div>
              </label>

              <label className={`role-option ${role === 'professional' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="professional"
                  checked={role === 'professional'}
                  onChange={(e) => setRole(e.target.value as 'professional')}
                  disabled={isLoading}
                  aria-label="HSE Professional account"
                />
                <div className="role-content">
                  <Award size={24} aria-hidden="true" />
                  <div>
                    <strong>HSE Professional</strong>
                    <p>Health & Safety Expert</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">
                <User size={18} aria-hidden="true" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                disabled={isLoading}
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={18} aria-hidden="true" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                placeholder="your.email@company.co.za"
                required
                disabled={isLoading}
                aria-required="true"
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {fieldErrors.email && (
                <span className="field-error" id="email-error" role="alert">
                  {fieldErrors.email}
                </span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">
                  <Lock size={18} aria-hidden="true" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                  placeholder="Min. 6 characters"
                  required
                  disabled={isLoading}
                  aria-required="true"
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                />
                {fieldErrors.password && (
                  <span className="field-error" id="password-error" role="alert">
                    {fieldErrors.password}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <Lock size={18} aria-hidden="true" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={handleConfirmPasswordBlur}
                  placeholder="Re-enter password"
                  required
                  disabled={isLoading}
                  aria-required="true"
                  aria-invalid={!!fieldErrors.confirmPassword}
                  aria-describedby={fieldErrors.confirmPassword ? 'confirm-password-error' : undefined}
                />
                {fieldErrors.confirmPassword && (
                  <span className="field-error" id="confirm-password-error" role="alert">
                    {fieldErrors.confirmPassword}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Client/Constructor Information */}
          {role === 'client' && (
            <div className="form-section">
              <h3 className="section-title">Company Information</h3>
              
              <div className="form-group">
                <label htmlFor="company">
                  <Building size={18} aria-hidden="true" />
                  Company/Organization Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="ABC Construction (Pty) Ltd"
                  required
                  disabled={isLoading}
                  aria-required="true"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companyRegNumber">
                    <FileText size={18} aria-hidden="true" />
                    Company Registration Number
                  </label>
                  <input
                    type="text"
                    id="companyRegNumber"
                    value={companyRegNumber}
                    onChange={(e) => setCompanyRegNumber(e.target.value)}
                    placeholder="2023/123456/07"
                    required
                    disabled={isLoading}
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="coidNumber">
                    <Hash size={18} aria-hidden="true" />
                    COID Registration Number
                  </label>
                  <input
                    type="text"
                    id="coidNumber"
                    value={coidNumber}
                    onChange={(e) => setCoidNumber(e.target.value)}
                    placeholder="W123456789"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="taxNumber">
                    <CreditCard size={18} aria-hidden="true" />
                    Tax Number
                  </label>
                  <input
                    type="text"
                    id="taxNumber"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    placeholder="9876543210"
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="vatNumber">
                    <CreditCard size={18} aria-hidden="true" />
                    VAT Number
                  </label>
                  <input
                    type="text"
                    id="vatNumber"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    placeholder="4123456789"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="companyAddress">
                  <Building size={18} aria-hidden="true" />
                  Company Physical Address
                </label>
                <input
                  type="text"
                  id="companyAddress"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  placeholder="123 Main Street, Johannesburg, 2000"
                  disabled={isLoading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactNumber">
                    <Mail size={18} aria-hidden="true" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="011 123 4567"
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department">
                    <Building size={18} aria-hidden="true" />
                    Department (Optional)
                  </label>
                  <input
                    type="text"
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Infrastructure Development"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          )}

          {/* HSE Professional Information */}
          {role === 'professional' && (
            <div className="form-section">
              <h3 className="section-title">Professional Information</h3>
              
              <div className="form-group">
                <label htmlFor="company">
                  <Building size={18} aria-hidden="true" />
                  Company/Organization Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Safety Solutions (Pty) Ltd"
                  required
                  disabled={isLoading}
                  aria-required="true"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="profession">
                    <Briefcase size={18} aria-hidden="true" />
                    Profession/Title
                  </label>
                  <input
                    type="text"
                    id="profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="HSE Manager"
                    required
                    disabled={isLoading}
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="yearsExperience">
                    <Award size={18} aria-hidden="true" />
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    id="yearsExperience"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    placeholder="5 years"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="qualifications">
                  <Award size={18} aria-hidden="true" />
                  Qualifications
                </label>
                <input
                  type="text"
                  id="qualifications"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  placeholder="National Diploma in Safety Management"
                  required
                  disabled={isLoading}
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="certifications">
                  <Award size={18} aria-hidden="true" />
                  Certifications (comma-separated)
                </label>
                <input
                  type="text"
                  id="certifications"
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  placeholder="SAMTRAC, NEBOSH, Construction Safety"
                  disabled={isLoading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="sacpcmpNumber">
                    <Hash size={18} aria-hidden="true" />
                    SACPCMP Number (if applicable)
                  </label>
                  <input
                    type="text"
                    id="sacpcmpNumber"
                    value={sacpcmpNumber}
                    onChange={(e) => setSacpcmpNumber(e.target.value)}
                    placeholder="123456"
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="idNumber">
                    <FileText size={18} aria-hidden="true" />
                    ID Number
                  </label>
                  <input
                    type="text"
                    id="idNumber"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="8901015800080"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner size={20} />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="link-button">
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
