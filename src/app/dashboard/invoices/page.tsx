"use client";
import { withAuth } from "@/hoc/withAuth";
import * as React from "react";
import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { apiCall } from "@/utils/apiHelper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronsUpDown, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Drawer,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import PaymentMethodFilter from "@/components/filter/PaymentMethodFilter";
import StatusPaymentFilter from "@/components/filter/StatusPaymentFilter";
import InvoiceSorter from "@/components/sorter/InvoiceSorter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppSelector } from "@/app/hook";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IInvoiceProps {}

const Invoices: React.FunctionComponent<IInvoiceProps> = (props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.authState);

  const [data, setData] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [pagination, setPagination] = useState<{
    total: number;
    totalPages: number;
  }>({ total: 0, totalPages: 1 });

  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const payment = searchParams.get("payment") || "";
  const sort = searchParams.get("sort") || "";

  const [searchInput, setSearchInput] = useState(search);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [selectedPayment, setSelectedPayment] = useState(payment);
  const [selectedSort, setSelectedSort] = useState(sort);

  const activeFiltersCount = [status, payment].filter(Boolean).length;

  const updateQuery = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, String(value));
    if (key !== "page") params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearchInput("");
    setSelectedStatus("");
    setSelectedPayment("");
    setSelectedSort("");

    const params = new URLSearchParams();
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  const getInvoice = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.get("/invoice/all-invoice", {
        params: {
          page,
          limit: pageSize,
          search,
          status,
          payment,
          sort,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedData = response.data.data.invoice.map((invoice: any) => ({
        id: invoice.id,
        client: invoice.clients?.name || "Unknown",
        invoice_number: invoice.invoice_number,
        start_date: new Date(invoice.start_date).toLocaleDateString(),
        due_date: new Date(invoice.due_date).toLocaleDateString(),
        total: invoice.total,
        payment_method: invoice.payment_method,
        status: invoice.status,
      }));

      setPagination(response.data.data.pagination);
      setData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getInvoice();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [refresh, page, pageSize, search, status, payment, sort]);

  return (
    <div className="p-4 md:p-10 flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-lg md:text-2xl text-primary">
          Manage Invoices
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Here you can manage your invoices
        </p>
      </div>
      <div className="flex justify-end">
        {user.is_verified ? (
          <Link href={"/dashboard/invoices/create-invoice"}>
            <Button type="button">Create Invoice</Button>
          </Link>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-block">
                <Button disabled type="button">
                  Create Invoice
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Please verify your account first</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4 border rounded-lg p-4">
        <div className="flex gap-4 md:w-1/3">
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
                  <PaymentMethodFilter
                    value={selectedPayment}
                    onChange={(val) => {
                      setSelectedPayment(val);
                      updateQuery("payment", val);
                    }}
                  />
                  <StatusPaymentFilter
                    value={selectedStatus}
                    onChange={(val) => {
                      setSelectedStatus(val);
                      updateQuery("status", val);
                    }}
                  />
                </div>
                <div className="hidden md:block">
                  <StatusPaymentFilter
                    value={selectedStatus}
                    onChange={(val) => {
                      setSelectedStatus(val);
                      updateQuery("status", val);
                    }}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="hidden md:block">
          <PaymentMethodFilter
            value={selectedPayment}
            onChange={(val) => {
              setSelectedPayment(val);
              updateQuery("payment", val);
            }}
          />
        </div>
        <div className="hidden md:block">
          <StatusPaymentFilter
            value={selectedStatus}
            onChange={(val) => {
              setSelectedStatus(val);
              updateQuery("status", val);
            }}
          />
        </div>
        <div className="flex gap-4">
          <InvoiceSorter
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
  );
};

export default withAuth(Invoices);
