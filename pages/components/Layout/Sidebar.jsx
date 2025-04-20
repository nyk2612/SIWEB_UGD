import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-4 shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/admin">
            <a className="block p-2 hover:bg-gray-200 rounded">Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/menu">
            <a className="block p-2 hover:bg-gray-200 rounded">Menu Produk</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/histori">
            <a className="block p-2 hover:bg-gray-200 rounded">Histori Transaksi</a>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
