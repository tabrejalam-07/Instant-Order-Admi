
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, BarChart2 } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import StatsCard from '@/components/dashboard/StatsCard';

const earningsData = [
  { month: 'Jan', earnings: 12500 },
  { month: 'Feb', earnings: 14800 },
  { month: 'Mar', earnings: 16200 },
  { month: 'Apr', earnings: 18900 },
  { month: 'May', earnings: 17500 },
  { month: 'Jun', earnings: 19600 },
];

const transactionsData = [
  { id: '1', restaurant: 'Burger Palace', amount: 1250.45, type: 'Commission', date: '2025-04-01' },
  { id: '2', restaurant: 'Pizza Haven', amount: 980.20, type: 'Commission', date: '2025-04-02' },
  { id: '3', restaurant: 'Sushi World', amount: 1520.75, type: 'Commission', date: '2025-04-03' },
  { id: '4', restaurant: 'Taco Time', amount: 640.30, type: 'Commission', date: '2025-04-03' },
  { id: '5', restaurant: 'China Express', amount: 890.50, type: 'Commission', date: '2025-04-04' },
];

const Earnings: React.FC = () => {
  // Function to format currency in Indian Rupees
  const formatIndianRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Earnings Dashboard
          </h1>
          <div className="flex items-center gap-2 bg-indigo-50 p-2 rounded-md">
            <BarChart2 className="h-5 w-5 text-indigo-500" />
            <span className="text-sm font-medium text-indigo-700">Financial Overview</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Earnings"
            value={formatIndianRupees(154329.75)}
            description="+18% from last month"
            icon={<DollarSign className="h-6 w-6 text-green-500" />}
            trend={{ value: 18, isPositive: true }}
            className="bg-gradient-to-br from-green-50 to-emerald-100 border-emerald-200"
          />
          <StatsCard
            title="Commissions"
            value={formatIndianRupees(42891.20)}
            description="From 43 restaurants"
            icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
            trend={{ value: 12, isPositive: true }}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 border-indigo-200"
          />
          <StatsCard
            title="Refunds"
            value={formatIndianRupees(2450.30)}
            description="3% of total orders"
            icon={<TrendingDown className="h-6 w-6 text-red-500" />}
            trend={{ value: 5, isPositive: false }}
            className="bg-gradient-to-br from-red-50 to-rose-100 border-rose-200"
          />
          <StatsCard
            title="Pending Payouts"
            value={formatIndianRupees(12780.45)}
            description="To 12 restaurants"
            icon={<CreditCard className="h-6 w-6 text-purple-500" />}
            trend={{ value: 8, isPositive: true }}
            className="bg-gradient-to-br from-purple-50 to-fuchsia-100 border-fuchsia-200"
          />
        </div>
        
        <Card className="overflow-hidden border-indigo-200">
          <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="text-lg font-medium text-indigo-800">Monthly Earnings</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80 mt-4">
              <ChartContainer
                config={{
                  earnings: {
                    label: "Earnings",
                    color: "#8b5cf6",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${value}`} />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                    />
                    <Bar
                      dataKey="earnings"
                      name="earnings"
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-blue-200">
          <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="text-lg font-medium text-blue-800">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-blue-50">
                <TableRow>
                  <TableHead className="text-blue-700">ID</TableHead>
                  <TableHead className="text-blue-700">Restaurant</TableHead>
                  <TableHead className="text-blue-700">Amount</TableHead>
                  <TableHead className="text-blue-700">Type</TableHead>
                  <TableHead className="text-blue-700">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionsData.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-blue-50/50">
                    <TableCell className="font-medium text-blue-700">#{transaction.id}</TableCell>
                    <TableCell>{transaction.restaurant}</TableCell>
                    <TableCell className="text-emerald-600 font-medium">{formatIndianRupees(transaction.amount)}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                        {transaction.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-500">{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Earnings;
