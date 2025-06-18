import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import bar from '../assets/bar.png';

export default function TopMenu() {
  const menuItems = ["Dina's portfolio", "CV"];
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatDate = (date) =>
    date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="fixed top-0 left-28 w-full h-6 select-none z-50">
      {/* Background that extends to screen edge */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm -left-25"></div>
      
      {/* Your existing content container */}
      <div 
        className="relative max-w-screen-xl mx-auto px-8 flex items-center justify-between h-full"
        style={{ fontSize: '13px', color: '#000' }}
      >
        {/* Left side: logo + menu with added spacing */}
        <div className="flex items-center gap-x-5">
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-6 w-6 object-contain mr-3" 
              draggable={false} 
            />
          </div>
          {menuItems.map((menu, i) => (
            <span key={i} className="cursor-default">
              {menu}
            </span>
          ))}
        </div>

        {/* Right side: bar + date + time with added spacing */}
        <div className="flex items-center gap-x-4">
          <img
            src={bar}
            alt="bar"
            className="object-contain"
            style={{ height: '28px', width: 'auto' }}
          />
          <span>{formatDate(dateTime)}</span>
          <span className="mr-1">{formatTime(dateTime)}</span>
        </div>
      </div>
    </div>
  );
}