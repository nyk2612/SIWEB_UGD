import { useRouter } from 'next/router';
import { productsData } from '@/pages/service/data/products';
import Layout from '../components/Layout/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
    const router = useRouter();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState("");

    useEffect(() => {
        const data = productsData.find((product) => product.id === router.query.id)
        setProduct(data);
        setTotal(data.price * quantity)
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser.name);
        }
    }, [router.query.id]);

    const addQty = () => {
        setQuantity(quantity + 1);
        setTotal(product.price * (quantity + 1))
    }

    const subQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setTotal(product.price * (quantity - 1))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: `#TRX-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '')}`,
            date: new Date().toLocaleDateString('id-ID'),
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            item: product.product,
            qty: quantity,
            customer: user, 
            amount: total,
            status: "Selesai",
        };
        // buatkan fungsi untuk menyimpan data transaksi
        
        router.push('/checkout');
    }

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <Link href="/katalog" className="italic text-blue-500">&#x21d0; Kembali</Link>
                        <h2 className="text-2xl font-bold">Checkout Produk</h2>
                        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2">
                            <div className="flex items-center">
                                <img src={`/${product.image}`} alt={product.product} className="w-sm h-full object-cover"/>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold">{product.product}</h3>
                                <p className="italic">{product.katalog}</p>
                                <p>{product.price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                                <div className="mt-4">
                                <form class="max-w-sm" >
                                    <label for="qty" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah :</label>
                                    <div className="flex gap-2 items-center">
                                        <button onClick={subQty} type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900">-</button>
                                        <input type="number" id="qty" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={quantity} required />
                                        <button onClick={addQty} type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900">+</button>
                                    </div>
                                    <div className="mt-4">
                                        <label for="totalPrice" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total harga :</label>
                                        <h3 className="text-xl font-bold">{total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h3>
                                        <input type="number" hidden id="totalPrice" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={total} required />
                                    </div>
                                    <button type="submit" class="w-full mt-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Beli</button>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}