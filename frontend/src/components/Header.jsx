import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 text-white bg-blue-600 shadow-2xl">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <a href="/" className="text-2xl font-bold">
          H₂Otronics
        </a>

        {/* Desktop Nav */}
        <nav className="hidden space-x-6 md:flex">
          <a href="#features" className="hover:underline">
            Features
          </a>
          <a href="#demo" className="hover:underline">
            Demo
          </a>
          <a href="#team" className="hover:underline">
            Team
          </a>
          <a href="#gallery" className="hover:underline">
            Gallery
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="px-6 py-4 space-y-2 bg-blue-500 md:hidden">
          <a href="#features" className="block hover:underline">
            Features
          </a>
          <a href="#demo" className="block hover:underline">
            Demo
          </a>
          <a href="#team" className="block hover:underline">
            Team
          </a>
          <a href="#gallery" className="block hover:underline">
            Gallery
          </a>
          <a href="#contact" className="block hover:underline">
            Contact
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
