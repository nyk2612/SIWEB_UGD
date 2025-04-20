import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
// import Link from 'next/link';
import productsData from "@/pages/service/data/products";

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(productsData);
    }, [])
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>
                    <a href="#" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Tambah Produk
                    </a>
                    <div className="overflow-x-auto mt-8">
                        <Table striped>
                            <TableHead>
                                <TableHeadCell>Nama Produk</TableHeadCell>
                                <TableHeadCell>Jumlah Stok</TableHeadCell>
                                <TableHeadCell>Katalog</TableHeadCell>
                                <TableHeadCell>Harga</TableHeadCell>
                                <TableHeadCell>Aksi</TableHeadCell>
                            </TableHead>
                            <TableBody className="divide-y">
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Apple MacBook Pro 17"
                                    </TableCell>
                                    <TableCell>Sliver</TableCell>
                                    <TableCell>Laptop</TableCell>
                                    <TableCell>$2999</TableCell>
                                    <TableCell>
                                        <a href="#"
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Edit
                                        </a>
                                        <a href="#"
                                            className="ml-4 font-medium text-red-600 hover:underline dark:text-cyan-500">
                                            Hapus
                                        </a>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}