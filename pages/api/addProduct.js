import multer from "multer";
import path from "path";
import { productsData } from "../service/data/products";
import { addProduct } from "../service/product.service";

// Konfigurasi multer untuk menyimpan file di folder public/images
const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "public/images"), // Lokasi penyimpanan file
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nama file unik
  },
});

const upload = multer({ storage });

// Middleware untuk menangani upload file
export const config = {
  api: {
    bodyParser: false, // Nonaktifkan bodyParser bawaan Next.js
  },
};

export default function handler(req, res) {
  if (req.method === "POST") {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(500).json({ message: "Gagal mengunggah file", error: err.message });
      }

      const { id, product, katalog, stock, price } = req.body;
      const imageUrl = `/images/${req.file.filename}`; // URL gambar

      // Validasi data
      if (!id || !product || !katalog || !stock || !price) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
      }

      // Tambahkan produk baru ke array
      const newProduct = { id, product, katalog, stock: parseInt(stock), price: parseInt(price), image: imageUrl };

      return res.status(201).json({ message: "Produk berhasil ditambahkan!", product: newProduct });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Metode ${req.method} tidak diizinkan.` });
  }
}