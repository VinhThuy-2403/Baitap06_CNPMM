import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { getProductByIdAPI, getRelatedProductsAPI } from "../services/authService";
import ProductCard from "../components/ProductCard";
import {
  Camera,
  ArrowLeft,
  ShoppingCart,
  Minus,
  Plus,
  Package,
  TrendingUp,
  Tag,
  Star,
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setQuantity(1);
      setThumbsSwiper(null);
      window.scrollTo(0, 0);
      try {
        const [productRes, relatedRes] = await Promise.all([
          getProductByIdAPI(id),
          getRelatedProductsAPI(id),
        ]);
        setProduct(productRes.data);
        setRelated(relatedRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-4">Sản phẩm không tồn tại</p>
          <button
            onClick={() => navigate("/home")}
            className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images.map((img) => img.url)
      : [product.image];

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const stockStatus =
    product.stock === 0
      ? { label: "Hết hàng", color: "text-red-400" }
      : product.stock < 5
      ? { label: `Còn ${product.stock} sản phẩm`, color: "text-orange-400" }
      : { label: `Còn hàng (${product.stock})`, color: "text-green-400" };

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* NAVBAR */}
      <nav className="bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Quay lại</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-1.5 rounded-xl">
              <Camera className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold">
              LENS<span className="text-yellow-400">STORE</span>
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <button onClick={() => navigate("/home")} className="hover:text-yellow-400">
            Trang chủ
          </button>
          <span>/</span>
          <span className="text-gray-400">{product.category}</span>
          <span>/</span>
          <span className="text-white line-clamp-1">{product.name}</span>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ẢNH - SWIPER */}
          <div key={id}>
            {/* Main swiper */}
            <Swiper
              modules={[Navigation, Pagination, Thumbs]}
              navigation
              pagination={{ clickable: true }}
              thumbs={{ swiper: thumbsSwiper }}
              className="rounded-2xl overflow-hidden mb-3 h-96"
            >
              {images.map((url, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={url}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600";
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail swiper */}
            {images.length > 1 && (
              <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                spaceBetween={8}
                watchSlidesProgress
                className="thumbs-swiper"
              >
                {images.map((url, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={url}
                      alt={`thumb ${i + 1}`}
                      className="w-full h-20 object-cover rounded-xl cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* THÔNG TIN SẢN PHẨM */}
          <div className="flex flex-col gap-5">

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {product.category}
              </span>
              <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                {product.brand}
              </span>
              {product.isNew && (
                <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  MỚI
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-black text-yellow-400 border border-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                  BÁN CHẠY
                </span>
              )}
              {discount && (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Tên */}
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              {product.name}
            </h1>

            {/* Đánh giá */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">(4.8/5)</span>
            </div>

            {/* Giá */}
            <div className="bg-gray-800 rounded-2xl p-4">
              {product.salePrice ? (
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-black text-yellow-400">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-gray-500 line-through text-lg mb-0.5">
                    {formatPrice(product.price)}
                  </span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg mb-0.5">
                    Tiết kiệm {formatPrice(product.price - product.salePrice)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-black text-yellow-400">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Tồn kho + Đã bán */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <span className={`text-sm font-medium ${stockStatus.color}`}>
                  {stockStatus.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  Đã bán:{" "}
                  <span className="text-white font-medium">{product.sold}</span>
                </span>
              </div>
            </div>

            {/* Mô tả */}
            <p className="text-gray-400 text-sm leading-relaxed border-t border-gray-700 pt-4">
              {product.description}
            </p>

            {/* Số lượng */}
            {product.stock > 0 && (
              <div>
                <p className="text-sm text-gray-400 mb-2">Số lượng:</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    className="w-9 h-9 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-gray-500 text-sm ml-2">
                    Tối đa {product.stock}
                  </span>
                </div>
              </div>
            )}

            {/* Nút thêm giỏ hàng */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-base transition-all ${
                product.stock === 0
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : added
                  ? "bg-green-500 text-white"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {product.stock === 0
                ? "Hết hàng"
                : added
                ? "✓ Đã thêm vào giỏ!"
                : "Thêm vào giỏ hàng"}
            </button>
          </div>
        </div>

        {/* SẢN PHẨM TƯƠNG TỰ */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-7 bg-yellow-400 rounded-full inline-block" />
              Sản phẩm tương tự
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}