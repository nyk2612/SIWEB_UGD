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
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadError, setUploadError] = useState('');

  // Untuk preview gambar (opsional)
  const handleFileChange = (e) => {
    setUploadError(''); // Reset error saat file baru dipilih
    const file = e.target.files[0];
    
    if (file) {
      console.log("File selected:", {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      });
      
      setPhoto(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUploadError('');
    
    try {
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        const data = {
            id: uuid,
            product: e.target.product.value,
            katalog: e.target.katalog.value,
            stock: e.target.stock.value,
            price: e.target.price.value,
        };
        const result = await addProduct(data);
      
        if (result) {
            router.push('/admin/products');
        } else {
            throw new Error('Gagal menyimpan produk');
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
              {uploadError && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                  <span className="font-medium">Error!</span> {uploadError}
                </div>
              )}
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