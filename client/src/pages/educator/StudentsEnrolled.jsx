import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const StudentsEnrolled = () => {

  const { backendUrl, getToken, isEducator } = useContext(AppContext)
  const [enrolledStudents, setEnrolledStudents] = useState(null)

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/enrolled-students',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse())
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents()
    }
  }, [isEducator])

  return enrolledStudents ? (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 w-full max-w-7xl space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Enrolled Students</h1>
          <p className="text-slate-500 text-sm mt-1">View all students enrolled in your published courses.</p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          🎓 {enrolledStudents.length} Total Enrolled
        </span>
      </div>

      {enrolledStudents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
          <p className="text-slate-500 font-medium">No students enrolled yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-center hidden sm:table-cell w-16">#</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Course Title</th>
                <th className="px-6 py-4 hidden sm:table-cell">Enrollment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {enrolledStudents.map((item, index) => (
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
                  <td className="px-6 py-4 hidden sm:table-cell text-slate-500 font-medium whitespace-nowrap">
                    📅 {new Date(item.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  ) : <Loading />
};

export default StudentsEnrolled;