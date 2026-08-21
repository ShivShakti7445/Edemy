// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { assets } from '../../assets/assets'
// import { AppContext } from '../../context/AppContext'

// const CourseCard = ({ course }) => {
//     const { currency , calculateRating} = useContext(AppContext)

//     return (
//         <Link onClick={() => scrollTo(0, 0)} to={'/course/' + course._id} className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg">
//             <img className="w-full" src={course.courseThumbnail} alt='' />
//             <div className="p-3 text-left">
//                 <h3 className="text-base font-semibold">{course.courseTitle}</h3>
//                 {/* <p className="text-gray-500">{ram}</p> */}
//                 {/* <p className="text-gray-500">{course.educator.name}</p> */}
//                 <div className="flex items-center space-x-2">
//                     <p>{calculateRating(course)}</p>
//                     <div className="flex">
//                         {[...Array(5)].map((_, i) => ( 
//                             <img
//                                 key={i}
//                                 className="w-3.5 h-3.5"
//                                 src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
//                                 alt=""
//                             />
//                         ))}
//                     </div>
//                     <p className="text-gray-500">({course.courseRatings.length})</p>
//                 </div>
//                 <p className="text-base font-semibold text-gray-800">{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
//             </div>
//         </Link>
//     )
// }

// export default CourseCard

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const CourseCard = ({ course }) => {

    const { currency, calculateRating } = useContext(AppContext)
    const rating = calculateRating(course)
    const discountedPrice = (course.coursePrice - (course.discount * course.coursePrice / 100)).toFixed(2)

    return (
        <Link 
            onClick={() => scrollTo(0, 0)} 
            to={'/course/' + course._id} 
            className="group border border-slate-200/80 bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left"
        >
            <div className="relative overflow-hidden aspect-video bg-slate-100">
                <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                    src={course.courseThumbnail} 
                    alt={course.courseTitle} 
                />
                {course.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                        {course.discount}% OFF
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                <div>
                    <span className="text-[11px] font-semibold tracking-wider text-blue-600 uppercase">
                        {course.educator?.name || 'Professional Course'}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 mt-1 leading-snug">
                        {course.courseTitle}
                    </h3>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                                {rating.toFixed(1)}
                            </span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <img
                                        key={i}
                                        className="w-3.5 h-3.5"
                                        src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                                        alt="star"
                                    />
                                ))}
                            </div>
                            <span className="text-slate-400 font-medium">({course.courseRatings?.length || 0})</span>
                        </div>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-extrabold text-slate-900">
                                {currency}{discountedPrice}
                            </span>
                            {course.discount > 0 && (
                                <span className="text-xs text-slate-400 line-through font-medium">
                                    {currency}{course.coursePrice}
                                </span>
                            )}
                        </div>
                        <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            Enroll →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard