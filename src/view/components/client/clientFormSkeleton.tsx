import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";


const ClientFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <div>
          <Skeleton className="h-8" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Email</Label>
        <div>
          <Skeleton className="h-8" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Phone</Label>
        <div>
          <Skeleton className="h-8" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Address</Label>
        <div>
          <Skeleton className="h-16" />
        </div>
      </div>

      

      <Skeleton className="h-8" />
    </div>
  );
};

export default ClientFormSkeleton;
