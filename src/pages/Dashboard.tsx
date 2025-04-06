
import React from 'react';
import { 
  Users, 
  Store, 
  ShoppingBag, 
  DollarSign
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import OrdersChart from '@/components/dashboard/OrdersChart';
import TopRestaurants from '@/components/dashboard/TopRestaurants';
import RecentOrders from '@/components/dashboard/RecentOrders';
import { revenueData, ordersData, topRestaurants, recentOrders } from '@/data/mockData';

// Define the proper types to match the component expectations
interface Restaurant {
  id: string;
  name: string;
  orders: number;
  revenue: number;
  status: 'active' | 'pending' | 'suspended';
}

interface Order {
  id: string;
  customer: string;
  restaurant: string;
  amount: number;
  status: 'completed' | 'processing' | 'cancelled';
  date: string;
}

// Function to format currency in Indian Rupees
const formatIndianRupees = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const Dashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value="1,286"
            description="120 new users this month"
            icon={<Users className="h-6 w-6 text-primary" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Total Restaurants"
            value="43"
            description="5 pending approvals"
            icon={<Store className="h-6 w-6 text-primary" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Total Orders"
            value="8,521"
            description="1,200 orders this month"
            icon={<ShoppingBag className="h-6 w-6 text-primary" />}
            trend={{ value: 3, isPositive: false }}
          />
          <StatsCard
            title="Total Revenue"
            value={formatIndianRupees(154329)}
            description={`${formatIndianRupees(24500)} this month`}
            icon={<DollarSign className="h-6 w-6 text-primary" />}
            trend={{ value: 18, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={revenueData} />
          <OrdersChart data={ordersData} />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <TopRestaurants restaurants={topRestaurants as Restaurant[]} />
          <RecentOrders orders={recentOrders as Order[]} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
