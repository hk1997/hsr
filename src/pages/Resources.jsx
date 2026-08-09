import React from 'react';
import { ExternalLink, Bot } from 'lucide-react';
import './Resources.css';

const Resources = () => {
  return (
    <div className="resources-container">
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
