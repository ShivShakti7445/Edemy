import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyEnrollments = () => {
  const { userData, enrolledCourses, fetchUserEnrolledCourses, navigate, backendUrl, getToken, calculateCourseDuration, calculateNoOfLectures } = useContext(AppContext)
  const [progressArray, setProgressArray] = useState([]);

  const getCourseProgress = async () => {
    try {
        const token = await getToken();
        const tempProgressArray = await Promise.all(
            enrolledCourses.map(async (course) => {
                const { data }  = await axios.post(
                    `${backendUrl}/api/user/get-course-progress`,
                    { courseId: course._id },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                let totalLectures = calculateNoOfLectures(course);
                const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
                return { totalLectures, lectureCompleted };
            })
        );

        setProgressArray(tempProgressArray);
    } catch (error) {
        toast.error(error.message);
    }
};

    useEffect(() => {
        if (userData) {
            fetchUserEnrolledCourses()
        }
    }, [userData])

    useEffect(() => {
        if (enrolledCourses.length > 0) {
            getCourseProgress()
        }
    }, [enrolledCourses])

  return ( 
    <div className="min-h-screen flex flex-col justify-between bg-slate-50/50">
        <div className='px-4 sm:px-8 md:px-12 lg:px-16 pt-8 md:pt-10 pb-16 max-w-7xl mx-auto w-full'>



            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
                <div>
                    <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>My Enrollments</h1>
                    <p className="text-slate-500 text-sm mt-1">Track your course progress, watch lectures, and continue learning.</p>
                </div>
                <span className="self-start md:self-auto px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    📚 {enrolledCourses.length} Enrolled {enrolledCourses.length === 1 ? 'Course' : 'Courses'}
                </span>
            </div>

            {enrolledCourses.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-xs">
                    <p className="text-slate-500 font-medium mb-4">You haven't enrolled in any courses yet.</p>
                    <button 
                        onClick={() => navigate('/course-list')} 
                        className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all"
                    >
                        Browse Courses Now
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/80 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Course Details</th>
                                <th className="px-6 py-4 max-sm:hidden">Duration</th>
                                <th className="px-6 py-4 max-sm:hidden">Progress</th>
                                <th className="px-6 py-4 text-right sm:text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {enrolledCourses.map((course, index) => {
                                const prog = progressArray[index];
                                const percent = prog && prog.totalLectures > 0 
                                    ? Math.round((prog.lectureCompleted * 100) / prog.totalLectures) 
                                    : 0;
                                const isCompleted = percent === 100;

                                return (
                                    <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <img 
                                                    src={course.courseThumbnail} 
                                                    alt={course.courseTitle} 
                                                    className="w-20 sm:w-28 aspect-video rounded-lg object-cover shadow-xs border border-slate-100" 
                                                />
                                                <div className='flex-1 max-w-md'>
                                                    <h3 className='font-bold text-slate-800 text-base line-clamp-1 mb-1.5'>{course.courseTitle}</h3>
                                                    <div className="flex items-center gap-3">
                                                        <Line 
                                                            className='flex-1 bg-slate-100 rounded-full overflow-hidden' 
                                                            strokeWidth={3} 
                                                            strokeColor={isCompleted ? "#10b981" : "#2563eb"}
                                                            percent={percent} 
                                                        />
                                                        <span className="text-xs font-bold text-slate-600">{percent}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 max-sm:hidden font-medium text-slate-600 whitespace-nowrap">
                                            ⏱️ {calculateCourseDuration(course)}
                                        </td>
                                        <td className="px-6 py-5 max-sm:hidden whitespace-nowrap">
                                            <span className="font-semibold text-slate-800">
                                                {prog ? `${prog.lectureCompleted} / ${prog.totalLectures}` : '0 / 0'}
                                            </span>
                                            <span className='text-xs text-slate-400 ml-1.5 font-medium'>Lectures</span>
                                        </td>
                                        <td className="px-6 py-5 text-right sm:text-left whitespace-nowrap">
                                            <button 
                                                onClick={() => navigate('/player/' + course._id)} 
                                                className={`px-5 py-2 rounded-full font-semibold text-xs transition-all shadow-xs hover:shadow-md cursor-pointer ${
                                                    isCompleted 
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-102 active:scale-95'
                                                }`}
                                            >
                                                {isCompleted ? '✓ Completed' : '▶ Continue Watching'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

        <Footer />
    </div>
)
}

export default MyEnrollments