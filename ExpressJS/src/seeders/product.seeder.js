const { Product, ProductImage } = require("../models/index");

const products = [
  {
    name: "Canon EOS 90D",
    description:
      "Máy ảnh DSLR 32.5MP với khả năng quay video 4K và hệ thống lấy nét tự động nhanh chóng. Phù hợp cho nhiếp ảnh thể thao và thiên nhiên hoang dã.",
    price: 32990000,
    salePrice: 28990000,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    brand: "Canon",
    category: "DSLR",
    stock: 15,
    sold: 128,
    isNew: false,
    isBestSeller: true,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600",
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=600",
    ],
  },
  {
    name: "Canon EOS 850D",
    description:
      "Máy ảnh DSLR 24.1MP với màn hình cảm ứng lật tiện lợi, lý tưởng cho người mới bắt đầu đến người dùng trung cấp.",
    price: 19990000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600",
    brand: "Canon",
    category: "DSLR",
    stock: 20,
    sold: 75,
    isNew: true,
    isBestSeller: false,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    ],
  },
  {
    name: "Sony Alpha A7 IV",
    description:
      "Máy ảnh Mirrorless full-frame 33MP với khả năng quay 4K 60fps. Hệ thống lấy nét AI tiên tiến, phù hợp cho nhiếp ảnh chuyên nghiệp.",
    price: 65990000,
    salePrice: 59990000,
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600",
    brand: "Sony",
    category: "Mirrorless",
    stock: 8,
    sold: 214,
    isNew: true,
    isBestSeller: true,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600",
      "https://images.unsplash.com/photo-1580595999172-787970a962d9?w=600",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
      "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=600",
    ],
  },
  {
    name: "Sony Alpha ZV-E10",
    description:
      "Máy ảnh Mirrorless APS-C tối ưu cho vlogger với micro định hướng tích hợp, màn hình lật 180 độ.",
    price: 16990000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1580595999172-787970a962d9?w=600",
    brand: "Sony",
    category: "Mirrorless",
    stock: 25,
    sold: 89,
    isNew: true,
    isBestSeller: false,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1580595999172-787970a962d9?w=600",
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600",
    ],
  },
  {
    name: "Nikon Z50",
    description:
      "Máy ảnh Mirrorless APS-C 20.9MP nhỏ gọn, nhẹ nhàng với thiết kế ergonomic tuyệt vời.",
    price: 21990000,
    salePrice: 18990000,
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=600",
    brand: "Nikon",
    category: "Mirrorless",
    stock: 12,
    sold: 156,
    isNew: false,
    isBestSeller: true,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=600",
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=600",
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=600",
    ],
  },
  {
    name: "Nikon D7500",
    description:
      "Máy ảnh DSLR 20.9MP với thân máy chống thời tiết, quay video 4K và màn hình nghiêng tiện lợi.",
    price: 24990000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=600",
    brand: "Nikon",
    category: "DSLR",
    stock: 10,
    sold: 43,
    isNew: false,
    isBestSeller: false,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=600",
      "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=600",
    ],
  },
  {
    name: "Fujifilm X-T5",
    description:
      "Máy ảnh Mirrorless APS-C 40.2MP với thiết kế retro đầy cá tính, bộ xử lý màu sắc Film Simulation nổi tiếng.",
    price: 44990000,
    salePrice: 39990000,
    image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=600",
    brand: "Fujifilm",
    category: "Mirrorless",
    stock: 6,
    sold: 98,
    isNew: true,
    isBestSeller: true,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=600",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    ],
  },
  {
    name: "Fujifilm X100V",
    description:
      "Máy ảnh Compact cao cấp với ống kính cố định 23mm f/2, kính ngắm hybrid độc đáo và thiết kế retro.",
    price: 36990000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600",
    brand: "Fujifilm",
    category: "Compact",
    stock: 5,
    sold: 312,
    isNew: false,
    isBestSeller: true,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600",
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=600",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
    ],
  },
  {
    name: "Sony RX100 VII",
    description:
      "Máy ảnh Compact cao cấp với zoom 24-200mm, tốc độ lấy nét 0.02 giây siêu nhanh.",
    price: 28990000,
    salePrice: 25990000,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
    brand: "Sony",
    category: "Compact",
    stock: 10,
    sold: 67,
    isNew: false,
    isBestSeller: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
      "https://images.unsplash.com/photo-1580595999172-787970a962d9?w=600",
    ],
  },
  {
    name: "Canon PowerShot G7X III",
    description:
      "Máy ảnh Compact 20.1MP hỗ trợ quay 4K và live streaming trực tiếp lên YouTube.",
    price: 21990000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600",
    brand: "Canon",
    category: "Compact",
    stock: 18,
    sold: 201,
    isNew: true,
    isBestSeller: false,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=600",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600",
    ],
  },
  {
    name: "Túi máy ảnh Canvas",
    description:
      "Túi đựng máy ảnh chất liệu canvas cao cấp, chống nước, ngăn đệm bảo vệ thiết bị tối ưu.",
    price: 890000,
    salePrice: 690000,
    image: "https://images.unsplash.com/photo-1553438678-c0c56c8c8e9d?w=600",
    brand: "Khác",
    category: "Phụ kiện",
    stock: 50,
    sold: 445,
    isNew: false,
    isBestSeller: false,
    isSale: true,
    images: [
      "https://images.unsplash.com/photo-1553438678-c0c56c8c8e9d?w=600",
      "https://images.unsplash.com/photo-1583394293214-0d2e8b57a7a8?w=600",
    ],
  },
  {
    name: "Chân máy ảnh Tripod",
    description:
      "Chân máy ảnh nhôm hàng không cao cấp, tải trọng 5kg, chiều cao tối đa 165cm.",
    price: 1290000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1583394293214-0d2e8b57a7a8?w=600",
    brand: "Khác",
    category: "Phụ kiện",
    stock: 30,
    sold: 189,
    isNew: true,
    isBestSeller: false,
    isSale: false,
    images: [
      "https://images.unsplash.com/photo-1583394293214-0d2e8b57a7a8?w=600",
      "https://images.unsplash.com/photo-1553438678-c0c56c8c8e9d?w=600",
    ],
  },
];

const seedProducts = async () => {
  try {
    const count = await Product.count();
    if (count === 0) {
      for (const p of products) {
        const { images, ...productData } = p;
        const created = await Product.create(productData);
        const imageRecords = images.map((url, idx) => ({
          productId: created.id,
          url,
          order: idx,
        }));
        await ProductImage.bulkCreate(imageRecords);
      }
      console.log("Seeded products successfully!");
    }
  } catch (error) {
    console.error("Seed failed:", error.message);
  }
};

module.exports = seedProducts;