
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { MoreHorizontal, Eye, Edit, Trash, Ban, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";

export interface Restaurant {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  orders: number;
  revenue: number;
  status: 'active' | 'pending' | 'suspended';
  joinedAt: string;
}

interface RestaurantTableProps {
  restaurants: Restaurant[];
  onApproveRestaurant: (id: string) => void;
  onBanRestaurant: (id: string) => void;
  onDeleteRestaurant: (id: string) => void;
}

const formatIndianRupees = (value: number) => {
  return `₹${new Intl.NumberFormat('en-IN').format(value)}`;
};

const RestaurantTable: React.FC<RestaurantTableProps> = ({ 
  restaurants, 
  onApproveRestaurant, 
  onBanRestaurant, 
  onDeleteRestaurant 
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredRestaurants, setFilteredRestaurants] = React.useState<Restaurant[]>(restaurants);

  React.useEffect(() => {
    setFilteredRestaurants(
      restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, restaurants]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-blue-50 shadow-lg border-blue-100">
      <CardHeader className="pb-2 border-b border-blue-100">
        <CardTitle className="text-lg font-medium text-blue-800">Manage Restaurants</CardTitle>
        <div className="mt-2 flex items-center justify-between">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-blue-200 focus:border-blue-500"
            />
          </div>
          <Button onClick={() => navigate('/restaurants/add')} className="bg-blue-600 hover:bg-blue-700">Add Restaurant</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden rounded-b-lg">
          <Table>
            <TableHeader className="bg-blue-50">
              <TableRow>
                <TableHead className="text-blue-800">Restaurant</TableHead>
                <TableHead className="text-blue-800">Owner</TableHead>
                <TableHead className="text-blue-800">Contact</TableHead>
                <TableHead className="text-blue-800">Orders</TableHead>
                <TableHead className="text-blue-800">Revenue</TableHead>
                <TableHead className="text-blue-800">Status</TableHead>
                <TableHead className="text-blue-800">Joined</TableHead>
                <TableHead className="text-right text-blue-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRestaurants.map((restaurant) => (
                <TableRow key={restaurant.id} className="hover:bg-blue-50/50">
                  <TableCell className="font-medium">{restaurant.name}</TableCell>
                  <TableCell>{restaurant.owner}</TableCell>
                  <TableCell>
                    <div>{restaurant.email}</div>
                    <div className="text-sm text-muted-foreground">{restaurant.phone}</div>
                  </TableCell>
                  <TableCell>{restaurant.orders}</TableCell>
                  <TableCell className="font-medium text-emerald-600">{formatIndianRupees(restaurant.revenue)}</TableCell>
                  <TableCell>{getStatusBadge(restaurant.status)}</TableCell>
                  <TableCell>{restaurant.joinedAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/restaurants/edit/${restaurant.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        {restaurant.status === 'pending' && (
                          <DropdownMenuItem onClick={() => onApproveRestaurant(restaurant.id)}>
                            <Check className="mr-2 h-4 w-4" />
                            <span>Approve</span>
                          </DropdownMenuItem>
                        )}
                        {restaurant.status !== 'suspended' && (
                          <DropdownMenuItem onClick={() => onBanRestaurant(restaurant.id)}>
                            <Ban className="mr-2 h-4 w-4" />
                            <span>Ban</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => onDeleteRestaurant(restaurant.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
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

export default RestaurantTable;
