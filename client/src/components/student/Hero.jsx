import React from 'react';
import { assets } from '../../assets/assets';
import SearchBar from '../../components/student/SearchBar';

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full md:pt-32 pt-20 pb-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-blue-50/80 via-indigo-50/20 to-white overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-r from-blue-400/15 to-violet-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide shadow-xs">
        <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
        Over 100,000+ Students Learning Worldwide
      </div>

      {/* Main Heading */}
      <h1 className="md:text-5xl text-3xl font-extrabold text-slate-900 max-w-4xl mx-auto leading-tight tracking-tight">
        Empower your future with courses designed to{" "}
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
          fit your choice.
        </span>
        <img src={assets.sketch} alt="sketch" className="md:block hidden absolute -bottom-7 right-8 opacity-75" />
      </h1>

      {/* Paragraph text */}
      <p className="md:block hidden text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
        We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
      </p>
      <p className="md:hidden text-slate-600 text-sm max-w-sm mx-auto">
        We bring together world-class instructors to help you achieve your professional goals.
      </p>

      {/* Search bar button */}
      <div className="w-full flex justify-center pt-2">
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;

