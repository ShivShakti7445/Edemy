import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useUser()

  return ( 
    <nav className='sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 shadow-xs flex items-center justify-between px-6 md:px-10 py-3.5'>
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src={assets.logo} alt="Edemy Logo" className="w-28 lg:w-32 hover:opacity-90 transition-opacity" />
        </Link>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold tracking-wide">
          🎓 Educator Portal
        </span>
      </div>

      <div className="flex items-center gap-5">
        <Link 
          to="/" 
          className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-1.5 rounded-full transition-all shadow-2xs flex items-center gap-1.5"
        >
          👁️ Student View
        </Link>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <span className="hidden md:inline-block text-xs font-semibold text-slate-700">
            Hi, {user ? user.fullName : 'Educator'}
          </span>
          {user ? <UserButton /> : <img className='w-8 h-8 rounded-full border border-slate-200' src={assets.profile_img} alt="Profile" />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;