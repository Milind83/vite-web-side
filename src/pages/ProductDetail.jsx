import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetail } from "../store/slices/productsSlice";
import Loading from "../components/Loading";

const DEFAULT_IMAGE = "https://via.placeholder.com/400x300?text=No+Image";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    detail: product,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setMainImage(product.thumbnail || DEFAULT_IMAGE);
    }
  }, [product]);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto bg-white/80 shadow-lg rounded-xl p-6 mt-8 animate-fade-in border border-blue-100">
        <Link
          to="/"
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
          &larr; Back to Products
        </Link>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full md:w-80 h-64 object-cover rounded shadow border"
              onError={(e) => (e.target.src = DEFAULT_IMAGE)}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {product.images &&
                product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={product.title + " " + idx}
                    className={`w-16 h-16 object-cover rounded border cursor-pointer transition-all duration-200 ${
                      mainImage === img
                        ? "ring-2 ring-blue-500"
                        : "hover:ring-2 hover:ring-blue-300"
                    }`}
                    onClick={() => setMainImage(img)}
                    onError={(e) => (e.target.src = DEFAULT_IMAGE)}
                  />
                ))}
            </div>
            {product.meta?.qrCode && (
              <div className="mt-4 flex flex-col items-center">
                <img
                  src={product.meta.qrCode}
                  alt="QR Code"
                  className="w-24 h-24"
                />
                <span className="text-xs text-gray-400 mt-1">
                  Scan for info
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              {product.title}
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-semibold uppercase">
                {product.category}
              </span>
            </h2>
            <p className="text-gray-600 text-lg">{product.description}</p>
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold text-lg">
                ${product.price}
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded font-semibold">
                ⭐ {product.rating}
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded font-semibold">
                Stock: {product.stock}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-semibold">
                Brand: {product.brand}
              </span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded font-semibold">
                SKU: {product.sku}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.tags &&
                product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 rounded p-3">
                <div className="font-semibold text-gray-700 mb-1">Warranty</div>
                <div className="text-gray-600 text-sm">
                  {product.warrantyInformation || "N/A"}
                </div>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <div className="font-semibold text-gray-700 mb-1">Shipping</div>
                <div className="text-gray-600 text-sm">
                  {product.shippingInformation || "N/A"}
                </div>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <div className="font-semibold text-gray-700 mb-1">
                  Availability
                </div>
                <div className="text-gray-600 text-sm">
                  {product.availabilityStatus || "N/A"}
                </div>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <div className="font-semibold text-gray-700 mb-1">
                  Return Policy
                </div>
                <div className="text-gray-600 text-sm">
                  {product.returnPolicy || "N/A"}
                </div>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <div className="font-semibold text-gray-700 mb-1">
                  Minimum Order
                </div>
                <div className="text-gray-600 text-sm">
                  {product.minimumOrderQuantity || "N/A"}
                </div>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <div className="font-semibold text-gray-700 mb-1">Barcode</div>
                <div className="text-gray-600 text-sm">
                  {product.meta?.barcode || "N/A"}
                </div>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <div className="font-semibold text-gray-700 mb-1">
                  Dimensions
                </div>
                <div className="text-gray-600 text-sm">
                  {product.dimensions
                    ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} mm`
                    : "N/A"}
                </div>
                <div className="font-semibold text-gray-700 mb-1 mt-2">
                  Weight
                </div>
                <div className="text-gray-600 text-sm">
                  {product.weight ? `${product.weight}g` : "N/A"}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="font-bold text-lg mb-2 text-gray-800">
                Customer Reviews
              </div>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-3">
                  {product.reviews.map((review, idx) => (
                    <div key={idx} className="bg-gray-50 rounded p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-yellow-500 font-bold">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-gray-700 italic mb-1">
                        "{review.comment}"
                      </div>
                      <div className="text-xs text-gray-500">
                        - {review.reviewerName}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">No reviews yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
