"use client";
import { withAuth } from "@/hoc/withAuth";
import * as React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useState, useEffect } from "react";
import { apiCall } from "@/utils/apiHelper";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddClientForm from "@/view/components/client/addClientForm";


const Clients = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);

      const getData = async () => {
        const token = window.localStorage.getItem("token");
        try {
          const response = await apiCall.get("/client/all-client", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          setData(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getData();
      }, [refresh]);
  return (
 <div className="p-4 md:p-10 flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-2xl text-primary">
          Manage Clients
        </h1>
        <p className="text-muted-foreground">
          Add, edit, or remove your clients
        </p>
      </div>
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button">
              Add New Client <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Client</DialogTitle>
              <DialogDescription>
                Add a new Client to your inventory.
              </DialogDescription>
            </DialogHeader>
            <AddClientForm onClose={() => setOpen(false)} onSuccess={() => setRefresh(!refresh)}/>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <DataTable columns={columns(setRefresh)} data={data} />
      </div>
    </div>
  )
};

export default withAuth(Clients);
