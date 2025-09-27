import React from "react";

const Services = () => {
  const services = [
    {
      title: "1-on-1 Financial Coaching",
      desc: "Personalized sessions to help you manage money, grow wealth, and achieve your financial goals.",
      icon: "💼",
    },
    {
      title: "Dating Advice",
      desc: "Practical guidance for young men to build healthy relationships and avoid common mistakes in dating.",
      icon: "🔑",
    },
    {
      title: "Budgeting & Debt Management",
      desc: "Learn how to budget effectively, pay off debts, and build a stress-free financial lifestyle.",
      icon: "💳",
    },
    {
      title: "Wealth Building Strategies",
      desc: "Step-by-step strategies to create long-term financial security through smart investments.",
      icon: "🏦",
    },
  ];

  return (
    <section id="services" className="py-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-slate-800">
        My Services
      </h2>
      <p className="text-slate-500 text-center mt-2 max-w-lg mx-auto">
        I provide tailored financial solutions for professionals and
        entrepreneurs to help them succeed.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:-translate-y-1 transition"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold text-slate-700">
              {service.title}
            </h3>
            <p className="text-sm text-slate-500 mt-2">{service.desc}</p>
            <button className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-full text-sm hover:bg-blue-900 transition">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
