export default function Testimoni() {
    // Data testimoni dummy
    const testimonies = [
      { id: 1, customer: 'Budi', comment: 'Pelayanan yang sangat memuaskan!', image: '/assets/customer1.jpg' },
      { id: 2, customer: 'Siti', comment: 'Produk berkualitas dan harga bersahabat.', image: '/assets/customer2.jpg' }
    ];
  
    return (
      <section className="bg-white rounded-lg shadow p-8">
        <h2 className="text-3xl font-bold mb-6">Testimoni Pelanggan</h2>
        <div className="space-y-4">
          {testimonies.map((t) => (
            <div key={t.id} className="flex items-center space-x-4">
              <img src={t.image} alt={t.customer} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="italic">"{t.comment}"</p>
                <p className="font-semibold">- {t.customer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  