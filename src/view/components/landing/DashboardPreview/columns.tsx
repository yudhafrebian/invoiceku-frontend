"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type Invoice = {
  id: string;
  client_name: string;
  invoice_number: string;
  start_date: string;
  due_date: string;
  total: number;
  payment_method: string;
  status: string;
};

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoice_number",
    header: "Invoice Number",
  },
  {
    accessorKey: "client_name",
    header: "Client",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const price = row.original;
      return price.total.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      });
    },
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => {
      const formatPaymentMethod = (method: string) => {
        if (method === "QRIS") return "QRIS";
        return method
          .toLowerCase()
          .split("_")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ");
      };
      return formatPaymentMethod(row.getValue("payment_method"));
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original;
      return status.status === "Pending" ? (
        <Badge variant="outline" className="text-orange-400 border-orange-400">
          Pending
        </Badge>
      ) : status.status === "Overdue" ? (
        <Badge variant="destructive">Overdue</Badge>
      ) : status.status === "Confirmating" ? (
        <Badge variant="outline" className="text-blue-400 border-blue-400">
          Confirmating
        </Badge>
      ) : status.status === "Rejected" ? (
        <Badge variant="outline" className="text-red-400 border-red-400">
          Rejected
        </Badge>
      ) : (
        <Badge variant="outline" className="text-green-400 border-green-400">
          Paid
        </Badge>
      );
    },
  },
];
