import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import GridBackground from '../pages/GridBackground';
import aboutMeImg from '../assets/aboutme.png';
import graphicDesignImg from '../assets/graphicdesign.png';
import motionDesignImg from '../assets/motiondesign.png';
import multimediaImg from '../assets/multimedia.png';
import randomImg from '../assets/random.png';

export default function DesktopView() {
  const navigate = useNavigate();

  const folders = [
    { name: 'About Me', route: '/about', image: aboutMeImg },
    { name: 'Graphic Design', route: '/graphic-design', image: graphicDesignImg },
    { name: 'Motion Design', route: '/motion-design', image: motionDesignImg },
    { name: 'Multimedia', route: '/multimedia', image: multimediaImg },
    { name: 'Random', route: '/random', image: randomImg },
  ];

  // State for folder positions
  const [positions, setPositions] = useState([]);

  // Load saved positions or generate new ones on mount
  useEffect(() => {
    const savedPositions = localStorage.getItem('folderPositions');
    if (savedPositions) {
      setPositions(JSON.parse(savedPositions));
    } else {
      const margin = 40;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const newPositions = folders.map((_, i) => {
        if (i % 3 === 0) {
          return {
            x: Math.random() * (width / 3 - margin) + margin,
            y: Math.random() * (height - 100) + 60,
          };
        } else if (i % 3 === 1) {
          return {
            x: Math.random() * (width / 3 - margin) + (2 * width) / 3,
            y: Math.random() * (height - 100) + 60,
          };
        } else {
          return {
            x: Math.random() * (width - 2 * margin) + margin,
            y: Math.random() * (height / 3 - margin) + height * 0.7,
          };
        }
      });

      setPositions(newPositions);
    }
  }, [folders.length]);

  // Save positions to localStorage whenever they change
  useEffect(() => {
    if (positions.length === folders.length) {
      localStorage.setItem('folderPositions', JSON.stringify(positions));
    }
  }, [positions, folders.length]);

  const draggingIndex = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const pointerStartPos = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  function onPointerDown(e, index) {
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingIndex.current = index;
    dragStartPos.current = { ...positions[index] };
    pointerStartPos.current = { x: e.clientX, y: e.clientY };
    hasDragged.current = false;
  }

  function onPointerMove(e) {
    if (draggingIndex.current === null) return;
    const dx = e.clientX - pointerStartPos.current.x;
    const dy = e.clientY - pointerStartPos.current.y;

    if (!hasDragged.current && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      hasDragged.current = true;
    }

    setPositions((pos) => {
      const newPos = [...pos];
      newPos[draggingIndex.current] = {
        x: dragStartPos.current.x + dx,
        y: dragStartPos.current.y + dy,
      };
      return newPos;
    });
  }

  function onPointerUp(e) {
    if (draggingIndex.current === null) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    draggingIndex.current = null;
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Mac-style Top menu bar */}
      <div
        className="fixed top-0 left-0 w-full h-6 flex items-center px-4 select-none z-50"
        style={{
          backgroundColor: 'rgba(255 255 255 / 0.85)',
          backdropFilter: 'saturate(180%) blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          fontSize: '12px',
          color: '#333',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          paddingLeft: '16px',
        }}
      >
        <div className="flex justify-between w-[400px] relative ml-4">
          {['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((menu, i) => (
            <span
              key={i}
              className="cursor-default hover:bg-gray-200 rounded px-1.5 py-0.5 select-none"
              style={{ userSelect: 'none' }}
            >
              {menu}
            </span>
          ))}
        </div>
      </div>

      {/* Grid background as black lines on white */}
      <GridBackground />

      {/* Draggable folders */}
      <div className="absolute inset-0 z-10">
        {positions.length === folders.length &&
          folders.map((folder, i) => (
            <div
              key={i}
              onDoubleClick={() => {
                if (!hasDragged.current) {
                  navigate(folder.route);
                }
              }}
              onPointerDown={(e) => onPointerDown(e, i)}
              onPointerUp={(e) => onPointerUp(e, i)}
              style={{
                position: 'absolute',
                left: positions[i].x,
                top: positions[i].y,
                touchAction: 'none',
              }}
              className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-transform select-none"
            >
              <img
                src={folder.image}
                alt={folder.name}
                className="w-10 h-10 md:w-10 md:h-10 mb-1 drop-shadow group-hover:drop-shadow-md transition-all"
                style={{ maxWidth: '80px', maxHeight: '90px' }}
                draggable={false}
              />
              <span className="text-[10px] font-medium text-gray-800 group-hover:underline text-center">
                {folder.name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
