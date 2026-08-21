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
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 w-full max-w-7xl space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Published Courses</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track performance for all your active courses.</p>
        </div>

        <Link 
          to="/educator/add-course" 
          className="self-start sm:self-auto px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          + Add New Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
          <p className="text-slate-500 font-medium mb-4">You haven't published any courses yet.</p>
          <Link 
            to="/educator/add-course" 
            className="inline-block px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md"
          >
            Create Your First Course
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Total Revenue</th>
                <th className="px-6 py-4">Enrolled Students</th>
                <th className="px-6 py-4">Published Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {courses.map((course) => {
                const totalEarnings = Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100));
                
                return (
                  <tr key={course._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={course.courseThumbnail} 
                          alt="Course Thumbnail" 
                          className="w-20 aspect-video rounded-lg object-cover shadow-xs border border-slate-100" 
                        />
                        <span className="font-bold text-slate-800 line-clamp-1 max-w-xs">{course.courseTitle}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-emerald-600">
                      {currency}{totalEarnings}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200/60 text-xs">
                        👥 {course.enrolledStudents.length} Students
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">
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