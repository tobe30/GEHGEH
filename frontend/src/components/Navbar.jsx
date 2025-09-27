import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, LogOut } from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import { logout } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
     onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
    navigate("/login"); // <-- redirect after logout
  },
  });

  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close menu on mobile after click
    }
  };

  return (
    <header className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-6 w-full">
      {/* Logo */}
      <Link className="flex items-center gap-1" to="/">
        <Calendar className="size-9 text-primary" />
        <span className="text-2xl font-bold text-primary">GehGeh</span>
      </Link>

      {/* Menu */}
      <nav
        className={`items-center justify-center flex-col md:flex-row flex gap-8 text-gray-900 text-sm font-normal transition-[width] 
          max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden max-md:bg-white/50 backdrop-blur
          ${menuOpen ? "max-md:w-full max-md:h-full" : "max-md:w-0"}`}
      >
        <Link className="hover:text-blue-900" to={"/"}>
          Home
        </Link>
        <button
          className="hover:text-blue-900"
          onClick={() => scrollToSection("about")}
        >
          About
        </button>
        <button
          className="hover:text-blue-900"
          onClick={() => scrollToSection("services")}
        >
          Services
        </button>
        <button onClick={() => scrollToSection("testimonials")} className="hover:text-blue-900" href="#">
          Testimonials
        </button>

        {/* Close button (mobile) */}
        <button
          onClick={() => setMenuOpen(false)}
          className="md:hidden text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Buttons (desktop only) */}
      <div className="hidden md:flex space-x-4">
        {authUser ? (
          <>
            <Link
              to="/my-booking"
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition"
            >
              Appointments
            </Link>

            <button className="mb-2" onClick={logoutMutation}>
              <LogOut className="size-6 mt-1 gap-5 hover:bg-blue-900 transition" />
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition"
          >
            Login
          </Link>
        )}
      </div>

      {/* Open menu (mobile only) */}
      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden text-gray-600"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
};

export default Navbar;
