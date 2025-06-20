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
      ) : status.status === "Rejected" ? (
        <Badge variant="outline" className="text-red-400 border-red-400" >Rejected</Badge>
      ): (
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
      const [openConfirm, setOpenConfirm] = useState<boolean>(false);
      const [openReject, setOpenReject] = useState<boolean>(false);

      const handleDownload = () => {
        const token = localStorage.getItem("token");
        const link = document.createElement("a");
        link.href = `https://yudha.inovasisolusimuda.com/recurring-invoice/download/${invoice.invoice_number}?tkn=${token}`;
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
            `/recurring-invoice/send-email/${invoice.invoice_number}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

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

      const handlePaymentProof = async () => {
        toast.loading("Opening payment proof");
        try {
          const token = localStorage.getItem("token");
          const response = await apiCall.get(
            `/transaction/payment-proof/${invoice.invoice_number}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          window.open(response.data.data.payment_proof, "_blank");
        } catch (error:any) {
          console.log(error);
          toast.error("Failed to open payment proof",{
            description: error.response.data.error
          });
        } finally {
          toast.dismiss();
        }
      };

      const handleUpdateStatus = async (status: string) => {
        const toastId = toast.loading("Updating status");
        try {
          const token = localStorage.getItem("token");
          const response = await apiCall.patch(
            `/invoice/update-status/${invoice.invoice_number}`,
            { status },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          toast.success("Status updated",{
            id: toastId
          })

          setRefresh((prev) => !prev);
        } catch (error) {
          console.log(error);
        } 
      };

      const handleDetail = () => {
        const token = localStorage.getItem("token");
        window.open(
          `https://yudha.inovasisolusimuda.com/recurring-invoice/detail/${invoice.invoice_number}?tkn=${token}`,
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
                <DropdownMenuItem onClick={handlePaymentProof}>
                  Payment Proof
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setOpenConfirm(true)}
                  className="text-green-500"
                >
                  Confirm
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenReject(true)} className="text-red-500">
                  Reject
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
            {invoice.status === "Rejected" && (
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handlePaymentProof}>
                  Payment Proof
                </DropdownMenuItem>
               
              </DropdownMenuGroup>
            )}
            {invoice.status === "Paid" && (
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handlePaymentProof}>
                  Payment Proof
                </DropdownMenuItem>
               
              </DropdownMenuGroup>
            )}
            {invoice.status === "Confirmating" && <DropdownMenuSeparator />}
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
          <Dialog open={openConfirm || openReject} onOpenChange={setOpenConfirm || setOpenReject}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {openConfirm ? "Are you sure you want to confirm this invoice?" : "Are you sure you want to reject this invoice?"}
                </DialogTitle>
                <DialogDescription>
                  {openConfirm ? "Once you confirm this invoice, it cannot be undone." : "Once you reject this invoice, it cannot be undone."}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setOpenConfirm(false);
                    setOpenReject(false);
                  }}
                >
                  Cancel
                </Button>
                {openConfirm && (
                  <Button
                    onClick={() => {
                      handleUpdateStatus("Paid");
                      setOpenConfirm(false);
                    }}
                  >
                    Confirm
                  </Button>
                )}
                {openReject && (
                  <Button
                    onClick={() => {
                      handleUpdateStatus("Rejected");
                      setOpenReject(false);
                    }}
                  >
                    Reject
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenu>
      );
    },
  },
];
