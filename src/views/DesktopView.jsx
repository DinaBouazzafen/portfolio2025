import DotGrid from '../pages/DotGrid';
import TopMenu from '../pages/TopMenu';
import VariableProximity from '../pages/Title';
import FolderGrid from "../pages/FolderGrid";
import Dock from "../pages/Dock";

import aboutMeImg from '../assets/aboutme.png';
import graphicDesignImg from '../assets/graphicdesign.png';
import motionDesignImg from '../assets/motiondesign.png';
import multimediaImg from '../assets/multimedia.png';
import randomImg from '../assets/random.png';

import { useRef } from 'react';

// Dock icons (adjust paths if needed)
import finderIcon from "../assets/dock/finder.png";
import notesIcon from "../assets/dock/notes.png";
import githubIcon from "../assets/dock/github.png";
import mailIcon from "../assets/dock/mail.png";
import spotifyIcon from "../assets/dock/spotify.png";
import instaIcon from "../assets/dock/insta.png";
import photosIcon from "../assets/dock/photos.png";
import logoIcon from "../assets/dock/logo.png";

export default function DesktopView() {
  const folders = [
    { name: 'about me', route: '/about', image: aboutMeImg },
    { name: 'graphic design', route: '/graphic-design', image: graphicDesignImg },
    { name: 'motion design', route: '/motion-design', image: motionDesignImg },
    { name: 'multimedia', route: '/multimedia', image: multimediaImg },
    { name: 'random', route: '/random', image: randomImg },
  ];

  const dockItems = [
    { name: "Finder", image: finderIcon, route: "/finder" },
    { name: "Notes", image: notesIcon, route: "/notes" },
    { name: "Mail", image: mailIcon, route: "/mail" },
    { name: "Photos", image: photosIcon, route: "/photos" },
    { name: "Instagram", image: instaIcon, route: "/insta" },
    { name: "Spotify", image: spotifyIcon, route: "/spotify"},
    { name: "GitHub", image: githubIcon, route: "/github"},
    { name: "Home", image: logoIcon, route: "/" },
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
      <TopMenu />

      {/* Background grid */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={0.8}
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
        <VariableProximity
          label="welcome to my"
          className="text-[30px] sm:text-[30px] md:text-[40px] lg:text-[66px] font-extralight leading-tight"
          fromFontVariationSettings="'wght' 200, 'opsz' 9"
          toFontVariationSettings="'wght' 800, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />

        <VariableProximity
          label="portfolio"
          className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[106px] font-medium font-serif italic leading-tight"
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 700, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
          style={{ fontFamily: "'Roboto Serif', serif" }}
        />
      </div>

      {/* Draggable folders */}
      <FolderGrid folders={folders} />

      {/* Dock */}
      <Dock items={dockItems} />
    </div>
  );
}
