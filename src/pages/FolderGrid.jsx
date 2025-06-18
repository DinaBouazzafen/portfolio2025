// components/FolderGrid.jsx
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

export default function FolderGrid({ folders }) {
  const navigate = useNavigate();

  const [positions, setPositions] = useState([]);
  const draggingIndex = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const pointerStartPos = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem('folderPositions');
    if (saved) {
      setPositions(JSON.parse(saved));
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

  useEffect(() => {
    if (positions.length === folders.length) {
      localStorage.setItem('folderPositions', JSON.stringify(positions));
    }
  }, [positions, folders.length]);

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
      className="absolute inset-0 z-10"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {positions.length === folders.length &&
        folders.map((folder, i) => (
          <div
            key={i}
            onDoubleClick={() => {
              if (!hasDragged.current) navigate(folder.route);
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
  );
}
