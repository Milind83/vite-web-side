import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProducts,
  clearSearchResults,
} from "../store/slices/productsSlice";

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const debounceRef = useRef();
  const cart = useSelector((state) => state.cart.items);

  // Advanced: useCallback memoizes the debounced search function so it doesn't get recreated on every render
  const debouncedSearch = useCallback(
    (query) => {
      // Clear any previous debounce timer
      if (debounceRef.current) clearTimeout(debounceRef.current);
      // Set a new debounce timer
      debounceRef.current = setTimeout(() => {
        dispatch(clearSearchResults());
        dispatch(searchProducts(query));
        navigate("/");
      }, 500);
    },
    [dispatch, navigate]
  );

  // Advanced: useEffect with cleanup to handle debounced search on input change
  useEffect(() => {
    if (!search) {
      dispatch(clearSearchResults());
      return;
    }
    debouncedSearch(search);
    // Cleanup: clear timer if component unmounts or search changes
    return () => debounceRef.current && clearTimeout(debounceRef.current);
    // eslint-disable-next-line
  }, [search, debouncedSearch, dispatch]);

  // Advanced: handleSearch uses event delegation and prevents default form submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      Swal.fire({
        icon: "error",
        title: "Search Error",
        text: "Please enter a search term.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }
    // Immediate search on submit
    dispatch(clearSearchResults());
    dispatch(searchProducts(search));
    navigate("/");
  };

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 flex justify-start w-full md:w-auto">
          {/* <Logo /> */}
          LOGO
        </div>
        <form
          onSubmit={handleSearch}
          className="flex-1 flex justify-center w-full max-w-md relative"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 rounded-l px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          />
          {search && (
            <button
              type="button"
              aria-label="Clear search"
              className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-xl px-2 focus:outline-none"
              onClick={() => {
                setSearch("");
                dispatch(clearSearchResults());
              }}
            >
              &times;
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
        <nav className="flex-1 flex justify-end gap-6 w-full md:w-auto mt-2 md:mt-0">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Contact
          </NavLink>
        </nav>
        <div className="flex items-center gap-4 ml-4">
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `relative group ${
                isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-500"
              }`
            }
            aria-label="Wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-7 h-7"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative group ${
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
              }`
            }
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-1.3L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold border-2 border-white">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
