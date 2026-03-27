import React, { useState } from 'react';
import { Search, MapPin, Star, Award, Briefcase, Clock } from 'lucide-react';
import { User, Professional } from '../types';
import './FindAgentPage.css';

interface FindAgentPageProps {
  user: User;
}

const FindAgentPage: React.FC<FindAgentPageProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');

  const professionals: Professional[] = [
    {
      id: '1',
      name: 'Thabo Mthembu',
      title: 'Senior HSE Manager',
      company: 'SafetyFirst Consulting',
      location: 'Johannesburg, Gauteng',
      experience: '15 years',
      certifications: ['SAMTRAC', 'NEBOSH IGC', 'ISO 45001 Lead Auditor'],
      specializations: ['Construction Safety', 'Risk Assessment', 'Compliance Auditing'],
      rating: 4.9,
      reviews: 127,
      hourlyRate: 'R 1,500 - R 2,000',
      availability: 'Available'
    },
    {
      id: '2',
      name: 'Sarah van der Merwe',
      title: 'HSE Consultant',
      company: 'ProSafe Solutions',
      location: 'Cape Town, Western Cape',
      experience: '10 years',
      certifications: ['SAMTRAC', 'COMSOC', 'Fire Safety'],
      specializations: ['Construction Regulations', 'Training', 'Emergency Response'],
      rating: 4.8,
      reviews: 89,
      hourlyRate: 'R 1,200 - R 1,800',
      availability: 'Available'
    },
    {
      id: '3',
      name: 'John Mbeki',
      title: 'Construction Safety Specialist',
      company: 'Eastern Cape Civil Contractors',
      location: 'Port Elizabeth, Eastern Cape',
      experience: '12 years',
      certifications: ['SAMTRAC', 'NEBOSH', 'Construction Safety'],
      specializations: ['Site Safety', 'Fall Protection', 'Scaffolding Safety'],
      rating: 4.7,
      reviews: 64,
      hourlyRate: 'R 1,000 - R 1,500',
      availability: 'Busy'
    }
  ];

  const specializations = [
    'all',
    'Construction Safety',
    'Risk Assessment',
    'Compliance Auditing',
    'Training',
    'Emergency Response'
  ];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'all' ||
                                 prof.specializations.includes(selectedSpecialization);
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="find-agent-page">
      <div className="find-agent-header">
        <h2>Find an HSE Professional</h2>
        <p>Connect with certified HSE experts for your construction projects</p>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name, title, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-section">
          <label>Specialization:</label>
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
          >
            {specializations.map(spec => (
              <option key={spec} value={spec}>
                {spec === 'all' ? 'All Specializations' : spec}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="professionals-grid">
        {filteredProfessionals.map(prof => (
          <div key={prof.id} className="professional-card">
            <div className="prof-header">
              <div className="prof-avatar">
                {prof.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="prof-info">
                <h3>{prof.name}</h3>
                <p className="prof-title">{prof.title}</p>
                <div className="prof-rating">
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <span>{prof.rating}</span>
                  <span className="reviews">({prof.reviews} reviews)</span>
                </div>
              </div>
              <span className={`availability-badge ${prof.availability.toLowerCase()}`}>
                {prof.availability}
              </span>
            </div>

            <div className="prof-details">
              <div className="detail-row">
                <Briefcase size={16} />
                <span>{prof.company}</span>
              </div>
              <div className="detail-row">
                <MapPin size={16} />
                <span>{prof.location}</span>
              </div>
              <div className="detail-row">
                <Clock size={16} />
                <span>{prof.experience} experience</span>
              </div>
            </div>

            <div className="certifications">
              <Award size={16} />
              <div className="cert-list">
                {prof.certifications.map((cert, idx) => (
                  <span key={idx} className="cert-badge">{cert}</span>
                ))}
              </div>
            </div>

            <div className="specializations">
              <h4>Specializations</h4>
              <div className="spec-list">
                {prof.specializations.map((spec, idx) => (
                  <span key={idx} className="spec-tag">{spec}</span>
                ))}
              </div>
            </div>

            <div className="prof-footer">
              <div className="rate">
                <span className="rate-label">Hourly Rate:</span>
                <span className="rate-value">{prof.hourlyRate}</span>
              </div>
              <button className="contact-btn">Contact Professional</button>
            </div>
          </div>
        ))}
      </div>

      {filteredProfessionals.length === 0 && (
        <div className="no-results">
          <p>No professionals found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default FindAgentPage;
