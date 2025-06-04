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
import EditProductForm from "@/view/components/product/editProductForm";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
};

export const columns = (
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<Product>[] => [
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      const [open, setOpen] = useState(false);
      const [openDialog, setOpenDialog] = useState(false);

      const deleteProduct = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await apiCall.patch(
            `/product/delete-product/${product.id}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          toast.success("Product Deleted", {
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
                <DialogTitle>Edit Product Or Service</DialogTitle>
                <DialogDescription>
                  Update Your Product Or Service Details
                </DialogDescription>
              </DialogHeader>
              <EditProductForm
                onClose={() => setOpen(false)}
                params={{ id: product.id }}
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
                <DialogTitle>Delete Product Or Service</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {product.name}?
                </DialogDescription>
                <div className="flex justify-end gap-2">
                  <Button variant={"destructive"} onClick={deleteProduct}>
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
