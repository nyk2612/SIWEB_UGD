import Sidebar from '../../components/Layout/Sidebar';
import ProductCRUD from '@pages/components/Dashboard/ProductCRUD';

export default function AdminMenu() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow p-6">
        <ProductCRUD />
      </main>
    </div>
  );
}
