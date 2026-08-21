import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

const TestimonialsSection = () => {

  return (
    <section className="py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-16 w-full bg-slate-50/70 border-y border-slate-200/60 my-6">

      <div className="text-center max-w-2xl mx-auto mb-8">

        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">What Our Learners Say</h2>
        <p className="md:text-base text-sm text-slate-500 mt-3 leading-relaxed">
          Hear from our community as they share their journeys of transformation, skill mastery, and professional growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyTestimonial.map((testimonial, index) => (
          <div 
            key={index} 
            className="group text-sm text-left border border-slate-200/80 p-6 rounded-2xl bg-white shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <img className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{testimonial.name}</h3>
                  <p className="text-xs font-medium text-slate-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-4 w-4"
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed italic">
                "{testimonial.feedback}"
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-blue-600 group-hover:underline cursor-pointer">
                Verified Student Story →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

