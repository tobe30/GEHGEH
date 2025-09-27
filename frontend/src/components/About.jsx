import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20">
      <h1 className="text-3xl font-semibold text-center mx-auto">About GehGeh</h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        Hi, I’m GehGeh, a financial coach helping young professionals and
        entrepreneurs build wealth, take control of their money, and make
        smarter financial decisions.
      </p>

      <section className="flex flex-col md:flex-row items-center mt-5 justify-center gap-10 max-md:px-4">
        <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
          <img
            className="max-w-md w-full object-cover rounded-2xl"
            src="Gabout.jpg"
            alt="Gehgeh Financial Coach"
          />
          <div className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white p-4 rounded-xl">
            <div className="flex -space-x-4 shrink-0">
              <img
                src="blackman.jpg"
                alt="client"
                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1"
              />
              <img
                src="blackman2.jpg"
                alt="client"
                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]"
              />
              <img
                src="blackman3.jpg"
                alt="client"
                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]"
              />
              <div className="flex items-center justify-center text-xs text-white size-9 rounded-full border-[3px] border-white bg-primary hover:-translate-y-1 transition z-[4]">
                50+
              </div>
            </div>
            <p className="text-sm font-medium text-slate-800">
              Join GehGeh’s University
            </p>
          </div>
        </div>

        <div className="text-sm text-slate-600 max-w-lg">
          <h1 className="text-xl uppercase font-semibold text-slate-700">
            What I Do
          </h1>
          <div className="w-24 h-[3px] rounded-full bg-primary to-[#DDD9FF]"></div>
          <p className="mt-8">
            I help individuals and small business owners create clear financial
            roadmaps, manage their income better, and build habits that lead to
            long-term wealth.
          </p>
          <p className="mt-4">
            I provide relationship advice for young men, helping them build
            healthy dating lives and avoid costly mistakes.
          </p>
          <p className="mt-4">
            My mission is simple: to make personal finance less overwhelming
            and more empowering, so you can focus on creating the life you want
            without money stress.
          </p>
          <button className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-primary py-3 px-8 rounded-full text-white">
            <span>Contact Me</span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </section>
    </section>
  );
};

export default About;
