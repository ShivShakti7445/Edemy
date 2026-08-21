import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import Footer from '../../components/educator/Footer'
import Sidebar from '../../components/educator/Sidebar'
import { AppContext } from '../../context/AppContext'

const Educator = () => {
    const { isEducator } = useContext(AppContext)

    if (!isEducator) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="text-default min-h-screen bg-white">
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <div className='flex-1'>
                    {<Outlet />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Educator

