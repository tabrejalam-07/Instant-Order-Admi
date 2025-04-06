
import React, { useState } from 'react';
import { Percent, Settings, BadgePercent, BadgeDollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Sample commission data
const initialCommissionData = [
  { id: '1', restaurant: 'Burger Palace', rate: 15, earnings: 5250.45, lastUpdated: '2025-03-15' },
  { id: '2', restaurant: 'Pizza Haven', rate: 12, earnings: 3980.20, lastUpdated: '2025-03-18' },
  { id: '3', restaurant: 'Sushi World', rate: 18, earnings: 7520.75, lastUpdated: '2025-03-20' },
  { id: '4', restaurant: 'Taco Time', rate: 10, earnings: 2640.30, lastUpdated: '2025-03-22' },
  { id: '5', restaurant: 'China Express', rate: 15, earnings: 4890.50, lastUpdated: '2025-03-25' },
  { id: '6', restaurant: 'Indian Spice', rate: 18, earnings: 6780.90, lastUpdated: '2025-03-28' },
  { id: '7', restaurant: 'Mediterranean Delight', rate: 20, earnings: 8950.30, lastUpdated: '2025-03-30' },
  { id: '8', restaurant: 'Thai Cuisine', rate: 15, earnings: 4560.25, lastUpdated: '2025-04-01' },
];

const Commissions: React.FC = () => {
  const { toast } = useToast();
  const [commissionData, setCommissionData] = useState(initialCommissionData);
  const [globalRate, setGlobalRate] = useState(15);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRate, setEditRate] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Function to format currency in Indian Rupees
  const formatIndianRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleEditCommission = (id: string, currentRate: number) => {
    setEditingId(id);
    setEditRate(currentRate);
    setDialogOpen(true);
  };

  const handleSaveCommission = () => {
    if (editingId) {
      setCommissionData(
        commissionData.map(item => 
          item.id === editingId ? { ...item, rate: editRate, lastUpdated: new Date().toISOString().split('T')[0] } : item
        )
      );
      
      toast({
        title: "Commission Rate Updated",
        description: `The commission rate has been updated successfully.`,
      });
      
      setDialogOpen(false);
      setEditingId(null);
    }
  };

  const handleUpdateGlobalRate = () => {
    setCommissionData(
      commissionData.map(item => ({ ...item, rate: globalRate, lastUpdated: new Date().toISOString().split('T')[0] }))
    );
    
    toast({
      title: "Global Commission Rate Updated",
      description: `All commission rates have been set to ${globalRate}%.`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Commission Settings
          </h1>
          <div className="flex items-center gap-2 bg-amber-50 p-2 rounded-md">
            <Settings className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-700">Rate Configuration</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-amber-200 overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-amber-50 to-orange-50">
              <CardTitle className="text-lg font-medium text-amber-800">
                <div className="flex items-center gap-2">
                  <BadgePercent className="h-5 w-5 text-amber-600" />
                  <span>Global Commission Rate</span>
                </div>
              </CardTitle>
              <CardDescription className="text-amber-700">
                Set a standard commission rate for all restaurants
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-end gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="globalRate" className="text-amber-800">Global Rate (%)</Label>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      id="globalRate"
                      type="number"
                      min={0}
                      max={100}
                      value={globalRate}
                      onChange={(e) => setGlobalRate(Number(e.target.value))}
                      className="border-amber-200 focus-visible:ring-amber-500"
                    />
                    <Percent className="h-4 w-4 text-amber-500" />
                  </div>
                </div>
                <Button 
                  onClick={handleUpdateGlobalRate}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  Update All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="text-lg font-medium text-orange-800">
                <div className="flex items-center gap-2">
                  <BadgeDollarSign className="h-5 w-5 text-orange-600" />
                  <span>Commission Summary</span>
                </div>
              </CardTitle>
              <CardDescription className="text-orange-700">
                Overview of commission earnings
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-4 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-700 mb-1">Average Rate</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {(commissionData.reduce((acc, item) => acc + item.rate, 0) / commissionData.length).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-rose-100 p-4 rounded-lg border border-red-200">
                  <p className="text-sm text-red-700 mb-1">Total Commission</p>
                  <p className="text-2xl font-bold text-red-800">
                    {formatIndianRupees(commissionData.reduce((acc, item) => acc + item.earnings, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-red-200 overflow-hidden">
          <CardHeader className="pb-2 bg-gradient-to-r from-red-50 to-rose-50">
            <CardTitle className="text-lg font-medium text-red-800">Restaurant Commission Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-red-50">
                <TableRow>
                  <TableHead className="text-red-700">Restaurant</TableHead>
                  <TableHead className="text-red-700">Commission Rate</TableHead>
                  <TableHead className="text-red-700">Total Earnings</TableHead>
                  <TableHead className="text-red-700">Last Updated</TableHead>
                  <TableHead className="text-red-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissionData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-red-50/50">
                    <TableCell className="font-medium">{item.restaurant}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        {item.rate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-emerald-600 font-medium">{formatIndianRupees(item.earnings)}</TableCell>
                    <TableCell className="text-slate-500">{item.lastUpdated}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditCommission(item.id, item.rate)}
                        className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="border-amber-200">
            <DialogHeader className="bg-gradient-to-r from-amber-50 to-orange-50 -mx-6 -mt-6 px-6 py-4 rounded-t-lg">
              <DialogTitle className="text-amber-800">Edit Commission Rate</DialogTitle>
              <DialogDescription className="text-amber-700">
                Update the commission rate for this restaurant.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rate" className="text-right text-amber-800">
                  Rate (%)
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Input
                    id="rate"
                    type="number"
                    min={0}
                    max={100}
                    value={editRate}
                    onChange={(e) => setEditRate(Number(e.target.value))}
                    className="col-span-2 border-amber-200 focus-visible:ring-amber-500"
                  />
                  <Percent className="h-4 w-4 text-amber-500" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDialogOpen(false)}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveCommission}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Commissions;
