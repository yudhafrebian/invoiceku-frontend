"use client";
import { ColumnDef } from "@tanstack/react-table";

export type InvoiceItem = {
    id: string;
    name_snapshot: string;
    quantity: number;
    price_snapshot: number;
    total: number;
  };
  
  export const columns: ColumnDef<InvoiceItem>[] = [
    {
      accessorKey: "name_snapshot",
      header: "Item Name",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "price_snapshot",
      header: "Price",
      cell: ({ row }) => {
        const item = row.original;
        return item.price_snapshot.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        });
      },
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        const item = row.original;
        return item.total.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        });
      },
    },
  ];
  
