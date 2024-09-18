import React from 'react';
import { IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-lg w-full h-full rounded-[20px]">
      <div className="flex h-full items-center justify-between px-6 py-3">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <IoSearchOutline className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Поиск"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
        </div>
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-gray-700 mr-4">
            <IoNotificationsOutline className="text-2xl" />
          </button>
          <div className="flex items-center">
            <img
              src="https://placekitten.com/40/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Руслан Б.</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;