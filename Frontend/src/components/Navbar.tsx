function Navbar() {
    return (
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">React Router</div>
        <ul className="flex space-x-6 text-gray-700">
          <li>
            <a href="/" className="hover:text-blue-600 transition">Home</a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-600 transition">About</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-blue-600 transition">Contact</a>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default Navbar;
  