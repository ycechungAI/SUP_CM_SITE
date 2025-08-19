import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
};

export default ProgressBar;