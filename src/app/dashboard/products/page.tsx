"use client";
import { withAuth } from "@/hoc/withAuth";
import * as React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useState, useEffect } from "react";
import { apiCall } from "@/utils/apiHelper";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Filter, Plus, Search } from "lucide-react";
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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AddProductForm from "@/view/components/product/addProductForm";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import TypeFilter from "@/components/filter/TypeFilter";
import UnitFilter from "@/components/filter/UnitFilter";
import ProductSorter from "@/components/sorter/ProductSorter";
import { Badge } from "@/components/ui/badge";

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const unit = searchParams.get("unit") || "";
  const sort = searchParams.get("sort") || "";

  const [searchInput, setSearchInput] = useState(search);
  const [selectedType, setSelectedType] = useState(type);
  const [selectedUnit, setSelectedUnit] = useState(unit);
  const [selectedSort, setSelectedSort] = useState(sort);

  const activeFiltersCount = [search, type, unit, sort].filter(Boolean).length;

  const updateQuery = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, String(value));
    if (key !== "page") params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearchInput("");
    setSelectedType("");
    setSelectedUnit("");
    setSelectedSort("");

    const params = new URLSearchParams();
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  const getData = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await apiCall.get("/product/all-product", {
        params: { page, limit: pageSize, search, type, unit, sort },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.data.products);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [refresh, page, pageSize, search, type, unit, sort]);
  return (
    <div className="p-4 md:p-10 flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-lg md:text-2xl text-primary">
          Manage Products & Services
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
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
            <AddProductForm
              onClose={() => setOpen(false)}
              onSuccess={() => setRefresh(!refresh)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-4 mb-4 border rounded-lg p-4">
          <div className="flex gap-4 md:w-1/2">
            <div className="relative w-full ">
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
            <div className="md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant={"outline"}>
                    {activeFiltersCount ? (
                      <div className="flex items-center gap-2">
                        <Badge>{activeFiltersCount}</Badge> <Filter size={16} />
                      </div>
                    ) : (
                      <Filter size={16} />
                    )}
                    <ChevronsUpDown />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Filter</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col gap-4 p-4">
                    <TypeFilter
                      value={selectedType}
                      onChange={(val) => {
                        setSelectedType(val);
                        updateQuery("type", val);
                      }}
                    />
                    <UnitFilter
                      value={selectedUnit}
                      onChange={(val) => {
                        setSelectedUnit(val);
                        updateQuery("unit", val);
                      }}
                    />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          <div className="hidden md:block">
            <TypeFilter
              value={selectedType}
              onChange={(val) => {
                setSelectedType(val);
                updateQuery("type", val);
              }}
            />
          </div>
          <div className="hidden md:block">
            <UnitFilter
              value={selectedUnit}
              onChange={(val) => {
                setSelectedUnit(val);
                updateQuery("unit", val);
              }}
            />
          </div>
          <div className="flex gap-4">
            <ProductSorter
              value={selectedSort}
              onChange={(val) => {
                setSelectedSort(val);
                updateQuery("sort", val);
              }}
            />
            <Button type="button" onClick={resetFilters}>
              Reset
            </Button>
          </div>
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

export default withAuth(Products);
