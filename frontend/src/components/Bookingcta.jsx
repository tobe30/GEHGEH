export default function BookingCTA() {
  return (
    <>
      <div className="max-w-5xl py-16 md:w-full mx-2 md:mx-auto flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#01204e] to-black rounded-2xl p-10 text-white">
        <p className="px-6 py-2 rounded-full text-sm border border-[#54487B] bg-gradient-to-r from-[#A992F2] to-[#DFAB9B] bg-clip-text text-transparent">
          Booking & Support
        </p>
        <h1 className="text-4xl md:text-5xl md:leading-[60px] font-medium max-w-2xl mt-5">
          Book a 1-on-1 Session with{" "}
          <span className="bg-gradient-to-r from-[#342075] to-[#9ba5df] bg-clip-text text-transparent">
            GehGeh
          </span>
        </h1>
        <p className="text-white text-sm mt-2">
          Get practical guidance on finances, dating, and personal growth—tailored to your life.
        </p>
        <button className="px-12 py-2.5 mt-6 rounded-full text-sm border border-[#54487B] active:scale-95 transition-all bg-gradient-to-r from-[#A992F2] to-[#DFAB9B] bg-clip-text text-transparent">
          Book Appointment
        </button>
      </div>
    </>
  );
}
