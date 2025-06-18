import DotGrid from '../pages/DotGrid';
import TopMenu from '../pages/TopMenu';
import FolderGrid from '../pages/FolderGrid';
import VariableProximity from '../pages/Title'
import aboutMeImg from '../assets/aboutme.png';
import graphicDesignImg from '../assets/graphicdesign.png';
import motionDesignImg from '../assets/motiondesign.png';
import multimediaImg from '../assets/multimedia.png';
import randomImg from '../assets/random.png';
import { useRef } from 'react';


export default function DesktopView() {
  const folders = [
    { name: 'About Me', route: '/about', image: aboutMeImg },
    { name: 'Graphic Design', route: '/graphic-design', image: graphicDesignImg },
    { name: 'Motion Design', route: '/motion-design', image: motionDesignImg },
    { name: 'Multimedia', route: '/multimedia', image: multimediaImg },
    { name: 'Random', route: '/random', image: randomImg },
  ];
    const containerRef = useRef(null);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      }}
    >
      {/* Mac-style Top menu bar */}
      <TopMenu/>

      {/* Background grid */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <DotGrid
          dotSize={0.1}
          gap={19}
          baseColor="#A2A2A2"
          activeColor="#FF0000"
          proximity={120}
          shockRadius={250}
          shockStrength={10}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      {/* Title */}
      
<div
  ref={containerRef}
  className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-auto"
>
  {/* Light "welcome to my" */}
  <VariableProximity
    label="welcome to my"
    className="text-[30px] sm:text-[30px] md:text-[40px] lg:text-[66px] font-extralight leading-tight"
    fromFontVariationSettings="'wght' 200, 'opsz' 9"
    toFontVariationSettings="'wght' 800, 'opsz' 40"
    containerRef={containerRef}
    radius={100}
    falloff="linear"
  />

  {/* Bold "portfolio" */}
  <VariableProximity
  label="portfolio."
  className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[106px] font-medium font-serif italic leading-tight"
  fromFontVariationSettings="'wght' 400, 'opsz' 9"   // Use 400 for normal, as you mentioned
  toFontVariationSettings="'wght' 700, 'opsz' 40"    // Hover weight 700
  containerRef={containerRef}
  radius={100}
  falloff="linear"
  style={{ fontFamily: "'Roboto Serif', serif" }}
/>
</div>
  
{/* Draggable folders */}
      <FolderGrid folders={folders} />
    </div>
  );
}

