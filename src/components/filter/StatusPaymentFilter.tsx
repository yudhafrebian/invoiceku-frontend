"use client";
import { apiCall } from "@/utils/apiHelper";
import * as React from "react";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { useRouter, useSearchParams } from "next/navigation";

interface IStatusPaymentFilterProps {
  value: string;
  onChange: (val: string) => void;
}

const StatusPaymentFilter = ({
  value,
  onChange,
}: IStatusPaymentFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [statuses, setStatuses] = useState<string[]>([]);

  const getPaymentStatus = async () => {
    try {
      const response = await apiCall.get("/invoice/status");
      setStatuses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === value) {
      params.delete("status");
      onChange("");
    } else {
      params.set("status", status);
      onChange(status);
    }

    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    getPaymentStatus();
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} type="button" role="combobox">
          {value
            ? value
            : "Select Payment Status"}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status}
                  value={status}
                  onSelect={(currentValue) => {
                    handlePaymentStatusChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {status}
                  <Check
                    className={value === status ? "opacity-100" : "opacity-0"}
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

export default StatusPaymentFilter;
