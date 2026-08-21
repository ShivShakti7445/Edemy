import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useUser()

  return ( 
    <nav className='sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-2xs flex items-center justify-between px-4 md:px-8 py-2.5'>
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src={assets.logo} alt="Edemy Logo" className="w-24 lg:w-28 hover:opacity-90 transition-opacity" />
        </Link>
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-[11px] font-semibold">
          🎓 Educator Portal
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          to="/" 
          className="text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 px-3 py-1 rounded-full transition-all flex items-center gap-1"
        >
          👁️ Student View
        </Link>

        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <span className="hidden md:inline-block text-[11px] font-medium text-slate-600">
            Hi, {user ? user.fullName : 'Educator'}
          </span>
          {user ? <UserButton /> : <img className='w-7 h-7 rounded-full border border-slate-200' src={assets.profile_img} alt="Profile" />}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;