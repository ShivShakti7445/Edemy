import React, { useContext } from 'react';
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useClerk,UserButton ,useUser} from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {


const { backendUrl, isEducator, setIsEducator, navigate, getToken  } = useContext(AppContext)
const isCoursesListPage = location.pathname.includes('/course-list');

const { openSignIn } = useClerk()
const { user } = useUser()

// become educator for user can become educator by clicking on button
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
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCoursesListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
        <img onClick={() => navigate('/')} src={assets.logo} alt='Logo' className='w-28 lg:w-32 cursor-pointer' /> 
        <div className="md:flex hidden items-center gap-5 text-gray-500">
            <div className="flex items-center gap-5">
              {/* if the user is logged in then show the become educator and my enrollments  */}
            {
              user && <>
                <button onClick={becomeEducator}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
                | <Link to='/my-enrollments' >My Enrollments</Link>
              </>
            }
            </div>
            {/*if the user is logged in then show the user button else show the create account button  */}
            {
              user
              ? <UserButton />
              : <button onClick={() => openSignIn()} className="bg-blue-600 text-white px-5 py-2 rounded-full">
                Create Account
            </button>
            } 
        </div>

        
         {/* for mobile view */}
        <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'> 
          <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
            {
              user && <>
                <button onClick={becomeEducator}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
                | <Link to='/my-enrollments' >My Enrollments</Link>
              </>
            }   
          </div>
          {/* if the user is logged in then show the user button else show the create account button  */}
          {user
          ? <UserButton />
          : <button onClick={() => openSignIn()}>
              <img src={assets.user_icon} alt="" />
           </button>
          }
        </div>
    </div>  
  )
}

export default Navbar