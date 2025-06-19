import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 flex flex-col items-center justify-center">
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-white/80 shadow-lg rounded-xl p-8 border border-blue-100"
        style={{ backdropFilter: "blur(2px)" }}
      >
        <div className="relative">
          <span className="text-[8rem] font-extrabold text-blue-500 animate-bounce select-none drop-shadow-lg">
            404
          </span>
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl font-black text-yellow-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] animate-pulse pointer-events-none"
            style={{ textShadow: "2px 2px 8px #000" }}
          >
            Oops!
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2 text-blue-700">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition-all duration-200 animate-fade-in"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
