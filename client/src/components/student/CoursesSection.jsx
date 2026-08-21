import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';

const CoursesSection = () => {

  const { allCourses } = useContext(AppContext)

  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto w-full">

      <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Learn from the best
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-2 max-w-xl">
            Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver real results.
          </p>
        </div>
        <Link 
          to={'/course-list'} 
          onClick={() => scrollTo(0, 0)} 
          className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold text-blue-600 border border-blue-200 bg-blue-50/50 hover:bg-blue-600 hover:text-white transition-all shadow-xs hover:shadow-md active:scale-95"
        >
          Explore All Courses →
        </Link>
      </div>

      {/* course cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCourses.slice(0, 4).map((course, index) => <CourseCard key={index} course={course} />)}
      </div>

      <div className="mt-12 text-center md:hidden">
        <Link 
          to={'/course-list'} 
          onClick={() => scrollTo(0, 0)} 
          className="inline-block px-8 py-3 rounded-full text-sm font-semibold text-white bg-blue-600 shadow-md"
        >
          Show all courses
        </Link>
      </div>
    </section>
  );
};

export default CoursesSection;

