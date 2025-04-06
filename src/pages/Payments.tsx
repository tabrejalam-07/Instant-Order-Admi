
import React, { useState } from 'react';
import { CreditCard, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define types
type PaymentStatus = 'pending' | 'completed' | 'failed';
type PaymentMethod = 'stripe' | 'paypal' | 'bank_transfer';

interface Payment {
  id: string;
  restaurant: string;
  amount: number;
  status: PaymentStatus;
  date: string;
  method: PaymentMethod;
}

// Sample payment data - fixed to match the PaymentStatus type
const initialPayments: Payment[] = [
  { id: '1', restaurant: 'Burger Palace', amount: 3250.45, status: 'pending', date: '2025-04-05', method: 'bank_transfer' },
  { id: '2', restaurant: 'Pizza Haven', amount: 2980.20, status: 'completed', date: '2025-04-03', method: 'paypal' },
  { id: '3', restaurant: 'Sushi World', amount: 4520.75, status: 'pending', date: '2025-04-05', method: 'stripe' },
  { id: '4', restaurant: 'Taco Time', amount: 1640.30, status: 'completed', date: '2025-04-02', method: 'paypal' },
  { id: '5', restaurant: 'China Express', amount: 2890.50, status: 'failed', date: '2025-04-01', method: 'bank_transfer' },
  { id: '6', restaurant: 'Indian Spice', amount: 3780.90, status: 'completed', date: '2025-03-30', method: 'stripe' },
];

const Payments: React.FC = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [stripeApiKey, setStripeApiKey] = useState('sk_test_*****************');
  const [paypalClientId, setPaypalClientId] = useState('client_id_*****************');
  const [bankAccountName, setBankAccountName] = useState('FoodHub Inc.');
  const [bankAccountNumber, setBankAccountNumber] = useState('************1234');

  // Function to format currency in Indian Rupees
  const formatIndianRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
      default:
        return null;
    }
  };

  const getMethodLabel = (method: PaymentMethod) => {
    switch(method) {
      case 'stripe':
        return 'Stripe';
      case 'paypal':
        return 'PayPal';
      case 'bank_transfer':
        return 'Bank Transfer';
      default:
        return method;
    }
  };

  const handleApprovePayment = (id: string) => {
    setPayments(
      payments.map(payment => 
        payment.id === id ? { ...payment, status: 'completed', date: new Date().toISOString().split('T')[0] } : payment
      )
    );
    
    toast({
      title: "Payment Approved",
      description: "The payment has been approved and marked as completed.",
    });
  };

  const handleRejectPayment = (id: string) => {
    setPayments(
      payments.map(payment => 
        payment.id === id ? { ...payment, status: 'failed', date: new Date().toISOString().split('T')[0] } : payment
      )
    );
    
    toast({
      title: "Payment Rejected",
      description: "The payment has been rejected and marked as failed.",
      variant: "destructive",
    });
  };

  const handleSavePaymentSettings = () => {
    toast({
      title: "Payment Settings Saved",
      description: "Your payment gateway settings have been updated successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Payments</h1>
        
        <Tabs defaultValue="payments">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Gateway Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="payments" className="space-y-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Payment Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Restaurant</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">#{payment.id}</TableCell>
                        <TableCell>{payment.restaurant}</TableCell>
                        <TableCell>{formatIndianRupees(payment.amount)}</TableCell>
                        <TableCell>{getMethodLabel(payment.method)}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {payment.status === 'pending' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => handleApprovePayment(payment.id)}
                                  title="Approve Payment"
                                >
                                  <Check className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => handleRejectPayment(payment.id)}
                                  title="Reject Payment"
                                >
                                  <X className="h-4 w-4 text-red-600" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Payment Gateway Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Default Payment Method</h3>
                    <Select defaultValue="stripe">
                      <SelectTrigger className="w-full max-w-sm">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Stripe Configuration</h3>
                    <div className="grid gap-4 max-w-lg">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="stripe-api-key" className="text-sm font-medium col-span-1">
                          API Key
                        </label>
                        <Input
                          id="stripe-api-key"
                          value={stripeApiKey}
                          onChange={(e) => setStripeApiKey(e.target.value)}
                          className="col-span-3"
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">PayPal Configuration</h3>
                    <div className="grid gap-4 max-w-lg">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="paypal-client-id" className="text-sm font-medium col-span-1">
                          Client ID
                        </label>
                        <Input
                          id="paypal-client-id"
                          value={paypalClientId}
                          onChange={(e) => setPaypalClientId(e.target.value)}
                          className="col-span-3"
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Bank Transfer Details</h3>
                    <div className="grid gap-4 max-w-lg">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="bank-name" className="text-sm font-medium col-span-1">
                          Account Name
                        </label>
                        <Input
                          id="bank-name"
                          value={bankAccountName}
                          onChange={(e) => setBankAccountName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="bank-account" className="text-sm font-medium col-span-1">
                          Account Number
                        </label>
                        <Input
                          id="bank-account"
                          value={bankAccountNumber}
                          onChange={(e) => setBankAccountNumber(e.target.value)}
                          className="col-span-3"
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleSavePaymentSettings}>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Payments;
