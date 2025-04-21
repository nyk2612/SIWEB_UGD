import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { productsData } from "@/pages/service/data/products";

export default function Products() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>
                    <Link href="/admin/products/create"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Tambah Produk
                    </Link>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nama Produk
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Katalog
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Stok
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Harga
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { productsData.map((product) => (
                                    <tr
                                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                        <th scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.product}
                                        </th>
                                        <td class="px-6 py-4">
                                            {product.katalog}
                                        </td>
                                        <td class="px-6 py-4">
                                            {product.stock}
                                        </td>
                                        <td class="px-6 py-4">
                                            Rp. {product.price}
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="#"class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            <a href="#"class="ml-4 font-medium text-red-600 dark:text-red-500 hover:underline">Hapus</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}