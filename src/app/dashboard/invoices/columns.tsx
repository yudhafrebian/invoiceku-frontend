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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiCall } from "@/utils/apiHelper";
import EditClientForm from "@/view/components/client/editClientForm";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
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
    cell: ({row}) => {
      const price = row.original
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
      return (
        status.status === "Pending" ? (
          <Badge variant="outline" className="text-orange-400 border-orange-400">Pending</Badge>
        ) : status.status === "Overdue" ? (
          <Badge variant="destructive">Overdue</Badge>
        ) : (
          <Badge className="text-green-400 border-green-400">Paid</Badge>
        )
      )
    }
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const client = row.original;
  //     const [open, setOpen] = useState(false);
  //     const [openDialog, setOpenDialog] = useState(false);

  //     const deleteClient = async () => {
  //       const token = localStorage.getItem("token");
  //       try {
  //         const response = await apiCall.patch(
  //           `/client/delete-client/${client.id}`,
  //           null,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         toast.success("Client Deleted", {
  //           description: response.data.message,
  //         });

  //         setOpenDialog(false);
  //         setRefresh((prev) => !prev);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     return (
  //       <div className="flex gap-2">
  //         <Dialog>
  //           <Tooltip>
  //             <TooltipTrigger asChild>
  //               <DialogTrigger asChild>
  //                 <Button size={"icon"} variant={"outline"}>
  //                   <Edit />
  //                 </Button>
  //               </DialogTrigger>
  //             </TooltipTrigger>
  //             <TooltipContent>
  //               <p>Edit</p>
  //             </TooltipContent>
  //           </Tooltip>
  //           <DialogContent>
  //             <DialogHeader>
  //               <DialogTitle>Edit Client</DialogTitle>
  //               <DialogDescription>
  //                 Update Your Client Information
  //               </DialogDescription>
  //             </DialogHeader>
  //             <EditClientForm
  //               onClose={() => setOpen(false)}
  //               params={{ id: client.id }}
  //               onSuccess={() => setRefresh((prev) => !prev)}
  //             />
  //           </DialogContent>
  //         </Dialog>
  //         <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  //           <Tooltip>
  //             <TooltipTrigger asChild>
  //               <DialogTrigger asChild>
  //                 <Button size={"icon"} variant={"destructive"}>
  //                   <Trash />
  //                 </Button>
  //               </DialogTrigger>
  //             </TooltipTrigger>
  //             <TooltipContent>
  //               <p>Delete</p>
  //             </TooltipContent>
  //           </Tooltip>
  //           <DialogContent>
  //             <DialogHeader>
  //               <DialogTitle>Delete Client</DialogTitle>
  //               <DialogDescription>
  //                 Are you sure you want to delete?
  //               </DialogDescription>
  //               <div className="flex justify-end gap-2">
  //                 <Button variant={"destructive"} onClick={deleteClient}>
  //                   Delete
  //                 </Button>
  //                 <Button
  //                   variant={"outline"}
  //                   onClick={() => setOpenDialog(false)}
  //                 >
  //                   Cancel
  //                 </Button>
  //               </div>
  //             </DialogHeader>
  //           </DialogContent>
  //         </Dialog>
  //       </div>
  //     );
  //   },
  // },
];
