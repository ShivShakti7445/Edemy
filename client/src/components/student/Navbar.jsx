import React, { useContext } from 'react';
import { assets } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  const { backendUrl, isEducator, setIsEducator, navigate, getToken } = useContext(AppContext)
  const location = useLocation();
  const isCoursesListPage = location.pathname.includes('/course-list');

  const { openSignIn } = useClerk()
  const { user } = useUser()

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate('/educator')
        return;
      }
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/update-role',
         { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        toast.success(data.message)
        setIsEducator(true)
      } else {
        toast.error(data.message)
      }
    } 
    catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200/80 transition-all duration-300 shadow-sm flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-3.5`}>
        <img onClick={() => navigate('/')} src={assets.logo} alt='Logo' className='w-28 lg:w-32 cursor-pointer hover:opacity-90 transition-opacity' /> 
        
        {/* Desktop View */}
        <div className="md:flex hidden items-center gap-6 text-slate-600 font-medium text-sm">
            <div className="flex items-center gap-5">
            {
              user && (
                <>
                  <button 
                    onClick={becomeEducator}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/80 shadow-xs hover:scale-105 active:scale-95"
                  >
                    {isEducator ? '🎓 Educator Dashboard' : '⚡ Become Educator'}
                  </button>
                  <Link to='/my-enrollments' className="hover:text-blue-600 transition-colors flex items-center gap-1">
                    My Enrollments
                  </Link>
                </>
              )
            }
            </div>
            {
              user
              ? <UserButton />
              : <button onClick={() => openSignIn()} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all active:scale-95">
                Create Account
              </button>
            } 
        </div>

        {/* Mobile View */}
        <div className='md:hidden flex items-center gap-3 text-slate-600 text-xs font-medium'> 
          <div className="flex items-center gap-2">
            {
              user && (
                <>
                  <button onClick={becomeEducator} className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 border border-slate-200">
                    {isEducator ? 'Dashboard' : 'Educator'}
                  </button>
                  <Link to='/my-enrollments' className="hover:text-blue-600">Enrollments</Link>
                </>
              )
            }   
          </div>
          {user
          ? <UserButton />
          : <button onClick={() => openSignIn()} className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium">
              Sign In
            </button>
          }
        </div>
    </nav>  
  )
}

export default Navbar