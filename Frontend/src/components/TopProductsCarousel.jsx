import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, TrendingUp, Eye } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export default function TopProductsCarousel({ title, icon, products, isLoading }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  const IconComponent = icon === "trending" ? TrendingUp : Eye;

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-7 bg-yellow-400 rounded-full" />
          <div className="h-7 w-48 bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-7 bg-yellow-400 rounded-full inline-block" />
          <IconComponent className="w-6 h-6 text-yellow-400" />
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-9 h-9 bg-gray-700 hover:bg-yellow-400 hover:text-black disabled:opacity-30 rounded-xl flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-gray-500 text-sm min-w-[60px] text-center">
            {current + 1} / {maxIndex + 1}
          </span>
          <button
            onClick={next}
            disabled={current >= maxIndex}
            className="w-9 h-9 bg-gray-700 hover:bg-yellow-400 hover:text-black disabled:opacity-30 rounded-xl flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-300"
          style={{ transform: `translateX(calc(-${current} * (25% + 4px)))` }}
        >
          {products.map((product, index) => {
            const discount = product.salePrice
              ? Math.round(((product.price - product.salePrice) / product.price) * 100)
              : null;

            return (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex-shrink-0 w-[calc(25%-12px)] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                {/* Rank badge */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400";
                    }}
                  />
                  {/* Rank */}
                  <div
                    className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                      index === 0
                        ? "bg-yellow-400 text-black"
                        : index === 1
                        ? "bg-gray-300 text-black"
                        : index === 2
                        ? "bg-orange-400 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      -{discount}%
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <span className="text-xs text-gray-400">{product.brand}</span>
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mt-0.5 mb-2">
                    {product.name}
                  </h3>
                  {/* Price */}
                  <div className="mb-2">
                    {product.salePrice ? (
                      <div>
                        <span className="text-yellow-500 font-bold text-sm">
                          {formatPrice(product.salePrice)}
                        </span>
                        <span className="text-gray-400 text-xs line-through ml-1">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-yellow-500 font-bold text-sm">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {product.sold} đã bán
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {product.views} xem
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {[...Array(maxIndex + 1)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "bg-yellow-400 w-6" : "bg-gray-600 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}