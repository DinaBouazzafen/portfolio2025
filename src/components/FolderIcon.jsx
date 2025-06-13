import { useNavigate } from 'react-router-dom';
import { Folder } from 'lucide-react';

export default function FolderIcon({ name, route, mobile }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all bg-${mobile ? 'gray-100' : 'white'}`}
    >
      <Folder size={48} />
      <span className="mt-2 text-sm font-semibold">{name}</span>
    </div>
  );
}