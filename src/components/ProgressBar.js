import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ label, value, color }) => {
  return (
    <div className="progress-container">
      <div className="progress-label">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="progress-track">
        <motion.div 
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;