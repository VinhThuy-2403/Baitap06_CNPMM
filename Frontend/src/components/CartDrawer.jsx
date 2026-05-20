import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  closeCart,
  fetchCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";
import {
  X, Minus, Plus, Trash2, ShoppingCart, Loader2,
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export default function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, count, isOpen, isLoading, error } = useSelector(
    (state) => state.cart
  );
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isOpen && token) {
      dispatch(fetchCart());
    }
  }, [isOpen, token]);

  const handleUpdateQty = (cartItemId, quantity) => {
    dispatch(updateCartItem({ cartItemId, quantity }));
  };

  const handleRemove = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate("/cart");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={() => dispatch(closeCart())}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gray-900 z-50 flex flex-col shadow-2xl border-l border-gray-700">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-yellow-400" />
            <h2 className="font-bold text-lg text-white">
              Giỏ hàng
              {count > 0 && (
                <span className="ml-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={handleClear}
                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-400/10 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Xóa tất cả
              </button>
            )}
            <button
              onClick={() => dispatch(closeCart())}
              className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-6">
              <ShoppingCart className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-gray-400 font-medium mb-2">Giỏ hàng trống</p>
              <p className="text-gray-600 text-sm mb-6">
                Thêm sản phẩm vào giỏ để tiếp tục
              </p>
              <button
                onClick={() => dispatch(closeCart())}
                className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-yellow-500 transition-colors"
              >
                Tiếp tục mua hàng
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
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
                    className="bg-gray-800 rounded-2xl p-3 flex gap-3"
                  >
                    {/* Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200";
                      }}
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 mb-0.5">
                        {item.product.brand}
                      </p>
                      <p className="text-white text-sm font-medium line-clamp-2 mb-2">
                        {item.product.name}
                      </p>
                      <p className="text-yellow-400 font-bold text-sm mb-2">
                        {formatPrice(price)}
                      </p>

                      {/* Quantity + Remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                            disabled={isLoading}
                            className="w-7 h-7 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors disabled:opacity-40"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white font-bold w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                            disabled={isLoading || item.quantity >= item.product.stock}
                            className="w-7 h-7 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors disabled:opacity-40"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-400 hover:text-red-300 p-1 rounded-lg hover:bg-red-400/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <p className="text-gray-500 text-xs mt-1">
                        Tổng: {formatPrice(price * item.quantity)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-700 bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Tổng cộng:</span>
              <span className="text-yellow-400 font-black text-xl">
                {formatPrice(total)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-2xl transition-colors text-base"
            >
              Xem giỏ hàng & Đặt hàng
            </button>
          </div>
        )}
      </div>
    </>
  );
}