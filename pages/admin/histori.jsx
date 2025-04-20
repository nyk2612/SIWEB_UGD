import Sidebar from '../../components/Layout/Sidebar';
import HistoriTransaksi from '../../components/Dashboard/HistoriTransaksi';

export default function AdminHistori() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow p-6">
        <HistoriTransaksi />
      </main>
    </div>
  );
}
