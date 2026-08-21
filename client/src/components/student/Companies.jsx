import React from 'react';
import { assets } from '../../assets/assets';

const Companies = () => {
  return (
    <div className="w-full py-8 bg-slate-50/70 border-y border-slate-200/60 my-4 flex flex-col items-center justify-center">   
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Trusted by learners & teams worldwide</p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-5">
        <img className='md:w-28 w-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300' src={assets.microsoft_logo} alt="Microsoft" />
        <img className='md:w-24 w-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300' src={assets.adobe_logo} alt="Adobe" />
        <img className='md:w-24 w-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300' src={assets.paypal_logo} alt="Paypal" />
        <img className='md:w-28 w-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300' src={assets.walmart_logo} alt="Walmart" />
        <img className='md:w-24 w-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300' src={assets.accenture_logo} alt="Accenture" />
      </div>
    </div>
  );
};


export default Companies;
