import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MapComponent from './components/MapComponent';
import Users from './components/Users';
import Tasks from './components/Tasks';
import Reports from './components/Reports';
import { div } from 'framer-motion/client';

const AdminPanel: React.FC = () => {
  const STAT = 
{
  "statistics": {
    "Урагус сибирский": 5,
    "Серый сорокопут": 2,
    "Рыжая вечерница": 0,
    "Горностай": 3,
    "Хохлатка полая": 1,
    "Белоспинный дятел": 4,
    "Обыкновенная кутора": 0,
    "Обыкновенный еж": 6,
    "Зимородок": 2,
    "Удод": 1,
    "Незабудка болотная": 8,
    "Филин": 1,
    "Лесной хорек": 0,
    "Лютик длиннолистный": 3
  }
}




  return (

    <div className=' p-[20px] bg-[#F5F6F7] grid grid-rows-6 grid-cols-9 w-full h-full gap-[20px]'>
      
      <div className='col-[1/3] row-[1/-1]'> 
          <Sidebar/>
      </div>

      <div className='col-[3/-1]'>
          <Header />
      </div>

      <div className=' row-[2/-1] col-[3/-1]'>
      <main className="flex-1 rounded-[20px] w-full h-full overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
           <Routes>
             <Route path="admin/map" element={<MapComponent />} />
             <Route path="admin/users" element={<Users />} />
             <Route path="admin/tasks" element={<Tasks />} />
             <Route path="admin/reports" element={<Reports />} />
           </Routes>
         </main>
      </div>







    </div>




    // <div className="flex h-screen bg-gray-100">
    //   <Sidebar />
    //   <div className="flex-1 flex flex-col overflow-hidden">
    //     <Header />
    //     <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
    //       <Routes>
    //         <Route path="admin/map" element={<MapComponent />} />
    //         <Route path="admin/users" element={<Users />} />
    //         <Route path="admin/tasks" element={<Tasks />} />
    //         <Route path="admin/reports" element={<Reports />} />
    //       </Routes>
    //     </main>
    //   </div>
    // </div>
  );
};

export default AdminPanel;