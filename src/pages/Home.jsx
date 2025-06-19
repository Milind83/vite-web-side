import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchProductsPaginated,
  fetchProductsSorted,
  fetchCategories,
  fetchProductsByCategory,
} from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import { addToWishlist } from "../store/slices/wishlistSlice";
import Loading from "../components/Loading";

const DEFAULT_IMAGE = "https://via.placeholder.com/400x300?text=No+Image";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // UI state for pagination, sorting, and category
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [category, setCategory] = useState("");
  const limit = 10;
  const skip = (page - 1) * limit;

  // Redux state
  const {
    list: productList,
    loading,
    error,
    searchResults,
    paginatedCache,
    sortedCache,
    categories,
    categoryCache,
  } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch products by category, or paginated/sorted products
  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    } else if (sortBy && order) {
      dispatch(fetchProductsSorted({ sortBy, order, limit, skip }));
    } else {
      dispatch(fetchProductsPaginated({ limit, skip }));
    }
  }, [dispatch, page, sortBy, order, limit, skip, category]);

  // Advanced: Conditional rendering for loading and error states
  if (loading) return <Loading />;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  // Choose which product list to display
  let displayList =
    searchResults && searchResults.length > 0 ? searchResults : [];
  if (!displayList.length) {
    if (category) {
      displayList = categoryCache[category] || [];
    } else if (sortBy && order) {
      const key = JSON.stringify({ sortBy, order, limit, skip });
      displayList = sortedCache[key] || [];
    } else {
      const key = JSON.stringify({ limit, skip });
      displayList = paginatedCache[key] || productList;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700 drop-shadow">
        Product Listing
      </h1>
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center">
        <select
          className="border rounded px-3 py-1"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
        <select
          className="border rounded px-3 py-1"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="">Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select
          className="border rounded px-3 py-1"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) =>
            typeof cat === "string" ? (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ) : (
              <option key={cat.slug || cat.name} value={cat.slug || cat.name}>
                {cat.name || cat.slug}
              </option>
            )
          )}
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="font-semibold">Page {page}</span>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayList?.map((product) => {
          const inCart = cart.some((item) => item.product.id === product.id);
          const inWishlist = wishlist.some((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className={`bg-white/80 shadow-lg rounded-xl overflow-hidden cursor-pointer hover:ring-4 ring-blue-300 transition border border-blue-100 hover:scale-105 duration-200 relative ${
                inCart ? "ring-2 ring-blue-400" : ""
              }`}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ backdropFilter: "blur(2px)" }}
            >
              <img
                src={product.thumbnail || DEFAULT_IMAGE}
                alt={product.title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-95 rounded-t-xl"
                onError={(e) => (e.target.src = DEFAULT_IMAGE)}
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-purple-800 truncate flex items-center gap-2">
                  {product.title}
                  {inCart && (
                    <span className="ml-1 text-blue-500" title="In Cart">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-1.3L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"
                        />
                      </svg>
                    </span>
                  )}
                  {inWishlist && (
                    <span className="ml-1 text-pink-500" title="In Wishlist">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 inline"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-pink-600 font-bold">
                    ${product.price}
                  </span>
                  <span className="text-sm text-yellow-500">
                    ⭐ {product.rating}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 text-white py-1 rounded shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToCart(product));
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="flex items-center justify-center bg-white border border-pink-300 text-pink-500 rounded shadow px-2 hover:bg-pink-100"
                    title="Add to Wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToWishlist(product));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.54 0-2.878.792-3.563 2.008A4.125 4.125 0 0 0 3 8.25c0 7.22 9 11.25 9 11.25s9-4.03 9-11.25z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
