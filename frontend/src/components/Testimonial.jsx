import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      image:
        "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&w=200",
      name: "Chinedu Okafor",
      handle: "Entrepreneur",
      date: "April 20, 2025",
      text: "Working with GehGeh completely changed how I manage my business finances. His advice was practical and results-driven.",
    },
    {
      image:
        "blackman.jpg",
      name: "Amara Johnson",
      handle: "Freelancer",
      date: "May 10, 2025",
      text: "I finally feel confident about budgeting and saving. GehGeh’s coaching style is simple yet powerful.",
    },
    {
      image:
        "blackman2.jpg",
      name: "Tunde Bello",
      handle: "Teacher",
      date: "June 5, 2025",
      text: "Left my girlfriend because of GehGeh advice that girl won chop me GehGeh saved my financial situation.",
    },
    {
      image:
        "blackman3.jpg",
      name: "Ngozi Ade",
      handle: "Small Business Owner",
      date: "July 12, 2025",
      text: "GehGeh truly understands the financial struggles of entrepreneurs in Nigeria. Highly recommend him!",
    },
  ];

  const TestimonialCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-2 items-center">
        <img
          className="size-11 rounded-full object-cover"
          src={card.image}
          alt={card.name}
        />
        <div className="flex flex-col">
          <p className="font-medium">{card.name}</p>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-700 italic">“{card.text}”</p>
      <p className="text-xs text-slate-400">{card.date}</p>
    </div>
  );

  return (
    <section id="testimonials" className="py-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-slate-800">
        What People Say
      </h2>
      <p className="text-slate-500 text-center mt-2 max-w-lg mx-auto">
        Hear from professionals and entrepreneurs who have worked with GehGeh.
      </p>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative mt-10">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-5 pb-5">
          {[...testimonials, ...testimonials].map((card, index) => (
            <TestimonialCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>

      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative mt-6">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-5 pb-5">
          {[...testimonials, ...testimonials].map((card, index) => (
            <TestimonialCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Testimonials;
