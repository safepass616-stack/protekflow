import React from 'react';
import { TrendingUp, FileText, Users, Building2, CheckCircle, AlertTriangle } from 'lucide-react';
import './SystemStats.css';

const SystemStats: React.FC = () => {
  const monthlyData = [
    { month: 'Jul', projects: 18, documents: 45, incidents: 2 },
    { month: 'Aug', projects: 19, documents: 52, incidents: 1 },
    { month: 'Sep', projects: 21, documents: 58, incidents: 3 },
    { month: 'Oct', projects: 22, documents: 67, incidents: 2 },
    { month: 'Nov', projects: 23, documents: 74, incidents: 1 },
    { month: 'Dec', projects: 24, documents: 89, incidents: 2 },
    { month: 'Jan', projects: 24, documents: 98, incidents: 3 }
  ];

  return (
    <div className="system-stats">
      <div className="stats-overview">
        <div className="card">
          <div className="card-header">
            <h3>Platform Growth</h3>
            <span className="badge success">+12% this month</span>
          </div>
          <div className="chart-container">
            <div className="bar-chart">
              {monthlyData.map((data, idx) => (
                <div key={idx} className="bar-group">
                  <div className="bar projects" style={{ height: `${(data.projects / 30) * 100}%` }}>
                    <span className="bar-label">{data.projects}</span>
                  </div>
                  <div className="bar documents" style={{ height: `${(data.documents / 100) * 100}%` }}>
                    <span className="bar-label">{data.documents}</span>
                  </div>
                  <span className="month-label">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color projects"></span>
                <span>Projects</span>
              </div>
              <div className="legend-item">
                <span className="legend-color documents"></span>
                <span>Documents</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Safety Performance</h3>
          </div>
          <div className="performance-grid">
            <div className="performance-card">
              <div className="performance-icon success">
                <CheckCircle size={32} />
              </div>
              <div className="performance-info">
                <h4>94%</h4>
                <p>Compliance Rate</p>
                <span className="trend positive">+2% from last month</span>
              </div>
            </div>

            <div className="performance-card">
              <div className="performance-icon warning">
                <AlertTriangle size={32} />
              </div>
              <div className="performance-info">
                <h4>3</h4>
                <p>Incidents This Month</p>
                <span className="trend neutral">Same as last month</span>
              </div>
            </div>

            <div className="performance-card">
              <div className="performance-icon primary">
                <FileText size={32} />
              </div>
              <div className="performance-info">
                <h4>342</h4>
                <p>Total Documents</p>
                <span className="trend positive">+24 this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="detailed-stats">
        <div className="card">
          <div className="card-header">
            <h3>User Activity</h3>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <Users size={20} />
              <div>
                <h4>45 HSE Professionals</h4>
                <p>Active on platform</p>
              </div>
              <span className="activity-badge">+3 this month</span>
            </div>
            <div className="activity-item">
              <Building2 size={20} />
              <div>
                <h4>18 Client Organizations</h4>
                <p>Managing projects</p>
              </div>
              <span className="activity-badge">+2 this month</span>
            </div>
            <div className="activity-item">
              <FileText size={20} />
              <div>
                <h4>98 Documents Generated</h4>
                <p>In January 2026</p>
              </div>
              <span className="activity-badge success">+14 from December</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Document Types Distribution</h3>
          </div>
          <div className="distribution-list">
            <div className="distribution-item">
              <div className="distribution-bar">
                <div className="distribution-fill" style={{ width: '45%' }}></div>
              </div>
              <div className="distribution-info">
                <span>Health & Safety Plans</span>
                <span className="distribution-value">45%</span>
              </div>
            </div>
            <div className="distribution-item">
              <div className="distribution-bar">
                <div className="distribution-fill" style={{ width: '30%' }}></div>
              </div>
              <div className="distribution-info">
                <span>Risk Assessments</span>
                <span className="distribution-value">30%</span>
              </div>
            </div>
            <div className="distribution-item">
              <div className="distribution-bar">
                <div className="distribution-fill" style={{ width: '15%' }}></div>
              </div>
              <div className="distribution-info">
                <span>Method Statements</span>
                <span className="distribution-value">15%</span>
              </div>
            </div>
            <div className="distribution-item">
              <div className="distribution-bar">
                <div className="distribution-fill" style={{ width: '10%' }}></div>
              </div>
              <div className="distribution-info">
                <span>Incident Reports</span>
                <span className="distribution-value">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStats;
