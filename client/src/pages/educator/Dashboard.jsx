import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)
  
  const fetchDashboardData = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/dashboard',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData()
    }
  }, [isEducator])

  return dashboardData ? (
    <div className='min-h-screen bg-slate-50/50 p-6 md:p-10 w-full max-w-7xl space-y-8'>
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview & Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Track your total student enrollments, published courses, and overall earnings.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        
        {/* Total Enrollments */}
        <div className='bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition-all'>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shrink-0">
            👥
          </div>
          <div>
            <p className='text-3xl font-black text-slate-900'>{dashboardData.enrolledStudentsData.length}</p>
            <p className='text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5'>Total Enrollments</p>
          </div>
        </div>

        {/* Total Courses */}
        <div className='bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition-all'>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl shrink-0">
            📚
          </div>
          <div>
            <p className='text-3xl font-black text-slate-900'>{dashboardData.totalCourses}</p>
            <p className='text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5'>Published Courses</p>
          </div>
        </div>

        {/* Total Earnings */}
        <div className='bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition-all sm:col-span-2 lg:col-span-1'>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shrink-0">
            💰
          </div>
          <div>
            <p className='text-3xl font-black text-slate-900'>{currency}{Math.floor(dashboardData.totalEarnings)}</p>
            <p className='text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5'>Total Revenue</p>
          </div>
        </div>

      </div>

      {/* Latest Enrollments Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Student Enrollments</h2>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Live Feed
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-center hidden sm:table-cell w-16">#</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course Enrolled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {dashboardData.enrolledStudentsData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-slate-400 font-medium">
                    No enrollments registered yet.
                  </td>
                </tr>
              ) : (
                dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 text-center hidden sm:table-cell font-bold text-slate-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.student?.imageUrl || assets.profile_img}
                          alt="Student Avatar"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                        />
                        <span className="font-bold text-slate-800">{item.student?.name || 'Enrolled Student'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60 inline-block">
                        {item.courseTitle}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  ) : <Loading />
}

export default Dashboard


