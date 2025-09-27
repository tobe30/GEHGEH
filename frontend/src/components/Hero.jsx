import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="flex flex-col md:flex-row items-center max-md:text-center justify-between mt-16 pb-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto w-full">
      {/* Left side */}
      <div className="flex flex-col items-center md:items-start">
        <button
          className="mt-16 mb-6 flex items-center space-x-2 border border-primary text-primary text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-indigo-50 transition"
          type="button"
        >
          <span>Financial Service.</span>
          <span className="flex items-center justify-center size-6 p-1 rounded-full bg-primary">
            <svg
              width="14"
              height="11"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6.5h14M9.5 1 15 6.5 9.5 12"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        <h1 className="text-black font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
          Serial Entrepreneur Africa’s most Experienced{" "}
          <span className="text-primary">financial coach</span>
        </h1>

        <p className="mt-4 text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
          Get practical financial wisdom and strategies that help you build wealth, manage money smartly, and secure your future.
        </p>

        <div className="flex flex-col md:flex-row items-center mt-8 gap-3">
          <button
            className="bg-primary text-white px-6 pr-2.5 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-blue-900 transition"
            type="button"
          >
            <span>Schedule Appointment</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <Link
            className="text-primary bg-indigo-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 transition"
            to="/book"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Right side (One Image) */}
     <div className="mt-12 pb-6 flex justify-center md:justify-end w-full md:w-1/2">
  <img
    alt="Financial expert"
    className="w-full max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg hover:scale-105 transition duration-300 object-cover shadow-lg"
    src="gehgeh.jpeg"
  />
</div>

    </main>
  );
};

export default Hero;
