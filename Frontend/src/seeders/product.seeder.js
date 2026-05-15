const Product = require("../models/product.model");

const products = [
  // Canon DSLR
  {
    name: "Canon EOS 90D",
    description: "Máy ảnh DSLR 32.5MP, quay video 4K, AF nhanh",
    price: 32990000,
    salePrice: 28990000,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    image2: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSFu2ydmpAqSXGoMa2T61L1eN9GKEHORpVltXX23n6X6KH4ni1s9d1DEhuLhCtPnKRLP4_8HbBhAaG-pQtoeH65SHyHSPciSN_IqeMpPQigj3xWgI8t2RDks9npLKCDi7fs73cbCsxRJw&usqp=CAc", 
    brand: "Canon",
    category: "DSLR",
    stock: 15,
    isNew: false,
    isBestSeller: true,
    isSale: true,
  },
  {
    name: "Canon EOS 850D",
    description: "Máy ảnh DSLR 24.1MP, màn hình cảm ứng lật",
    price: 19990000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
    brand: "Canon",
    category: "DSLR",
    stock: 20,
    isNew: true,
    isBestSeller: false,
    isSale: false,
  },
  // Sony Mirrorless
  {
    name: "Sony Alpha A7 IV",
    description: "Máy ảnh Mirrorless full-frame 33MP, quay 4K 60fps",
    price: 65990000,
    salePrice: 59990000,
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400",
    brand: "Sony",
    category: "Mirrorless",
    stock: 8,
    isNew: true,
    isBestSeller: true,
    isSale: true,
  },
  {
    name: "Sony Alpha ZV-E10",
    description: "Máy ảnh Mirrorless APS-C, lý tưởng cho vlogger",
    price: 16990000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1580595999172-787970a962d9?w=400",
    brand: "Sony",
    category: "Mirrorless",
    stock: 25,
    isNew: true,
    isBestSeller: false,
    isSale: false,
  },
  // Nikon
  {
    name: "Nikon Z50",
    description: "Máy ảnh Mirrorless APS-C 20.9MP nhỏ gọn",
    price: 21990000,
    salePrice: 18990000,
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=400",
    brand: "Nikon",
    category: "Mirrorless",
    stock: 12,
    isNew: false,
    isBestSeller: true,
    isSale: true,
  },
  {
    name: "Nikon D7500",
    description: "Máy ảnh DSLR 20.9MP, chống nước, quay 4K",
    price: 24990000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400",
    brand: "Nikon",
    category: "DSLR",
    stock: 10,
    isNew: false,
    isBestSeller: false,
    isSale: false,
  },
  // Fujifilm
  {
    name: "Fujifilm X-T5",
    description: "Máy ảnh Mirrorless APS-C 40.2MP, thiết kế retro",
    price: 44990000,
    salePrice: 39990000,
    image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=400",
    brand: "Fujifilm",
    category: "Mirrorless",
    stock: 6,
    isNew: true,
    isBestSeller: true,
    isSale: true,
  },
  {
    name: "Fujifilm X100V",
    description: "Máy ảnh Compact cao cấp, ống kính cố định 23mm",
    price: 36990000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400",
    brand: "Fujifilm",
    category: "Compact",
    stock: 5,
    isNew: false,
    isBestSeller: true,
    isSale: false,
  },
  // Compact
  {
    name: "Sony RX100 VII",
    description: "Máy ảnh Compact cao cấp, zoom 24-200mm",
    price: 28990000,
    salePrice: 25990000,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    brand: "Sony",
    category: "Compact",
    stock: 10,
    isNew: false,
    isBestSeller: false,
    isSale: true,
  },
  {
    name: "Canon PowerShot G7X III",
    description: "Máy ảnh Compact 20.1MP, quay 4K, live streaming",
    price: 21990000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400",
    brand: "Canon",
    category: "Compact",
    stock: 18,
    isNew: true,
    isBestSeller: false,
    isSale: false,
  },
  // Phụ kiện
  {
    name: "Túi máy ảnh Canvas",
    description: "Túi đựng máy ảnh chất liệu canvas cao cấp, chống nước",
    price: 890000,
    salePrice: 690000,
    image: "https://images.unsplash.com/photo-1553438678-c0c56c8c8e9d?w=400",
    brand: "Khác",
    category: "Phụ kiện",
    stock: 50,
    isNew: false,
    isBestSeller: false,
    isSale: true,
  },
  {
    name: "Chân máy ảnh Tripod",
    description: "Chân máy ảnh nhôm cao cấp, tải trọng 5kg",
    price: 1290000,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1583394293214-0d2e8b57a7a8?w=400",
    brand: "Khác",
    category: "Phụ kiện",
    stock: 30,
    isNew: true,
    isBestSeller: false,
    isSale: false,
  },
];

const seedProducts = async () => {
  try {
    const count = await Product.count();
    if (count === 0) {
      await Product.bulkCreate(products);
      console.log("Seeded products successfully!");
    }
  } catch (error) {
    console.error("Seed failed:", error.message);
  }
};

module.exports = seedProducts;