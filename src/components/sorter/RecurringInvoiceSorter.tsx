"use client";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface IInvoiceSorterProps {
  value: string;
  onChange: (val: string) => void;
}

const RecurringInvoiceSorter = ({ value, onChange }: IInvoiceSorterProps) => {
  const sorter = [
    {
      name: "Invoce Number A-Z",
      value: "invoice_number_asc",
    },
    {
      name: "Invoce Number Z-A",
      value: "invoice_number_desc",
    },
    {
      name: "Client Name A-Z",
      value: "client_name_asc",
    },
    {
      name: "Client Name Z-A",
      value: "client_name_desc",
    },
    {
      name: "Start Date A-Z",
      value: "start_date_asc",
    },
    {
      name: "Start Date Z-A",
      value: "start_date_desc",
    },
    {
      name: "Recurrence Interval A-Z",
      value: "recurrence_interval_asc",
    },
    {
      name: "Recurrence Interval Z-A",
      value: "recurrence_interval_desc",
    },
    {
      name: "Duration A-Z",
      value: "duration_asc",
    },
    {
      name: "Duration Z-A",
      value: "duration_desc",
    },
    {
      name: "Due in days A-Z",
      value: "due_in_days_asc",
    },
    {
      name: "Due in days Z-A",
      value: "due_in_days_desc",
    },
    {
      name: "Total A-Z",
      value: "total_asc",
    },
    {
      name: "Total Z-A",
      value: "total_desc",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === value) {
      params.delete("sort");
      onChange("");
    } else {
      params.set("sort", sort);
      onChange(sort);
    }

    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} type="button" role="combobox">
          {value
            ? sorter.find((sort) => sort.value === value)?.name
            : "Sort By"}
            <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup>
              {sorter.map((sort) => (
                <CommandItem
                  key={sort.value}
                  value={sort.value}
                  onSelect={(currentValue) => {
                    handleSortChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {sort.name}
                  <Check
                    className={
                      value === sort.value ? "opacity-100" : "opacity-0"
                    }
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default RecurringInvoiceSorter;
