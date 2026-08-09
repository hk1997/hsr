import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Bot, ArrowLeft } from 'lucide-react';
import './Resources.css';

const Resources = () => {
  const navigate = useNavigate();

  return (
    <div className="resources-container">
      <div className="resources-header">
        <button onClick={() => navigate('/admin')} className="resources-back-btn">
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>
      <h1 className="resources-title">Resources</h1>
      
      <div className="resources-grid">
        <a 
          href="https://claude.ai/public/artifacts/008c7e10-a54e-4c00-901c-7047c6267038" 
          target="_blank" 
          rel="noopener noreferrer"
          className="resource-card"
        >
          <div className="resource-icon-wrapper">
            <Bot size={24} color="white" />
          </div>
          <h3>Claude Artifact Plugin</h3>
          <p>
            Access our custom Claude artifact tool designed to streamline 
            development workflows and enhance productivity.
          </p>
          <div className="resource-action">
            Open Tool <ExternalLink size={16} />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Resources;
