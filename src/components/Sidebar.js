import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { updateProfile } from '../api';

const Sidebar = ({ userId, currentProfile, setCurrentProfile }) => {
  const [skills, setSkills] = useState({
    python: 70,
    statistics: 60,
    machineLearning: 50,
    visualization: 40
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Cosmic Gradient');
  const [selectedLanguage, setSelectedLanguage] = useState('🇺🇸 English');

  const profiles = {
    "Beginner": "👶",
    "Intermediate": "👨‍💻",
    "Advanced": "🧙‍♂️"
  };

  const themes = ["Cosmic Gradient", "Dark Elegant", "Light Minimal", "Matrix Vibes"];
  
  const languages = {
    "English": "🇺🇸", 
    "Hindi": "🇮🇳", 
    "Spanish": "🇪🇸", 
    "French": "🇫🇷", 
    "German": "🇩🇪"
  };

  // Handle profile change
  const handleProfileChange = (event) => {
    setCurrentProfile(event.target.value.split(" ")[1]);
  };

  // Handle skill change
  const handleSkillChange = (skill, value) => {
    setSkills({
      ...skills,
      [skill]: value
    });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Apply dark mode class to body
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  // Update profile in database when skills change
  useEffect(() => {
    const updateUserProfile = async () => {
      try {
        await updateProfile(userId, {
          expertise: currentProfile,
          skills
        });
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };

    // Debounce the update to prevent too many API calls
    const timer = setTimeout(() => {
      updateUserProfile();
    }, 500);

    return () => clearTimeout(timer);
  }, [userId, currentProfile, skills]);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">⚙️ Console</h2>
      
      {/* Profile selector */}
      <div className="sidebar-section">
        <label htmlFor="profile-select">Your Expertise Level</label>
        <select 
          id="profile-select"
          value={`${profiles[currentProfile]} ${currentProfile}`}
          onChange={handleProfileChange}
          className="select-dropdown"
        >
          {Object.entries(profiles).map(([name, emoji]) => (
            <option key={name} value={`${emoji} ${name}`}>
              {emoji} {name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Skills focus */}
      <div className="sidebar-section">
        <h3>Skills Focus</h3>
        
        <ProgressBar 
          label="Python" 
          value={skills.python} 
          color="#36d7b7" 
          onChange={(value) => handleSkillChange('python', value)}
        />
        
        <ProgressBar 
          label="Statistics" 
          value={skills.statistics} 
          color="#9b59b6"
          onChange={(value) => handleSkillChange('statistics', value)}
        />
        
        <ProgressBar 
          label="Machine Learning" 
          value={skills.machineLearning} 
          color="#3498db"
          onChange={(value) => handleSkillChange('machineLearning', value)}
        />
        
        <ProgressBar 
          label="Visualization" 
          value={skills.visualization} 
          color="#f39c12"
          onChange={(value) => handleSkillChange('visualization', value)}
        />
      </div>
      
      {/* Theme settings */}
      <div className="sidebar-section">
        <h3>🎨 Theme Settings</h3>
        <select 
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="select-dropdown"
        >
          {themes.map(theme => (
            <option key={theme} value={theme}>{theme}</option>
          ))}
        </select>
        
        <div className="toggle-container">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">🌙 Dark Mode</span>
          </label>
        </div>
      </div>
      
      {/* Language selection */}
      <div className="sidebar-section">
        <h3>🌍 Language</h3>
        <select 
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="select-dropdown"
        >
          {Object.entries(languages).map(([lang, emoji]) => (
            <option key={lang} value={`${emoji} ${lang}`}>
              {emoji} {lang}
            </option>
          ))}
        </select>
        
        {selectedLanguage !== "🇺🇸 English" && (
          <div className="info-alert">
            Translation feature coming soon! 🚀
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;