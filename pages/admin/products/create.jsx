import Layout from "@/pages/components/Layout/Layout";
import { Button, Checkbox, Label, TextInput, Select, FileInput } from "flowbite-react";
import { katalogProduct } from "@/pages/service/data/products";
import { useState } from "react";
import { addProduct } from "@/pages/service/product.service";
import LoadingComponent from "@/pages/components/Layout/Loading";
import { useRouter } from 'next/router';

export default function CreateProduct() {
  const router = useRouter();
  const katalog = katalogProduct;
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');


  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUploadError("");
  
    try {
      // Generate UUID untuk ID produk
      const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
  
      // Buat FormData untuk mengirim data produk dan file
      const formData = new FormData();
      formData.append("id", uuid);
      formData.append("product", e.target.product.value);
      formData.append("katalog", e.target.katalog.value);
      formData.append("stock", e.target.stock.value);
      formData.append("price", e.target.price.value);
      formData.append("image", e.target.image.files[0]);
  
      const response = await fetch("/api/addProduct", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Gagal menyimpan produk");
      }
  
      const result = await response.json();
      if (result) {
        addProduct(result.product);
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("Error:", error);
      setUploadError(error.message);
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Layout>
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold">Tambah Data Produk</h2>
              <form className="flex flex-col gap-4 mt-4" onSubmit={handleAddProduct}>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="katalog">Katalog</Label>
                  </div>
                  <Select id="katalog" name="katalog" required>
                    {katalog.map((item) => (
                      <option key={item.id} value={item.nama} className="text-black">
                        {item.nama}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="product">Nama Produk</Label>
                  </div>
                  <TextInput id="product" type="text" required name="product" />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="price">Harga Satuan</Label>
                  </div>
                  <TextInput id="price" type="number" required name="price" />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="stock">Jumlah Stok</Label>
                  </div>
                  <TextInput id="stock" type="number" required name="stock" />
                </div>
                <div>
                  <Label className="mb-2 block" htmlFor="image">
                    Upload file
                  </Label>
                  <FileInput id="image" />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Simpan'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}