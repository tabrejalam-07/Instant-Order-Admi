
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/layout/AdminLayout';
import UserTable from '@/components/users/UserTable';
import { users } from '@/data/mockData';

const Users: React.FC = () => {
  const { toast } = useToast();
  const [userList, setUserList] = React.useState(users);

  const handleBanUser = (id: string) => {
    setUserList(
      userList.map(user => 
        user.id === id ? { ...user, status: 'banned' } : user
      )
    );
    toast({
      title: "User Banned",
      description: "The user has been banned from the platform.",
      variant: "destructive",
    });
  };

  const handleUnbanUser = (id: string) => {
    setUserList(
      userList.map(user => 
        user.id === id ? { ...user, status: 'active' } : user
      )
    );
    toast({
      title: "User Unbanned",
      description: "The user has been unbanned and can now access the platform.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">Users</h1>
        </div>
        <UserTable 
          users={userList}
          onBanUser={handleBanUser}
          onUnbanUser={handleUnbanUser}
        />
      </div>
    </AdminLayout>
  );
};

export default Users;
