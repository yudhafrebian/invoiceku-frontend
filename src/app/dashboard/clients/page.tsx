"use client";
import { withAuth } from "@/hoc/withAuth";
import * as React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useState, useEffect } from "react";
import { apiCall } from "@/utils/apiHelper";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AddClientForm from "@/view/components/client/addClientForm";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

const Clients = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(search);

  const updateQuery = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, String(value));
    if (key !== "page") params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearchInput("");

    const params = new URLSearchParams();
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  const getData = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await apiCall.get("/client/all-client", {
        params: { page, limit: pageSize, search },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setData(response.data.data.clients);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [refresh, page, pageSize, search]);
  return (
    <div className="p-4 md:p-10 flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-2xl text-primary">Manage Clients</h1>
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
            <AddClientForm
              onClose={() => setOpen(false)}
              onSuccess={() => setRefresh(!refresh)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-4 mb-4 border rounded-lg p-4">
          <div className="relative w-1/2 ">
            <Search
              className="absolute left-2 top-1/2 -translate-y-1/2"
              size={16}
            />

            <Input
              type="search"
              value={searchInput}
              onChange={(e) => {
                const val = e.target.value;
                setSearchInput(val);
                updateQuery("search", val);
              }}
              placeholder="Search..."
              className="pl-8"
            />
          </div>
          <Button type="button" onClick={resetFilters}>
            Reset
          </Button>
        </div>
        <DataTable columns={columns(setRefresh)} data={data} />
        <Pagination className="mt-4">
          <PaginationContent className="flex justify-end">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => updateQuery("page", Math.max(page - 1, 1))}
                aria-disabled={page === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm px-2 py-1">
                Page {page} of {pagination.totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  updateQuery(
                    "page",
                    page < pagination.totalPages ? page + 1 : page
                  )
                }
                aria-disabled={page === pagination.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default withAuth(Clients);
