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
import AddProductForm from "@/view/components/product/addProductForm";

const Products = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await apiCall.get("/product/all-product", {
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
          Manage Products & Services
        </h1>
        <p className="text-muted-foreground">
          Add, edit, or remove your products and services.
        </p>
      </div>
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button">
              Add Product or Service <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product or Service</DialogTitle>
              <DialogDescription>
                Add a new product or service to your inventory.
              </DialogDescription>
            </DialogHeader>
            <AddProductForm onClose={() => setOpen(false)} onSuccess={() => setRefresh(!refresh)}/>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default withAuth(Products);
