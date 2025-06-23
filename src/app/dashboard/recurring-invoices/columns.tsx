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
      const [openDelete, setOpenDelete] = useState<boolean>(false);

      const handleDelete = async () => {
        const toastId = toast.loading("Deleting invoice");
        try {
          const token = localStorage.getItem("token");
          const response = await apiCall.patch(`/recurring-invoice/delete-recurring-invoice/${invoice.invoice_number}`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          toast.success("Invoice deleted",{
            id: toastId
          })

          setRefresh((prev) => !prev);
        } catch (error) {
          console.log(error)
        }
      }
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
              <DropdownMenuItem className="text-red-500" onClick={() => setOpenDelete(true)}>Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete this Recurring Invoice?</DialogTitle>
                <DialogDescription>
                  Once you delete this invoice, it cannot be undone and the remaining recurring invoice will be stopped.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setOpenDelete(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleDelete} variant={"destructive"}>Delete</Button>
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenu>
      );
    },
  },
];
