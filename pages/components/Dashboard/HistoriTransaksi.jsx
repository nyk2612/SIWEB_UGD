export default function HistoriTransaksi() {
    // Dummy data untuk histori transaksi
    const histori = [
      { id: 1, detail: 'Transaksi #1', date: '2025-01-01' },
      { id: 2, detail: 'Transaksi #2', date: '2025-01-02' }
    ];
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Histori Transaksi</h2>
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Detail</th>
              <th className="px-4 py-2 border">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {histori.map(item => (
              <tr key={item.id}>
                <td className="px-4 py-2 border text-center">{item.id}</td>
                <td className="px-4 py-2 border">{item.detail}</td>
                <td className="px-4 py-2 border text-center">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  