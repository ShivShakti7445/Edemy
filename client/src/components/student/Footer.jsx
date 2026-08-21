import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 w-full mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-800">

        <div className="space-y-4">
          <img src={assets.logo_dark} alt="Edemy Logo" className="w-32" />
          <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
            <strong className="text-slate-200">Edemy – Your Learning Hub!</strong><br />
            Enroll in world-class courses, learn at your own pace, and master in-demand skills. Built for students and educators worldwide.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 tracking-wider">Quick Links</h3>
          <ul className="space-y-2.5 text-sm font-medium">
            <li><Link to="/" onClick={() => scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/course-list" onClick={() => scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">All Courses</Link></li>
            <li><Link to="/my-enrollments" onClick={() => scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">My Enrollments</Link></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 tracking-wider">Stay Updated</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Get the latest courses, tech insights, and learning resources delivered weekly.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 pt-1">
            <input 
              className="bg-slate-800/90 border border-slate-700/80 text-slate-200 placeholder-slate-500 outline-none flex-1 h-10 rounded-full px-4 text-sm focus:border-blue-500 transition-colors" 
              type="email" 
              placeholder="Enter your email address" 
            />
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs px-5 h-10 rounded-full transition-all shadow-md">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>Copyright 2026 © Edemy. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-400">Terms of Service</a>
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

