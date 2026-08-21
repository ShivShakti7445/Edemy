import React from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto w-full">

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white p-8 md:p-16 text-center shadow-2xl">
        {/* Background glow overlay */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Learn anything, anytime, anywhere
          </h2>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            Gain knowledge on the go with flexible, accessible learning. Explore top-rated courses, master high-demand skills, and grow at your own pace!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => { scrollTo(0, 0); navigate('/course-list'); }} 
              className="px-8 py-3.5 rounded-full font-bold text-sm text-blue-600 bg-white hover:bg-blue-50 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              Get Started Now
            </button>
            <button 
              onClick={() => { scrollTo(0, 0); navigate('/course-list'); }}
              className="px-6 py-3.5 rounded-full font-semibold text-sm text-white border border-white/30 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              Explore Catalog
              <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4 invert" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction