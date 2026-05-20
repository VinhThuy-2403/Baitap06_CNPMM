import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";
import {
  Camera, ArrowLeft, Minus, Plus,
  Trash2, ShoppingCart, Loader2,
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, count, isLoading, error } = useSelector(
    (state) => state.cart
  );
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(fetchCart());
  }, [token]);

  const handleUpdateQty = (cartItemId, quantity) => {
    dispatch(updateCartItem({ cartItemId, quantity }));
  };

  const handleRemove = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

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
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-1.5 rounded-xl">
              <Camera className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold">
              LENS<span className="text-yellow-400">STORE</span>
            </span>
          </div>
          <span className="text-gray-400 text-sm">/ Giỏ hàng</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-yellow-400" />
          Giỏ hàng của bạn
          {count > 0 && (
            <span className="bg-yellow-400 text-black text-sm font-bold px-2 py-0.5 rounded-full">
              {count} sản phẩm
            </span>
          )}
        </h1>

        {isLoading && items.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-yellow-400" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl mb-2">Giỏ hàng trống</p>
            <p className="text-gray-600 text-sm mb-8">
              Hãy thêm sản phẩm vào giỏ hàng
            </p>
            <button
              onClick={() => navigate("/home")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Tiếp tục mua hàng
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2 space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {items.map((item) => {
                const price = item.product.salePrice || item.product.price;
                return (
                  <div
                    key={item.id}
                    className="bg-gray-800 rounded-2xl p-4 flex gap-4"
                  >
                    {/* Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      onClick={() => navigate(`/product/${item.product.id}`)}
                      className="w-28 h-28 object-cover rounded-xl flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200";
                      }}
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">
                            {item.product.brand} • {item.product.category}
                          </p>
                          <h3
                            onClick={() => navigate(`/product/${item.product.id}`)}
                            className="text-white font-semibold cursor-pointer hover:text-yellow-400 transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-400/10 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                            disabled={isLoading}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors disabled:opacity-40"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white font-bold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                            disabled={isLoading || item.quantity >= item.product.stock}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors disabled:opacity-40"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <span className="text-gray-500 text-xs ml-1">
                            (còn {item.product.stock})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-yellow-400 font-bold">
                            {formatPrice(price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-gray-500 text-xs">
                              {formatPrice(price)} / cái
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Xóa tất cả */}
              <button
                onClick={() => dispatch(clearCart())}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Xóa tất cả sản phẩm
              </button>
            </div>

            {/* Tổng đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-2xl p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4 pb-4 border-b border-gray-700">
                  Tóm tắt đơn hàng
                </h3>

                <div className="space-y-3 mb-4">
                  {items.map((item) => {
                    const price = item.product.salePrice || item.product.price;
                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-400 line-clamp-1 flex-1 mr-2">
                          {item.product.name} x{item.quantity}
                        </span>
                        <span className="text-white flex-shrink-0">
                          {formatPrice(price * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Tổng cộng:</span>
                    <span className="text-yellow-400 font-black text-2xl">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mt-1">
                    Chưa bao gồm phí vận chuyển
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-400/50 text-black font-bold rounded-2xl transition-colors text-base mb-3"
                >
                  {isLoading ? "Đang xử lý..." : "Đặt hàng ngay"}
                </button>

                <button
                  onClick={() => navigate("/home")}
                  className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-2xl transition-colors text-sm"
                >
                  Tiếp tục mua hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}