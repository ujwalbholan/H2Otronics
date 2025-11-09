
const Header = () => {
  return (
    <header className="text-white bg-blue-600 shadow-md">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <a href="/Home" className="text-2xl font-bold">H₂Otronics</a>
        <nav className="space-x-4">
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
      </div>
    </header>
  );
};

export default Header;
