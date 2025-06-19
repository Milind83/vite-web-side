import React from "react";
import { Cart } from "../components/CartWishlist";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Cart
        </h1>
        <Cart />
      </div>
    </div>
  );
}
