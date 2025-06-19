import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/slices/cartSlice";
import {
  removeFromWishlist,
  addToWishlist,
} from "../store/slices/wishlistSlice";
import { HeartIcon as HeartSolid, XMarkIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon as HeartOutline,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  if (!wishlist.length) {
    return (
      <div className="p-6 text-center text-gray-400 flex flex-col items-center gap-4">
        <span>Your wishlist is empty.</span>
        <Link
          to="/"
          className="inline-block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
        >
          Go to Product List
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {wishlist.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-lg p-4 flex flex-col relative"
        >
          <button
            className="absolute top-2 right-2 text-pink-500 hover:text-pink-700"
            onClick={() => dispatch(removeFromWishlist(product.id))}
            title="Remove from wishlist"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-32 w-full object-cover rounded mb-2"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
            <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
            <p className="text-pink-600 font-bold text-xl mb-2">
              ${product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  if (!cart.length) {
    return (
      <div className="p-6 text-center text-gray-400 flex flex-col items-center gap-4">
        <span>Your cart is empty.</span>
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Go to Product List
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cart.map((product) => {
        const inWishlist = wishlist.some((item) => item.id === product.id);
        return (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col relative"
          >
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => dispatch(removeFromCart(product.id))}
              title="Remove from cart"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <button
              className="absolute top-2 left-2"
              onClick={() =>
                inWishlist
                  ? dispatch(removeFromWishlist(product.id))
                  : dispatch(addToWishlist(product))
              }
              title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              {inWishlist ? (
                <HeartSolid className="w-6 h-6 text-pink-500" />
              ) : (
                <HeartOutline className="w-6 h-6 text-gray-400 hover:text-pink-400" />
              )}
            </button>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-32 w-full object-cover rounded mb-2"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
              <p className="text-blue-600 font-bold text-xl mb-2">
                ${product.price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
