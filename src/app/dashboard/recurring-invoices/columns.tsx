"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiCall } from "@/utils/apiHelper";
import EditClientForm from "@/view/components/client/editClientForm";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreVertical, Trash } from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type Invoice = {
  id: string;
  client: string;
  invoice_number: string;
  start_date: Date;
  total: number;
  payment_method: string;
  recurrence_type: string;
  recurrence_interval: number;
  duration: number;
  due_in_days: number;
};

export const columns = (
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<Invoice>[] => [
  {
    accessorKey: "invoice_number",
    header: "Invoice Number",
  },
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  
  {
    accessorKey: "recurrence_type",
    header: "Recurrence Type",
  },
  {
    accessorKey: "recurrence_interval",
    header: "Recurrence Interval",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "due_in_days",
    header: "Due In Days",
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
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <Link href={`/dashboard/recurring-invoices/${invoice.invoice_number}`}>
                <DropdownMenuItem>Detail</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
