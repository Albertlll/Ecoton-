import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MapComponent from './components/MapComponent';
import Users from './components/Users';
import Settings from './components/Settings';
import Reports from './components/Reports';
import { div } from 'framer-motion/client';

const AdminPanel: React.FC = () => {
  return (

    // <div className='grid grid-cols-6 grid-rows-6 w-full h-full gap-[20px]'>
    //   <div className=' bg-slate-600 col-[1/3] row-[1]'></div>

    // </div>




    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <Routes>
            <Route path="admin/map" element={<MapComponent />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;