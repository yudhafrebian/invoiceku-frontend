import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";

interface IPRoductFormSkeletonProps {}

const ProductFormSkeleton: React.FunctionComponent<
  IPRoductFormSkeletonProps
> = (props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <div>
          <Skeleton className="h-8" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <div>
          <Skeleton className="h-8" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price</Label>
        <div>
          <Skeleton className="h-8" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="md:w-1/2 flex flex-col gap-2">
          <Label htmlFor="type">Type</Label>
          <Skeleton className="h-8" />
        </div>
        <div className="md:w-1/2 flex flex-col gap-2">
          <Label htmlFor="unit">Unit</Label>
          <Skeleton className="h-8" />
        </div>
      </div>

      <Skeleton className="h-8" />
    </div>
  );
};

export default ProductFormSkeleton;
