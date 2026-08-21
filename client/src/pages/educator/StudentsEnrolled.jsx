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
    <div className="min-h-screen bg-slate-50/50 p-5 md:p-8 w-full max-w-6xl space-y-5">
      
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Enrolled Students</h1>
          <p className="text-slate-500 text-xs mt-0.5">View all students enrolled in your published courses.</p>
        </div>
        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
          🎓 {enrolledStudents.length} Total Enrolled
        </span>
      </div>

      {enrolledStudents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-2xs">
          <p className="text-slate-500 text-xs font-medium">No students enrolled yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 text-slate-600 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5 text-center hidden sm:table-cell w-12">#</th>
                <th className="px-4 py-2.5">Student Name</th>
                <th className="px-4 py-2.5">Course Title</th>
                <th className="px-4 py-2.5 hidden sm:table-cell">Enrollment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {enrolledStudents.map((item, index) => (
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
                  <td className="px-4 py-2.5 hidden sm:table-cell text-slate-500 font-medium whitespace-nowrap text-[11px]">
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