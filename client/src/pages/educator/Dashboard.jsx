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
    <div className='min-h-screen bg-slate-50/50 p-5 md:p-8 w-full max-w-6xl space-y-6'>
      
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Overview & Analytics</h1>
        <p className="text-slate-500 text-xs mt-0.5">Track your total student enrollments, published courses, and overall earnings.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        
        {/* Total Enrollments */}
        <div className='bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-all'>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0">
            👥
          </div>
          <div>
            <p className='text-xl font-extrabold text-slate-800'>{dashboardData.enrolledStudentsData.length}</p>
            <p className='text-[10px] font-semibold uppercase tracking-wider text-slate-400'>Total Enrollments</p>
          </div>
        </div>

        {/* Total Courses */}
        <div className='bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-all'>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-base shrink-0">
            📚
          </div>
          <div>
            <p className='text-xl font-extrabold text-slate-800'>{dashboardData.totalCourses}</p>
            <p className='text-[10px] font-semibold uppercase tracking-wider text-slate-400'>Published Courses</p>
          </div>
        </div>

        {/* Total Earnings */}
        <div className='bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-all'>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-base shrink-0">
            💰
          </div>
          <div>
            <p className='text-xl font-extrabold text-slate-800'>{currency}{Math.floor(dashboardData.totalEarnings)}</p>
            <p className='text-[10px] font-semibold uppercase tracking-wider text-slate-400'>Total Revenue</p>
          </div>
        </div>

      </div>

      {/* Latest Enrollments Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">Recent Student Enrollments</h2>
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            Live Feed
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 text-slate-600 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5 text-center hidden sm:table-cell w-12">#</th>
                <th className="px-4 py-2.5">Student</th>
                <th className="px-4 py-2.5">Course Enrolled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {dashboardData.enrolledStudentsData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-8 text-center text-slate-400 font-medium">
                    No enrollments registered yet.
                  </td>
                </tr>
              ) : (
                dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-2.5 text-center hidden sm:table-cell font-medium text-slate-400">{index + 1}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.student?.imageUrl || assets.profile_img}
                          alt="Student Avatar"
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-100"
                        />
                        <span className="font-semibold text-slate-800">{item.student?.name || 'Enrolled Student'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="font-medium text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/60 inline-block text-[11px]">
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


