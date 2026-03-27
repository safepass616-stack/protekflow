import React from 'react';
import { Shield, Zap, FileText, Users, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import './LandingPage.css';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onViewPricing: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin, onViewPricing }) => {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <Shield size={32} aria-hidden="true" />
            <span>Protekflow AI</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); onViewPricing(); }}>Pricing</a>
            <button onClick={onLogin} className="nav-login">Login</button>
            <button onClick={onGetStarted} className="nav-cta">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={16} aria-hidden="true" />
            <span>AI-Powered HSE Compliance for South African Construction</span>
          </div>
          <h1>Construction Safety Documentation in Minutes, Not Days</h1>
          <p>
            Generate professional Health & Safety Plans, Risk Assessments, and Method Statements
            compliant with Construction Regulations 2014. Reviewed by certified HSE professionals.
          </p>
          <div className="hero-actions">
            <button onClick={onGetStarted} className="primary-button">
              Start Free Trial
              <ArrowRight size={20} aria-hidden="true" />
            </button>
            <button onClick={onViewPricing} className="secondary-button">
              View Pricing
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>1,200+</strong>
              <span>Documents Generated</span>
            </div>
            <div className="stat">
              <strong>500+</strong>
              <span>Construction Companies</span>
            </div>
            <div className="stat">
              <strong>24hrs</strong>
              <span>Average Turnaround</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <h2>Why Choose Protekflow AI?</h2>
          <p>Comprehensive HSE compliance solution built for South African construction</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(158, 127, 255, 0.1)' }}>
              <Zap size={32} color="#9E7FFF" aria-hidden="true" />
            </div>
            <h3>AI-Powered Generation</h3>
            <p>
              Answer a simple questionnaire and our AI generates comprehensive HSE documentation
              tailored to your project, compliant with Construction Regulations 2014.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(56, 189, 248, 0.1)' }}>
              <Users size={32} color="#38bdf8" aria-hidden="true" />
            </div>
            <h3>Professional Review</h3>
            <p>
              Every document is reviewed and signed by certified HSE professionals with SACPCMP
              registration, ensuring audit-ready compliance.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <FileText size={32} color="#10b981" aria-hidden="true" />
            </div>
            <h3>Construction Regulations 2014</h3>
            <p>
              Full compliance with OHSA 1993 and Construction Regulations 2014, covering all
              required documentation for your construction project.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
              <Clock size={32} color="#f59e0b" aria-hidden="true" />
            </div>
            <h3>Fast Turnaround</h3>
            <p>
              Get your documents in 24-48 hours instead of weeks. Pro plan users receive priority
              review with 12-24 hour turnaround.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
              <Shield size={32} color="#ef4444" aria-hidden="true" />
            </div>
            <h3>Audit-Ready Documentation</h3>
            <p>
              Professional-grade documents ready for Department of Labour inspections, with proper
              formatting, signatures, and SACPCMP stamps.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
              <Users size={32} color="#8b5cf6" aria-hidden="true" />
            </div>
            <h3>Expert Marketplace</h3>
            <p>
              Need ongoing support? Connect with vetted HSE professionals through our marketplace
              for site visits, training, and compliance management.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>From questionnaire to certified document in 4 simple steps</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Answer AI Questionnaire</h3>
              <p>
                Complete our intelligent questionnaire about your construction project. Our AI asks
                targeted questions about work activities, hazards, and site conditions.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>AI Generates Draft</h3>
              <p>
                Our AI instantly creates a comprehensive Health & Safety Plan, Risk Assessment, and
                Method Statements based on your responses and Construction Regulations 2014.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Professional Review</h3>
              <p>
                A certified HSE professional reviews your document, makes expert refinements, and
                ensures full regulatory compliance before signing.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Receive Signed Document</h3>
              <p>
                Download your professionally signed and stamped document, ready for use on site and
                Department of Labour inspections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="pricing-preview" id="pricing">
        <div className="section-header">
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that fits your construction business</p>
        </div>
        <div className="pricing-cards">
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Pay Per Document</h3>
              <div className="price">
                <span className="currency">R</span>
                <span className="amount">4,250</span>
                <span className="period">/document</span>
              </div>
              <p className="billing-note">One-time payment</p>
            </div>
            <ul className="pricing-features">
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Single document generation</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Professional HSE review</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>24-48 hour turnaround</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Email support</span>
              </li>
            </ul>
            <button onClick={onGetStarted} className="pricing-button">
              Get Started
            </button>
          </div>

          <div className="pricing-card featured">
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-header">
              <h3>Pro Plan</h3>
              <div className="price">
                <span className="currency">R</span>
                <span className="amount">2,499</span>
                <span className="period">/month</span>
              </div>
              <p className="savings">Save 41% per document</p>
            </div>
            <ul className="pricing-features">
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>1 document per month</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Accumulate up to 5 documents</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Priority review (12-24 hours)</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Document templates library</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Google Docs integration</span>
              </li>
            </ul>
            <button onClick={onGetStarted} className="pricing-button primary">
              Start Pro Plan
            </button>
          </div>

          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Enterprise</h3>
              <div className="price">
                <span className="currency">R</span>
                <span className="amount">3,999</span>
                <span className="period">/month</span>
              </div>
              <p className="billing-note">Billed annually</p>
            </div>
            <ul className="pricing-features">
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Unlimited documents</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Same-day turnaround</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Dedicated HSE professional</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>API access</span>
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                <span>Team collaboration tools</span>
              </li>
            </ul>
            <button onClick={onGetStarted} className="pricing-button">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Simplify Your HSE Compliance?</h2>
          <p>Join hundreds of construction companies ensuring safety with Protekflow AI</p>
          <button onClick={onGetStarted} className="cta-button">
            Start Your Free Trial
            <ArrowRight size={20} aria-hidden="true" />
          </button>
          <p className="cta-note">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Shield size={24} aria-hidden="true" />
              <span>Protekflow AI</span>
            </div>
            <p>
              AI-powered HSE compliance platform for South African construction, ensuring safety
              and regulatory compliance.
            </p>
          </div>

          <div className="footer-section">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#marketplace">Find an Agent</a>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <a href="#docs">Documentation</a>
            <a href="#guides">Compliance Guides</a>
            <a href="#templates">Templates</a>
            <a href="#support">Support</a>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
            <a href="#careers">Careers</a>
            <a href="#legal">Legal</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Protekflow AI. All rights reserved. Ensuring construction safety compliance across South Africa.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
