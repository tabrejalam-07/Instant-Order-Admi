
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import OrderTable from '@/components/orders/OrderTable';
import { orders } from '@/data/mockData';

const Orders: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">Orders</h1>
        </div>
        <OrderTable orders={orders} />
      </div>
    </AdminLayout>
  );
};

export default Orders;
