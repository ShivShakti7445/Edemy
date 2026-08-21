import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../components/student/Loading'
import { AppContext } from '../../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext)
  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/courses', { headers: { Authorization: `Bearer ${token}` } })
      data.success && setCourses(data.courses)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses()
    }
  }, [isEducator])

  return courses ? (
    <div className="min-h-screen bg-slate-50/50 p-5 md:p-8 w-full max-w-6xl space-y-5">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">My Published Courses</h1>
          <p className="text-slate-500 text-xs mt-0.5">Manage and track performance for all your active courses.</p>
        </div>

        <Link 
          to="/educator/add-course" 
          className="self-start sm:self-auto px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xs cursor-pointer"
        >
          + Add New Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-2xs">
          <p className="text-slate-500 text-xs font-medium mb-3">You haven't published any courses yet.</p>
          <Link 
            to="/educator/add-course" 
            className="inline-block px-5 py-2 rounded-full bg-blue-600 text-white font-semibold text-xs shadow-xs"
          >
            Create Your First Course
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 text-slate-600 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5">Course</th>
                <th className="px-4 py-2.5">Total Revenue</th>
                <th className="px-4 py-2.5">Enrolled Students</th>
                <th className="px-4 py-2.5">Published Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {courses.map((course) => {
                const totalEarnings = Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100));
                
                return (
                  <tr key={course._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={course.courseThumbnail} 
                          alt="Course Thumbnail" 
                          className="w-14 aspect-video rounded-md object-cover shadow-2xs border border-slate-100 shrink-0" 
                        />
                        <span className="font-semibold text-slate-800 line-clamp-1 max-w-xs text-xs">{course.courseTitle}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 font-bold text-emerald-600">
                      {currency}{totalEarnings}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-slate-700">
                      <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200/60 text-[11px]">
                        👥 {course.enrolledStudents.length} Students
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-500 font-medium whitespace-nowrap text-[11px]">
                      📅 {new Date(course.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  ) : <Loading />

}

export default MyCourses