import FolderIcon from '../components/FolderIcon';

export default function DesktopView() {
  const folders = [
    { name: 'About Me', route: '/about' },
    { name: 'Graphic Design', route: '/graphic-design' },
    { name: 'Motion Design', route: '/motion-design' },
    { name: 'Multimedia', route: '/multimedia' },
    { name: 'Random', route: '/random' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-300 h-screen p-8 grid grid-cols-3 gap-4">
      {folders.map((folder, i) => (
        <FolderIcon key={i} name={folder.name} route={folder.route} />
      ))}
    </div>
  );
}
