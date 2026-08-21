
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Sidebar = () => {
  const { isEducator } = useContext(AppContext)

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  return isEducator && (
    <aside className='w-14 md:w-56 bg-slate-900 text-slate-300 min-h-screen p-2.5 md:p-3 flex flex-col gap-1 shadow-md border-r border-slate-800 shrink-0'>
      <div className="hidden md:block px-3 py-1.5 mb-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Navigation</p>
      </div>

      <div className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === '/educator'}
            className={({ isActive }) =>
              `flex items-center md:justify-start justify-center py-2.5 px-3 rounded-lg gap-3 font-medium text-xs transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`
            }
          >
            <img src={item.icon} alt={item.name} className="w-4 h-4 brightness-200 invert opacity-80 shrink-0" />
            <span className='md:block hidden truncate'>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};


export default Sidebar;

