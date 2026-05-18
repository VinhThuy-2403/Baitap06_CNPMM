import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsByCategoryAPI } from "../services/authService";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";

const TABS = ["all", "DSLR", "Mirrorless", "Compact", "Phụ kiện"];

export default function AllProductsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const observerRef = useRef(null);
  const loaderRef = useRef(null);

  const fetchProducts = useCallback(async (tab, pageNum, reset = false) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await getProductsByCategoryAPI(tab, pageNum, 8);
      const newData = res.data;
      setProducts((prev) => (reset ? newData : [...prev, ...newData]));
      setHasMore(pageNum < res.pagination.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsInitial(false);
    }
  }, [isLoading]);

  // Đổi tab → reset
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setIsInitial(true);
    fetchProducts(activeTab, 1, true);
  }, [activeTab]);

  // Load thêm khi page thay đổi (không phải lần đầu)
  useEffect(() => {
    if (page > 1) {
      fetchProducts(activeTab, page, false);
    }
  }, [page]);

  // Intersection Observer — lazy loading
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }
    return () => observerRef.current?.disconnect();
  }, [hasMore, isLoading]);

  return (
    <div className="py-10">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-1 h-7 bg-yellow-400 rounded-full inline-block" />
        <h2 className="text-2xl font-bold text-white">Tất cả sản phẩm</h2>
      </div>

      {/* Tabs danh mục */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-yellow-400 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab === "all" ? "Tất cả" : tab}
          </button>
        ))}
      </div>

      {/* Skeleton loading ban đầu */}
      {isInitial ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl h-72 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Grid sản phẩm */}
          {products.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              Không có sản phẩm nào trong danh mục này
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((p, i) => (
                <ProductCard key={`${p.id}-${i}`} product={p} />
              ))}
            </div>
          )}

          {/* Loader trigger — Intersection Observer bám vào đây */}
          <div ref={loaderRef} className="flex justify-center py-8">
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Loader2 className="w-5 h-5 animate-spin text-yellow-400" />
                Đang tải thêm...
              </div>
            )}
            {!hasMore && products.length > 0 && (
              <p className="text-gray-600 text-sm">
                Đã hiển thị tất cả {products.length} sản phẩm
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}