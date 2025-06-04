"use client";

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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiCall } from "@/utils/apiHelper";
import EditClientForm from "@/view/components/client/editClientForm";
import EditProductForm from "@/view/components/product/editProductForm";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  payment_ref: string;
};

export const columns = (
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<Client>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "payment_ref",
    header: "Payment Ref",
    cell: ({ row }) => {
      const formatPaymentMethod = (method: string) => {
        if(method === "QRIS") return "QRIS";
        return method
          .toLowerCase()
          .split("_")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ");
      };
      return formatPaymentMethod(row.getValue("payment_ref"));
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const client = row.original;
      const [open, setOpen] = useState(false);
      const [openDialog, setOpenDialog] = useState(false);

      const deleteClient = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await apiCall.patch(
            `/client/delete-client/${client.id}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          toast.success("Client Deleted", {
            description: response.data.message,
          });

          setOpenDialog(false);
          setRefresh((prev) => !prev);
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <div className="flex gap-2">
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button size={"icon"} variant={"outline"}>
                    <Edit />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Client</DialogTitle>
                <DialogDescription>
                  Update Your Client Information
                </DialogDescription>
              </DialogHeader>
              <EditClientForm
                onClose={() => setOpen(false)}
                params={{ id: client.id }}
                onSuccess={() => setRefresh((prev) => !prev)}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button size={"icon"} variant={"destructive"}>
                    <Trash />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Client</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {client.name}?
                </DialogDescription>
                <div className="flex justify-end gap-2">
                  <Button variant={"destructive"} onClick={deleteClient}>
                    Delete
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
