import ProductCard from "./ProductCard";

export default function ProductSection({ title, products, pagination, onPageChange, isLoading }) {
  if (isLoading) {
    return (
      <div className="py-12">
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl h-72 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <div className="py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-7 bg-yellow-400 rounded-full inline-block"></span>
          {title}
        </h2>
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 bg-gray-700 text-white rounded-lg disabled:opacity-40 hover:bg-gray-600 text-sm"
            >
              ← Trước
            </button>
            <span className="text-gray-400 text-sm">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1 bg-gray-700 text-white rounded-lg disabled:opacity-40 hover:bg-gray-600 text-sm"
            >
              Sau →
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}