import React from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-4 md:py-6 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto w-full">

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white p-6 md:py-8 md:px-10 text-center shadow-xl">
        {/* Background glow overlay */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-2xl pointer-events-none -ml-16 -mb-16" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-snug">
            Learn anything, anytime, anywhere
          </h2>
          <p className="text-blue-100 text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
            Gain knowledge on the go with flexible, accessible learning. Explore top-rated courses, master high-demand skills, and grow at your own pace!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button 
              onClick={() => { scrollTo(0, 0); navigate('/course-list'); }} 
              className="px-6 py-2.5 rounded-full font-bold text-xs text-blue-600 bg-white hover:bg-blue-50 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              Get Started Now
            </button>
            <button 
              onClick={() => { scrollTo(0, 0); navigate('/course-list'); }}
              className="px-5 py-2.5 rounded-full font-semibold text-xs text-white border border-white/30 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              Explore Catalog
              <img src={assets.arrow_icon} alt="arrow" className="w-3.5 h-3.5 invert" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


export default CallToAction