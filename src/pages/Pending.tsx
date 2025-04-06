
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';

const Pending: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Coming Soon</h1>
        <p className="text-xl text-muted-foreground max-w-md mb-8">
          This feature is currently under development and will be available soon.
        </p>
        <Button onClick={() => navigate(-1)} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </AdminLayout>
  );
};

export default Pending;
