"use client";
import { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
];
