import React, { useState, useEffect } from 'react';
import { portfolioApi } from '../services/api';

const ResumeBuilder = () => {
  const [resume, setResume] = useState({
    title: '',
    summary: '',
    experiences: [],
    education: [],
    skills: [],
  });

  const [activeSection, setActiveSection] = useState('summary');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      const resumeData = await portfolioApi.getResume();
      setResume(resumeData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load resume');
      setLoading(false);
    }
  };

  const handleSave = async (section, data) => {
    try {
      let response;
      switch (section) {
        case 'summary':
          response = await portfolioApi.updateResume(data);
          setResume(prev => ({ ...prev, ...response }));
          break;
        case 'experience':
          if (data.id) {
            response = await portfolioApi.updateExperience(data.id, data);
          } else {
            response = await portfolioApi.createExperience(data);
          }
          setResume(prev => ({
            ...prev,
            experiences: prev.experiences.map(exp => 
              exp.id === data.id ? response : exp
            ),
          }));
          break;
        case 'education':
          if (data.id) {
            response = await portfolioApi.updateEducation(data.id, data);
          } else {
            response = await portfolioApi.createEducation(data);
          }
          setResume(prev => ({
            ...prev,
            education: prev.education.map(edu => 
              edu.id === data.id ? response : edu
            ),
          }));
          break;
        case 'skills':
          if (data.id) {
            response = await portfolioApi.updateSkill(data.id, data);
          } else {
            response = await portfolioApi.createSkill(data);
          }
          setResume(prev => ({
            ...prev,
            skills: prev.skills.map(skill => 
              skill.id === data.id ? response : skill
            ),
          }));
          break;
        default:
          break;
      }
    } catch (err) {
      setError('Failed to save changes');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="flex space-x-4 border-b border-gray-200">
        {['summary', 'experience', 'education', 'skills'].map(section => (
          <button
            key={section}
            className={`px-4 py-2 border-b-2 font-medium text-sm ${
              activeSection === section
                ? 'border-foliance-blue text-foliance-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveSection(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeSection === 'summary' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                className="input-field"
                value={resume.title}
                onChange={e => setResume(prev => ({ ...prev, title: e.target.value }))}
                onBlur={() => handleSave('summary', { title: resume.title })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Professional Summary
              </label>
              <textarea
                rows={4}
                className="input-field"
                value={resume.summary}
                onChange={e => setResume(prev => ({ ...prev, summary: e.target.value }))}
                onBlur={() => handleSave('summary', { summary: resume.summary })}
              />
            </div>
          </div>
        )}

        {/* Add similar sections for experience, education, and skills */}
      </div>
    </div>
  );
};

export default ResumeBuilder;
