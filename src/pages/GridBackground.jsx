export default function GridBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'white',
        backgroundImage: `
          linear-gradient(to right, lightgrey 0.5px, transparent 0.5px),
          linear-gradient(to bottom, lightgrey 0.5px, transparent 0.5px)
        `,
        backgroundSize: '30px 30px',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
