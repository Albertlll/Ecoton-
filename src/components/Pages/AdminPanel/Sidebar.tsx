import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoMapOutline, IoBookOutline, IoListOutline, IoPersonOutline, IoSettingsOutline, IoDocumentTextOutline } from 'react-icons/io5';

const Sidebar: React.FC = () => {




  const [activeIndex, setActiveIndex] = useState<number>(0);






  return (
    <div className="bg-white w-full h-full shadow-lg rounded-[20px]">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-2xl font-semibold text-green-500">Экодруг</span>
      </div>
      <nav className="mt-6">

        <SidebarItem active={0 == activeIndex} onClick={setActiveIndex} index={0} icon={<IoMapOutline />} text="Карта" path="/admin/map" />
        <SidebarItem active={1 == activeIndex} onClick={setActiveIndex} index={1} icon={<IoListOutline />} text="Задание" path="/admin/tasks" />
      </nav>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  path: string;
  active?: boolean;
  index : number;
  onClick : React.Dispatch<React.SetStateAction<number>>;
}

const SidebarItem: React.FC<SidebarItemProps> = ({index, onClick, icon, text, path, active }) => {
  return (
    <Link
      onClick={() => {onClick(index)}}
      to={path}
      className={`flex items-center px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-500 ${
        active ? 'bg-green-50 text-green-500 border-l-4 border-green-500' : ''
      }`}

    >
      <span className="text-xl mr-3">{icon}</span>
      {text}
    </Link>
  );
};

export default Sidebar;