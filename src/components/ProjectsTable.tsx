import React from 'react';
import { Building2, Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import './ProjectsTable.css';

interface ProjectsTableProps {
  role: 'admin' | 'professional' | 'client';
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ role }) => {
  const allProjects = [
    {
      id: 'p1',
      name: 'Taxi Rank Upgrade – East London',
      client: 'Buffalo City Metropolitan Municipality',
      contractor: 'Eastern Cape Civil Contractors',
      location: 'East London CBD',
      status: 'active',
      riskLevel: 'High',
      workers: 25,
      progress: 35,
      professional: 'John Mbeki',
      documents: 2,
      pendingReviews: 1
    },
    {
      id: 'p2',
      name: 'N2 Bridge Construction',
      client: 'Eastern Cape Department of Transport',
      contractor: 'Eastern Cape Civil Contractors',
      location: 'Port Elizabeth',
      status: 'active',
      riskLevel: 'High',
      workers: 42,
      progress: 58,
      professional: 'John Mbeki',
      documents: 4,
      pendingReviews: 0
    },
    {
      id: 'p3',
      name: 'Shopping Mall Renovation',
      client: 'Hemingways Mall Management',
      contractor: 'Premier Construction (Pty) Ltd',
      location: 'East London',
      status: 'active',
      riskLevel: 'Medium',
      workers: 35,
      progress: 72,
      professional: 'Thabo Dlamini',
      documents: 5,
      pendingReviews: 2
    },
    {
      id: 'p4',
      name: 'Water Treatment Plant Upgrade',
      client: 'Buffalo City Metropolitan Municipality',
      contractor: 'Aqua Infrastructure (Pty) Ltd',
      location: 'East London',
      status: 'planning',
      riskLevel: 'Medium',
      workers: 18,
      progress: 15,
      professional: 'David Nkosi',
      documents: 1,
      pendingReviews: 1
    }
  ];

  return (
    <div className="projects-table-container">
      <div className="card">
        <div className="card-header">
          <h3>All Projects</h3>
          <div className="filters">
            <select className="filter-select">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Planning</option>
              <option>Completed</option>
            </select>
            <select className="filter-select">
              <option>All Risk Levels</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Client</th>
                <th>Contractor</th>
                <th>Location</th>
                {role === 'admin' && <th>Professional</th>}
                <th>Workers</th>
                <th>Risk</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Documents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProjects.map(project => (
                <tr key={project.id}>
                  <td>
                    <div className="project-name-cell">
                      <Building2 size={16} />
                      <span>{project.name}</span>
                    </div>
                  </td>
                  <td>{project.client}</td>
                  <td>{project.contractor}</td>
                  <td>{project.location}</td>
                  {role === 'admin' && <td>{project.professional}</td>}
                  <td>
                    <div className="workers-cell">
                      <Users size={14} />
                      {project.workers}
                    </div>
                  </td>
                  <td>
                    <span className={`risk-badge ${project.riskLevel.toLowerCase()}`}>
                      {project.riskLevel}
                    </span>
                  </td>
                  <td>
                    <div className="progress-cell">
                      <div className="mini-progress-bar">
                        <div className="mini-progress-fill" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span>{project.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${project.status}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>
                    <div className="documents-cell">
                      <span className="doc-count">{project.documents}</span>
                      {project.pendingReviews > 0 && (
                        <span className="pending-badge">
                          <Clock size={12} />
                          {project.pendingReviews}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <button className="btn-small">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsTable;
