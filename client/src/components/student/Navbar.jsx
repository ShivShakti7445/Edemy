import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  const { backendUrl, isEducator, setIsEducator, navigate, getToken } = useContext(AppContext)
  const location = useLocation();
  const [showEducatorModal, setShowEducatorModal] = useState(false);
  const [loadingRole, setLoadingRole] = useState(false);

  const { openSignIn } = useClerk()
  const { user } = useUser()

  // Handle Educator Navigation
  const handleEducatorClick = () => {
    if (!user) {
      // Logged out -> Open sign in and redirect to educator dashboard
      openSignIn({ afterSignInUrl: '/educator', afterSignUpUrl: '/educator' });
      return;
    }

    if (isEducator) {
      navigate('/educator');
    } else {
      // Prompt student before upgrading role
      setShowEducatorModal(true);
    }
  };

  // Confirm upgrade to Educator
  const confirmBecomeEducator = async () => {
    try {
      setLoadingRole(true);
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/educator/update-role',
         { headers: { Authorization: `Bearer ${token}` } });
      
      if (data.success) {
        toast.success("Welcome to Educator Portal!");
        setIsEducator(true);
        setShowEducatorModal(false);
        navigate('/educator');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingRole(false);
    }
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200/80 transition-all duration-300 shadow-sm flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto w-full py-3.5`}>
          <img onClick={() => navigate('/')} src={assets.logo} alt='Logo' className='w-28 lg:w-32 cursor-pointer hover:opacity-90 transition-opacity' /> 
          
          {/* Desktop View */}
          <div className="md:flex hidden items-center gap-4 text-slate-600 font-medium text-sm">
              {
                user ? (
                  /* Logged In View */
                  <div className="flex items-center gap-4">
                    <Link 
                      to='/my-enrollments' 
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                        location.pathname === '/my-enrollments'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                      }`}
                    >
                      📖 My Enrollments
                    </Link>

                    {/* ONLY show Educator Dashboard button if user is an Educator */}
                    {isEducator && (
                      <button 
                        onClick={() => navigate('/educator')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 cursor-pointer`}
                      >
                        🎓 Educator Dashboard
                      </button>
                    )}

                    <UserButton />
                  </div>
                ) : (
                  /* Logged Out View - Role-Specific Sign In / Sign Up Buttons */
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => openSignIn({ afterSignInUrl: '/', afterSignUpUrl: '/' })} 
                      className="px-4 py-2 rounded-full font-semibold text-xs text-blue-600 border border-blue-600 hover:bg-blue-50 transition-all cursor-pointer shadow-2xs"
                    >
                      📖 Sign in / Sign up as Student
                    </button>

                    <button 
                      onClick={() => openSignIn({ afterSignInUrl: '/educator', afterSignUpUrl: '/educator' })} 
                      className="px-4 py-2 rounded-full font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      🎓 Sign in / Sign up as Educator
                    </button>
                  </div>
                )
              } 
          </div>

          {/* Mobile View */}
          <div className='md:hidden flex items-center gap-2 text-slate-600 text-xs font-medium'> 
            {user ? (
              <div className="flex items-center gap-2">
                <Link to='/my-enrollments' className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 border border-slate-200">
                  Enrollments
                </Link>
                {isEducator && (
                  <button onClick={() => navigate('/educator')} className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-600 text-white">
                    Educator
                  </button>
                )}
                <UserButton />
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px]">
                <button 
                  onClick={() => openSignIn({ afterSignInUrl: '/', afterSignUpUrl: '/' })} 
                  className="px-2.5 py-1 rounded-full font-semibold text-blue-600 border border-blue-200 bg-blue-50"
                >
                  Student
                </button>
                <button 
                  onClick={() => openSignIn({ afterSignInUrl: '/educator', afterSignUpUrl: '/educator' })} 
                  className="px-2.5 py-1 rounded-full font-semibold text-white bg-blue-600"
                >
                  Educator
                </button>
              </div>
            )}
          </div>


      </nav>

      {/* Confirmation Modal for Student -> Educator Upgrade */}
      {showEducatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-2xl">
              🎓
            </div>
            <h3 className="text-xl font-bold text-slate-900">Become an Educator on Edemy</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              You are currently logged in as a <strong>Student</strong>. Would you like to register as an <strong>Educator</strong> to publish, edit, and manage courses?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowEducatorModal(false)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                disabled={loadingRole}
              >
                Cancel
              </button>
              <button
                onClick={confirmBecomeEducator}
                className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md transition-all disabled:opacity-50"
                disabled={loadingRole}
              >
                {loadingRole ? "Processing..." : "Confirm & Switch to Educator"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar