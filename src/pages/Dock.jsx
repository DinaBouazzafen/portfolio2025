// components/Dock.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dock({ items = [] }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const computed = useMemo(() => {
    // magnification curve like macOS (simple + smooth)
    return items.map((it, i) => {
      if (hovered === null) return { ...it, scale: 1 };

      const dist = Math.abs(i - hovered);
      // tweak these numbers to taste:
      const scale =
        dist === 0 ? 1.45 :
        dist === 1 ? 1.20 :
        dist === 2 ? 1.08 : 1;

      return { ...it, scale };
    });
  }, [items, hovered]);

  function onItemClick(item) {
    if (item.route) navigate(item.route);
    else if (item.href) window.open(item.href, item.newTab === false ? "_self" : "_blank");
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 select-none">
      {/* Dock background */}
      <div className="flex items-end gap-3 px-4 py-3 rounded-2xl
                      bg-white/20 backdrop-blur-xl border border-white/25 shadow-2xl">
        {computed.map((item, i) => (
          <button
            key={item.name + i}
            type="button"
            onClick={() => onItemClick(item)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            className="relative flex flex-col items-center outline-none"
            style={{
              transform: `scale(${item.scale})`,
              transformOrigin: "bottom center",
              transition: "transform 140ms ease",
            }}
            title={item.name}
          >
            {/* Icon */}
            <img
              src={item.image}
              alt={item.name}
              draggable={false}
              className="w-12 h-12 md:w-14 md:h-14 drop-shadow"
            />

            {/* little dot indicator placeholder (optional) */}
            <div className="mt-1 h-1 w-1 rounded-full bg-white/70 opacity-60" />
          </button>
        ))}
      </div>
    </div>
  );
}

