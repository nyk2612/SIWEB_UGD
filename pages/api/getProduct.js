import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "public/data/products.json");

    // Periksa apakah file JSON ada
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File tidak ditemukan." });
    }

    try {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const products = JSON.parse(fileData);

      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ message: "Gagal membaca file.", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Metode ${req.method} tidak diizinkan.` });
  }
}