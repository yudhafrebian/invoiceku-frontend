"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;
      return product.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      });
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex gap-2">
          <Button size={"icon"} variant={"outline"}>
            <Edit />
          </Button>
          <Button size={"icon"} variant={"destructive"}>
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
