import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { katalogProduct, productsData } from '@/pages/service/data/products';
import Layout from '@/pages/components/Layout/Layout';
import { Button, Checkbox, Label, TextInput, Select, FileInput } from 'flowbite-react';
import { updateProduct } from '@/pages/service/product.service';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    product: '',
    katalog: '',
    stock: '',
    price: '',
  });

  useEffect(() => {
    const productId = router.query.id;
    if (productId) {
      const dataProduct = productsData.find((product) => product.id === productId);
      if (dataProduct) {
        setProduct(dataProduct);  // Set state to the product data
      }
    }
  }, [router.query.id]);

  const handleEditData = (e) => {
    e.preventDefault();

    const data = {
      id: router.query.id,
      product: e.target.product.value,
      katalog: e.target.katalog.value,
      stock: e.target.stock.value,
      price: e.target.price.value,
    };

    setIsLoading(true);

    const edit = updateProduct(data.id, data);

    if (edit) {
      alert('Produk berhasil diperbarui');
      router.push('/admin/products'); // Arahkan kembali ke daftar produk
    } else {
      alert('Terjadi kesalahan, produk tidak ditemukan!');
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold">Edit Data Produk</h2>
            <form className="flex flex-col gap-4 mt-4" onSubmit={handleEditData}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="katalog">Katalog</Label>
                </div>
                <Select
                  id="katalog"
                  name="katalog"
                  value={product.katalog}  // Ensure the value is bound to the product state
                  onChange={(e) => setProduct({ ...product, katalog: e.target.value })} // Update state on select change
                  required
                >
                  {katalogProduct.map((item) => (
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
                <TextInput
                  id="product"
                  type="text"
                  required
                  name="product"
                  value={product.product} // Bind the value to product state
                  onChange={(e) => setProduct({ ...product, product: e.target.value })} // Handle input changes
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price">Harga Satuan</Label>
                </div>
                <TextInput
                  id="price"
                  type="number"
                  required
                  name="price"
                  value={product.price} // Bind the value to product state
                  onChange={(e) => setProduct({ ...product, price: e.target.value })} // Handle input changes
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="stock">Jumlah Stok</Label>
                </div>
                <TextInput
                  id="stock"
                  type="number"
                  required
                  name="stock"
                  value={product.stock} // Bind the value to product state
                  onChange={(e) => setProduct({ ...product, stock: e.target.value })} // Handle input changes
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Edit'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
