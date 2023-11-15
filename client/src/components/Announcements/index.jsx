import React, { useState, useEffect } from 'react';
import './style.css';

function Announcements() {
  const announcements = ['announcement 1', 'announcement 2', 'announcement 3'];
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentAnnouncementIndex((prevIndex) =>
          prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 500); 
    }, 3000);

    return () => clearInterval(interval);
  }, [currentAnnouncementIndex, announcements.length]);

  return (
    <div className="announcement-container">
      <p className={`announcement ${isVisible ? 'visible' : 'hidden'}`}>
        {announcements[currentAnnouncementIndex]}
      </p>
    </div>
  );
}

export default Announcements;
