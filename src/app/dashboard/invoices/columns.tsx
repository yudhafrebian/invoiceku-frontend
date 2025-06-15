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
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type Invoice = {
  id: string;
  client: string;
  invoice_number: string;
  start_date: Date;
  due_date: Date;
  total: number;
  payment_method: string;
  status: string;
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
      ) : (
        <Badge variant="outline" className="text-green-400 border-green-400">
          Paid
        </Badge>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const invoice = row.original;
      const [loading, setLoading] = useState<boolean>(false);

      const handleDownload = () => {
        const token = localStorage.getItem("token");
        const link = document.createElement("a");
        link.href = `http://localhost:4000/invoice/download/${invoice.id}?tkn=${token}`;
        link.setAttribute("download", `invoice-${invoice.invoice_number}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      const handleSendEmail = async () => {
        const toastId = toast.loading("Sending email...");
        setLoading(true);

        try {
          const token = localStorage.getItem("token");

          const response = await apiCall.post(
            `/invoice/send-email-payment/${invoice.invoice_number}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response.data);

          toast.success("Email sent successfully", {
            id: toastId,
          });
        } catch (error) {
          console.error(error);
          toast.error("Failed to send email", {
            id: toastId,
          });
        } finally {
          setLoading(false);
        }
      };

      const handleDetail = () => {
        const token = localStorage.getItem("token");
        window.open(
          `http://localhost:4000/invoice/detail/${invoice.invoice_number}?tkn=${token}`,
          "_blank"
        );
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {invoice.status === "Confirmating" && (
              <DropdownMenuGroup>
                <DropdownMenuItem>Payment Proof</DropdownMenuItem>
                <DropdownMenuItem className="text-green-500">Confirm</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Reject</DropdownMenuItem>
              </DropdownMenuGroup>
            )}
            {
              invoice.status === "Confirmating" && (
                <DropdownMenuSeparator />
              )
            }
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleDetail}>Detail</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>
                Download Invoice
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSendEmail}>
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
