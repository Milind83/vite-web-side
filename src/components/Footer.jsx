const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-2 md:mb-0">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
        <ul className="flex gap-6 text-gray-500">
          <li>
            <a href="#" className="hover:text-gray-800 transition">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-800 transition">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
