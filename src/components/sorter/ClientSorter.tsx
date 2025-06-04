"use client";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface IClientSorterProps {
  value: string;
  onChange: (val: string) => void;
}

const ClientSorter = ({ value, onChange }: IClientSorterProps) => {
  const sorter = [
    {
      name: "Name A-Z",
      value: "name_asc",
    },
    {
      name: "Name Z-A",
      value: "name_desc",
    },
    {
      name: "Email Ascending",
      value: "email_asc",
    },
    {
      name: "Email Descending",
      value: "email_desc",
    },
    {
      name: "Phone Ascending",
      value: "phone_asc",
    },
    {
      name: "Phone Descending",
      value: "phone_desc",
    },
    {
      name: "Address A-Z",
      value: "address_asc",
    },
    {
      name: "Address Z-A",
      value: "address_desc",
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

export default ClientSorter;
