import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import bar from '../assets/bar.png';

export default function TopMenu() {
  const menuItems = ["buckhain's portfolio"];
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
    <div
      className="
        fixed inset-x-0 top-0 z-50 select-none
        h-10 sm:h-12
        bg-white/30 backdrop-blur-sm
        [padding-top:env(safe-area-inset-top)]
        flex justify-center
      "
    >
      {/* Inner container centered with huge gap */}
      <div
        className="
          flex items-center justify-between
          w-[min(90vw,11000px)]
          px-4 sm:px-6
          text-xs sm:text-sm md:text-[14px] text-black
        "
      >
        {/* Left side: logo + title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={logo}
            alt="Logo"
            className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
            draggable={false}
          />
          {menuItems.map((menu, i) => (
            <span key={i} className="cursor-default font-medium">
              {menu}
            </span>
          ))}
        </div>

        {/* Right side: bar + date + time */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={bar}
            alt="bar"
            className="hidden sm:block object-contain"
            style={{ height: '28px', width: 'auto' }}
          />
          <span className="hidden sm:inline">{formatDate(dateTime)}</span>
          <span className="tabular-nums">{formatTime(dateTime)}</span>
        </div>
      </div>
    </div>
  );
}

