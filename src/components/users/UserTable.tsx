
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
import { MoreHorizontal, Eye, Ban, CheckCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  status: 'active' | 'banned';
  joinedAt: string;
}

interface UserTableProps {
  users: User[];
  onBanUser: (id: string) => void;
  onUnbanUser: (id: string) => void;
}

const formatIndianRupees = (value: number) => {
  return `₹${new Intl.NumberFormat('en-IN').format(value)}`;
};

const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  onBanUser, 
  onUnbanUser 
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>(users);

  React.useEffect(() => {
    setFilteredUsers(
      users.filter(user => {
        const matchesSearch = 
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = 
          statusFilter === "all" || 
          user.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
    );
  }, [searchTerm, statusFilter, users]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'banned':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Banned</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-purple-50 shadow-lg border-purple-100">
      <CardHeader className="pb-2 border-b border-purple-100">
        <CardTitle className="text-lg font-medium text-purple-800">Manage Users</CardTitle>
        <div className="mt-2 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-purple-200 focus:border-purple-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32 border-purple-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden rounded-b-lg">
          <Table>
            <TableHeader className="bg-purple-50">
              <TableRow>
                <TableHead className="text-purple-800">User</TableHead>
                <TableHead className="text-purple-800">Contact</TableHead>
                <TableHead className="text-purple-800">Orders</TableHead>
                <TableHead className="text-purple-800">Total Spent</TableHead>
                <TableHead className="text-purple-800">Status</TableHead>
                <TableHead className="text-purple-800">Joined</TableHead>
                <TableHead className="text-right text-purple-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-purple-50/50">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <div>{user.email}</div>
                    <div className="text-sm text-muted-foreground">{user.phone}</div>
                  </TableCell>
                  <TableCell>{user.orders}</TableCell>
                  <TableCell className="font-medium text-emerald-600">{formatIndianRupees(user.spent)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.joinedAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.location.href = `/users/${user.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        {user.status === 'active' ? (
                          <DropdownMenuItem onClick={() => onBanUser(user.id)}>
                            <Ban className="mr-2 h-4 w-4" />
                            <span>Ban User</span>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => onUnbanUser(user.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Unban User</span>
                          </DropdownMenuItem>
                        )}
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

export default UserTable;
