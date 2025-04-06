
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, FileText } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export interface Order {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  restaurant: {
    id: string;
    name: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  amount: number;
  commission: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  date: string;
  createdAt: Date;
}

interface OrderTableProps {
  orders: Order[];
}

const formatIndianRupees = (value: number) => {
  return `₹${new Intl.NumberFormat('en-IN').format(value)}`;
};

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
  const [filteredOrders, setFilteredOrders] = React.useState<Order[]>(orders);

  React.useEffect(() => {
    setFilteredOrders(
      orders.filter(order => {
        // Search filter
        const matchesSearch = 
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Status filter
        const matchesStatus = 
          statusFilter === "all" || 
          order.status === statusFilter;
        
        // Date range filter
        let matchesDateRange = true;
        if (dateRange?.from) {
          const orderDate = new Date(order.createdAt);
          matchesDateRange = orderDate >= dateRange.from;
          
          if (dateRange.to) {
            matchesDateRange = matchesDateRange && orderDate <= dateRange.to;
          }
        }
        
        return matchesSearch && matchesStatus && matchesDateRange;
      })
    );
  }, [searchTerm, statusFilter, dateRange, orders]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-amber-50 shadow-lg border-amber-100">
      <CardHeader className="pb-2 border-b border-amber-100">
        <CardTitle className="text-lg font-medium text-amber-800">Manage Orders</CardTitle>
        <div className="mt-2 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-amber-200 focus:border-amber-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32 border-amber-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <DateRangePicker 
              date={dateRange} 
              onDateChange={setDateRange}
              className="border-amber-200"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden rounded-b-lg">
          <Table>
            <TableHeader className="bg-amber-50">
              <TableRow>
                <TableHead className="text-amber-800">Order ID</TableHead>
                <TableHead className="text-amber-800">Customer</TableHead>
                <TableHead className="text-amber-800">Restaurant</TableHead>
                <TableHead className="text-amber-800">Amount</TableHead>
                <TableHead className="text-amber-800">Commission</TableHead>
                <TableHead className="text-amber-800">Status</TableHead>
                <TableHead className="text-amber-800">Date</TableHead>
                <TableHead className="text-right text-amber-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-amber-50/50">
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{order.restaurant.name}</TableCell>
                  <TableCell className="font-medium text-emerald-600">{formatIndianRupees(order.amount)}</TableCell>
                  <TableCell className="font-medium text-purple-600">{formatIndianRupees(order.commission)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.location.href = `/orders/${order.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = `/orders/${order.id}/invoice`}>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>View Invoice</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTable;
