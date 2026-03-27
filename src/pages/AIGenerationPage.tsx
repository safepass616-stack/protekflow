import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, CheckCircle, AlertCircle, FileText, Download, Copy, Clock } from 'lucide-react';
import { QuestionnaireData } from '../types/workflow';
import { generateHealthSafetyDocument, GeneratedDocument } from '../services/claudeService';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import Toast from '../components/Toast';
import './AIGenerationPage.css';

interface AIGenerationPageProps {
  questionnaireData: QuestionnaireData;
  onBack: () => void;
  onComplete: (document: GeneratedDocument) => void;
  userId: string;
}

type GenerationStage = 'analyzing' | 'generating' | 'reviewing' | 'complete' | 'error' | 'timeout';

const AIGenerationPage: React.FC<AIGenerationPageProps> = ({ 
  questionnaireData, 
  onBack,
  onComplete,
  userId
}) => {
  const [stage, setStage] = useState<GenerationStage>('analyzing');
  const [progress, setProgress] = useState(0);
  const [generatedDocument, setGeneratedDocument] = useState<GeneratedDocument | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState('30-45 seconds');
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [continueWaiting, setContinueWaiting] = useState(false);

  useEffect(() => {
    startGeneration();

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stage !== 'complete') {
        handleCancel();
      }
      if (e.key === 'Enter' && stage === 'complete' && generatedDocument) {
        handleContinue();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, generatedDocument]);

  const startGeneration = async () => {
    setStage('analyzing');
    setProgress(0);
    setError(null);
    setIsTimedOut(false);
    setContinueWaiting(false);

    try {
      // Stage 1: Analyzing (0-20%)
      setEstimatedTime('30-45 seconds');
      await simulateProgress(0, 20, 1500);
      setStage('generating');

      // Stage 2: Generating with Claude (20-80%)
      setEstimatedTime('20-30 seconds');
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 2, 80));
      }, 200);

      // Timeout handler (60 seconds)
      const timeoutId = setTimeout(() => {
        if (stage === 'generating') {
          clearInterval(progressInterval);
          setIsTimedOut(true);
        }
      }, 60000);

      const document = await generateHealthSafetyDocument(questionnaireData);
      clearInterval(progressInterval);
      clearTimeout(timeoutId);
      setProgress(80);

      // Stage 3: Reviewing (80-100%)
      setStage('reviewing');
      setEstimatedTime('5-10 seconds');
      await simulateProgress(80, 100, 1500);

      // Save to database
      await saveDocumentToDatabase(document);

      // Complete
      setGeneratedDocument(document);
      setStage('complete');
      setProgress(100);

    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err.message || 'Failed to generate document. Please try again.');
      setStage('error');
    }
  };

  const saveDocumentToDatabase = async (document: GeneratedDocument) => {
    try {
      const { error } = await supabase.from('documents').insert({
        user_id: userId,
        title: document.title,
        content: document.content,
        type: document.type,
        status: 'draft',
        project_name: document.metadata.projectName,
        generated_at: document.metadata.generatedAt,
        version: document.metadata.version
      });

      if (error) {
        console.error('Failed to save document to database:', error);
        // Don't throw - allow user to download even if save fails
      }
    } catch (err) {
      console.error('Database save error:', err);
    }
  };

  const simulateProgress = (start: number, end: number, duration: number): Promise<void> => {
    return new Promise((resolve) => {
      const steps = 20;
      const increment = (end - start) / steps;
      const interval = duration / steps;
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        setProgress(Math.min(current, end));

        if (current >= end) {
          clearInterval(timer);
          resolve();
        }
      }, interval);
    });
  };

  const handleDownload = () => {
    if (!generatedDocument) return;

    const blob = new Blob([generatedDocument.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedDocument.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = async () => {
    if (!generatedDocument) return;

    try {
      await navigator.clipboard.writeText(generatedDocument.content);
      setShowCopyToast(true);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleContinue = () => {
    if (generatedDocument) {
      onComplete(generatedDocument);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel document generation?')) {
      onBack();
    }
  };

  const handleContinueWaiting = () => {
    setContinueWaiting(true);
    setIsTimedOut(false);
  };

  const getStageMessage = (): string => {
    switch (stage) {
      case 'analyzing':
        return 'Analyzing project requirements and hazards...';
      case 'generating':
        return 'Generating comprehensive HSE documentation with AI...';
      case 'reviewing':
        return 'Reviewing document for compliance and completeness...';
      case 'complete':
        return 'Document generation complete!';
      case 'error':
        return 'An error occurred during generation';
      default:
        return '';
    }
  };

  const getWordCount = (text: string): number => {
    return text.trim().split(/\s+/).length;
  };

  const getPageEstimate = (wordCount: number): string => {
    const pagesMin = Math.floor(wordCount / 500);
    const pagesMax = Math.ceil(wordCount / 400);
    return `${pagesMin}-${pagesMax}`;
  };

  const getDocumentTypeBadge = (type: string): string => {
    switch (type) {
      case 'health_safety_plan':
        return 'Health & Safety Plan';
      case 'risk_assessment':
        return 'Risk Assessment';
      case 'method_statement':
        return 'Method Statement';
      default:
        return 'HSE Document';
    }
  };

  // Timeout warning state
  if (isTimedOut && !continueWaiting) {
    return (
      <div className="ai-generation-page">
        <button className="back-button" onClick={onBack} aria-label="Go back to questionnaire">
          <ArrowLeft size={20} />
          Back to Questionnaire
        </button>

        <div className="generation-container">
          <div className="timeout-warning">
            <div className="timeout-icon">
              <Clock size={64} />
            </div>
            <h1>Taking Longer Than Expected</h1>
            <p>
              Document generation is taking longer than usual. This can happen with complex projects
              or high demand. Your document is still being generated.
            </p>
            <div className="timeout-actions">
              <button onClick={handleContinueWaiting} className="continue-waiting-button">
                Continue Waiting
              </button>
              <button onClick={onBack} className="cancel-button">
                Cancel & Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'error') {
    return (
      <div className="ai-generation-page">
        <button className="back-button" onClick={onBack} aria-label="Go back to questionnaire">
          <ArrowLeft size={20} />
          Back to Questionnaire
        </button>

        <div className="generation-container">
          <ErrorState
            title="Generation Failed"
            message={error || 'Failed to generate document. Please try again.'}
            onRetry={startGeneration}
            retryLabel="Try Again"
          />
        </div>
      </div>
    );
  }

  if (stage === 'complete' && generatedDocument) {
    const wordCount = getWordCount(generatedDocument.content);
    const pageEstimate = getPageEstimate(wordCount);

    return (
      <div className="ai-generation-page">
        {showCopyToast && (
          <Toast
            message="Document copied to clipboard!"
            type="success"
            onClose={() => setShowCopyToast(false)}
          />
        )}

        <button className="back-button" onClick={onBack} aria-label="Go back to questionnaire">
          <ArrowLeft size={20} />
          Back to Questionnaire
        </button>

        <div className="generation-container">
          <div className="success-header">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h1>Document Generated Successfully!</h1>
            <p>Your comprehensive Health and Safety File is ready for professional review.</p>
          </div>

          <div className="document-preview">
            <div className="preview-header">
              <FileText size={24} aria-hidden="true" />
              <div className="preview-title">
                <h2>{generatedDocument.title}</h2>
                <div className="preview-meta">
                  <span className="document-type-badge">
                    {getDocumentTypeBadge(generatedDocument.type)}
                  </span>
                  <span className="preview-stats">
                    ~{wordCount.toLocaleString()} words • Estimated {pageEstimate} pages
                  </span>
                </div>
                <p>Generated on {new Date(generatedDocument.metadata.generatedAt).toLocaleDateString('en-ZA')}</p>
              </div>
            </div>

            <div className="preview-content">
              <pre>{generatedDocument.content.substring(0, 1000)}...</pre>
              <div className="preview-fade"></div>
            </div>

            <div className="preview-actions">
              <button onClick={handleCopyToClipboard} className="copy-button">
                <Copy size={20} aria-hidden="true" />
                Copy to Clipboard
              </button>
              <button onClick={handleDownload} className="download-button">
                <Download size={20} aria-hidden="true" />
                Download Draft
              </button>
              <button onClick={handleContinue} className="continue-button">
                Continue to Professional Review
              </button>
            </div>
          </div>

          <div className="next-steps">
            <h3>Next Steps</h3>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <strong>Professional Review</strong>
                  <p>Your document will be assigned to a certified HSE professional for review and approval.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <strong>Expert Refinement</strong>
                  <p>The professional will review, refine, and ensure full regulatory compliance.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <strong>Digital Signature</strong>
                  <p>Receive your professionally signed and stamped document, ready for use on site.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-generation-page">
      <button className="back-button" onClick={onBack} disabled aria-label="Go back to questionnaire">
        <ArrowLeft size={20} />
        Back to Questionnaire
      </button>

      <div className="generation-container">
        <div className="generation-header">
          <Shield size={64} className="generation-logo" aria-hidden="true" />
          <h1>Generating Your HSE Documentation</h1>
          <p>Our AI is creating a comprehensive, compliance-ready document for your project</p>
        </div>

        <div className="progress-section" role="status" aria-live="polite" aria-label="Document generation progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Document generation progress"
            />
          </div>
          <div className="progress-info">
            <span className="progress-percentage">{Math.round(progress)}%</span>
            <span className="progress-message">{getStageMessage()}</span>
          </div>
          <div className="progress-time">
            <Clock size={16} aria-hidden="true" />
            <span>Estimated time: {estimatedTime}</span>
          </div>
        </div>

        <div className="generation-stages">
          <div className={`stage ${stage === 'analyzing' || stage === 'generating' || stage === 'reviewing' || stage === 'complete' ? 'active' : ''} ${stage === 'generating' || stage === 'reviewing' || stage === 'complete' ? 'completed' : ''}`}>
            <div className="stage-icon">
              {stage === 'generating' || stage === 'reviewing' || stage === 'complete' ? (
                <CheckCircle size={24} />
              ) : (
                <LoadingSpinner size={24} />
              )}
            </div>
            <div className="stage-content">
              <strong>Analyzing Requirements</strong>
              <p>Processing project details and hazard information</p>
            </div>
          </div>

          <div className={`stage ${stage === 'generating' || stage === 'reviewing' || stage === 'complete' ? 'active' : ''} ${stage === 'reviewing' || stage === 'complete' ? 'completed' : ''}`}>
            <div className="stage-icon">
              {stage === 'reviewing' || stage === 'complete' ? (
                <CheckCircle size={24} />
              ) : stage === 'generating' ? (
                <LoadingSpinner size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
            </div>
            <div className="stage-content">
              <strong>AI Document Generation</strong>
              <p>Creating comprehensive Health & Safety documentation</p>
            </div>
          </div>

          <div className={`stage ${stage === 'reviewing' || stage === 'complete' ? 'active' : ''} ${stage === 'complete' ? 'completed' : ''}`}>
            <div className="stage-icon">
              {stage === 'complete' ? (
                <CheckCircle size={24} />
              ) : stage === 'reviewing' ? (
                <LoadingSpinner size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
            </div>
            <div className="stage-content">
              <strong>Compliance Review</strong>
              <p>Verifying Construction Regulations 2014 compliance</p>
            </div>
          </div>
        </div>

        <div className="generation-info">
          <h3>What's Being Generated</h3>
          <ul>
            <li><FileText size={18} aria-hidden="true" /> Executive Summary</li>
            <li><FileText size={18} aria-hidden="true" /> Comprehensive Risk Assessment</li>
            <li><FileText size={18} aria-hidden="true" /> Statutory Appointments</li>
            <li><FileText size={18} aria-hidden="true" /> Health & Safety Plan</li>
            <li><FileText size={18} aria-hidden="true" /> Method Statements</li>
            <li><FileText size={18} aria-hidden="true" /> Inspection Schedules</li>
            <li><FileText size={18} aria-hidden="true" /> Legal Compliance Documentation</li>
          </ul>
        </div>

        <div className="keyboard-shortcuts">
          <p><kbd>Esc</kbd> Cancel generation</p>
        </div>
      </div>
    </div>
  );
};

export default AIGenerationPage;
