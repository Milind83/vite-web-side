import React from "react";
import { Wishlist } from "../components/CartWishlist";

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-700">
          Wishlist
        </h1>
        <Wishlist />
      </div>
    </div>
  );
}
