import React from 'react';
import { Shield, ArrowLeft, CheckCircle, X } from 'lucide-react';
import './PricingPage.css';

interface PricingPageProps {
  onGetStarted: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="pricing-page">
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="pricing-container">
        <div className="pricing-hero">
          <Shield size={48} className="pricing-logo" />
          <h1>Choose Your Plan</h1>
          <p>Simple, transparent pricing for South African construction compliance</p>
        </div>

        <div className="pricing-grid">
          {/* Pay Per Document */}
          <div className="pricing-tier">
            <div className="tier-header">
              <h3>Pay Per Document</h3>
              <div className="tier-price">
                <span className="currency">R</span>
                <span className="amount">4,250</span>
                <span className="period">/document</span>
              </div>
              <p className="tier-description">Perfect for one-time projects</p>
            </div>

            <ul className="tier-features">
              <li>
                <CheckCircle size={20} />
                <span>Single document generation</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Professional HSE review</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Construction Regulations 2014 compliance</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>24-48 hour turnaround</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Email support</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>PDF export</span>
              </li>
              <li className="not-included">
                <X size={20} />
                <span>Document templates</span>
              </li>
              <li className="not-included">
                <X size={20} />
                <span>Priority support</span>
              </li>
            </ul>

            <button onClick={onGetStarted} className="tier-button">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="pricing-tier featured">
            <div className="popular-badge">Most Popular</div>
            <div className="tier-header">
              <h3>Pro Plan</h3>
              <div className="tier-price">
                <span className="currency">R</span>
                <span className="amount">2,499</span>
                <span className="period">/month</span>
              </div>
              <p className="tier-description savings">Save 41% per document</p>
            </div>

            <ul className="tier-features">
              <li>
                <CheckCircle size={20} />
                <span><strong>1 document per month</strong></span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Accumulate up to 5 documents</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Priority review (12-24 hours)</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Professional HSE review</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Construction Regulations 2014 compliance</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Priority email support</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Document templates library</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Compliance dashboard</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Google Docs integration</span>
              </li>
            </ul>

            <button onClick={onGetStarted} className="tier-button primary">
              Start Pro Plan
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="pricing-tier">
            <div className="tier-header">
              <h3>Enterprise</h3>
              <div className="tier-price">
                <span className="currency">R</span>
                <span className="amount">3,999</span>
                <span className="period">/month</span>
              </div>
              <p className="tier-description">Billed annually (R47,988/year)</p>
            </div>

            <ul className="tier-features">
              <li>
                <CheckCircle size={20} />
                <span><strong>Unlimited documents</strong></span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Accumulate up to 10 documents</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Same-day turnaround</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Dedicated HSE professional</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Professional review & signatures</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Phone & email support</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Custom document templates</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>API access for integrations</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Advanced compliance reporting</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Team collaboration tools</span>
              </li>
            </ul>

            <button onClick={onGetStarted} className="tier-button">
              Contact Sales
            </button>
          </div>
        </div>

        <div className="pricing-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>What's included in a document?</h4>
              <p>Each document includes a complete Health & Safety Plan, Risk Assessment, and Method Statements compliant with Construction Regulations 2014.</p>
            </div>
            <div className="faq-item">
              <h4>Can I upgrade or downgrade my plan?</h4>
              <p>Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle.</p>
            </div>
            <div className="faq-item">
              <h4>What happens to unused documents?</h4>
              <p>On Pro and Enterprise plans, unused documents accumulate up to the plan limit and never expire while your subscription is active.</p>
            </div>
            <div className="faq-item">
              <h4>Do you offer refunds?</h4>
              <p>We offer a 14-day money-back guarantee on all subscription plans. Pay-per-document purchases are non-refundable once the document is delivered.</p>
            </div>
          </div>
        </div>

        <div className="pricing-cta">
          <h2>Ready to Get Started?</h2>
          <p>Join hundreds of construction companies ensuring compliance with Protekflow AI</p>
          <button onClick={onGetStarted} className="cta-button">
            Start Your Free Trial
          </button>
          <p className="cta-note">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
