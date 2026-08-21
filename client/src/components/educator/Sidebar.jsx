
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
    <aside className='w-16 md:w-64 bg-slate-900 text-slate-300 min-h-screen p-3 md:p-4 flex flex-col gap-2 shadow-lg border-r border-slate-800 shrink-0'>
      <div className="hidden md:block px-4 py-2 mb-2">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Navigation</p>
      </div>

      <div className="flex flex-col gap-1.5">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === '/educator'}
            className={({ isActive }) =>
              `flex items-center md:justify-start justify-center py-3 px-3 md:px-4 rounded-xl gap-3.5 font-semibold text-xs md:text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`
            }
          >
            <img src={item.icon} alt={item.name} className="w-5 h-5 brightness-200 invert opacity-90" />
            <span className='md:block hidden truncate'>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

