
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RevenueData {
  name: string;
  revenue: number;
  orders: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

const formatIndianRupees = (value: number) => {
  return `₹${new Intl.NumberFormat('en-IN').format(value)}`;
};

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <Card className="bg-gradient-to-br from-white to-green-50 shadow-lg border-green-100">
      <CardHeader className="pb-2 border-b border-green-100">
        <CardTitle className="text-lg font-medium text-green-800">Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tickFormatter={(value) => formatIndianRupees(value)} 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                formatter={(value) => [formatIndianRupees(value as number), 'Revenue']} 
                labelFormatter={(label) => `${label}`}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(167, 243, 208, 0.5)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#059669"
                fill="rgba(5, 150, 105, 0.2)"
                activeDot={{ r: 8, fill: "#059669", stroke: "white", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
