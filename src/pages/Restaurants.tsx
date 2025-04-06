
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/layout/AdminLayout';
import RestaurantTable from '@/components/restaurants/RestaurantTable';
import { restaurants } from '@/data/mockData';

const Restaurants: React.FC = () => {
  const { toast } = useToast();
  const [restaurantList, setRestaurantList] = React.useState(restaurants);

  const handleApproveRestaurant = (id: string) => {
    setRestaurantList(
      restaurantList.map(restaurant => 
        restaurant.id === id ? { ...restaurant, status: 'active' } : restaurant
      )
    );
    toast({
      title: "Restaurant Approved",
      description: "The restaurant has been successfully approved.",
    });
  };

  const handleBanRestaurant = (id: string) => {
    setRestaurantList(
      restaurantList.map(restaurant => 
        restaurant.id === id ? { ...restaurant, status: 'suspended' } : restaurant
      )
    );
    toast({
      title: "Restaurant Banned",
      description: "The restaurant has been banned from the platform.",
      variant: "destructive",
    });
  };

  const handleDeleteRestaurant = (id: string) => {
    setRestaurantList(
      restaurantList.filter(restaurant => restaurant.id !== id)
    );
    toast({
      title: "Restaurant Deleted",
      description: "The restaurant has been successfully deleted.",
      variant: "destructive",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Restaurants</h1>
        </div>
        <RestaurantTable 
          restaurants={restaurantList}
          onApproveRestaurant={handleApproveRestaurant}
          onBanRestaurant={handleBanRestaurant}
          onDeleteRestaurant={handleDeleteRestaurant}
        />
      </div>
    </AdminLayout>
  );
};

export default Restaurants;
