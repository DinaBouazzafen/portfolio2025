import FolderIcon from '../components/FolderIcon';

export default function MobileView() {
  const folders = [
    { name: 'About', route: '/about' },
    { name: 'Graphic', route: '/graphic-design' },
    { name: 'Motion', route: '/motion-design' },
  ];

  return (
    <div className="bg-white h-screen p-4 grid grid-cols-2 gap-4">
      {folders.map((folder, i) => (
        <FolderIcon key={i} name={folder.name} route={folder.route} mobile />
      ))}
    </div>
  );
}