"use client";
import { apiCall } from "@/utils/apiHelper";
import * as React from "react";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { useRouter, useSearchParams } from "next/navigation";

interface IPaymentMethodFilterProps {
  value: string;
  onChange: (val: string) => void;
}

const PaymentMethodFilter = ({
  value,
  onChange,
}: IPaymentMethodFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [methods, setMethods] = useState<string[]>([]);

  const getPaymentMethod = async () => {
    try {
      const response = await apiCall.get("/client/payment-method");
      setMethods(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatPaymentMethod = (method: string) => {
    if (method === "QRIS") return "QRIS";
    return method
      .toLowerCase()
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handlePaymentMethodChange = (method: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (method === value) {
      params.delete("payment");
      onChange("");
    } else {
      params.set("payment", method);
      onChange(method);
    }

    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    getPaymentMethod();
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} type="button" role="combobox">
          {value
            ? formatPaymentMethod(value)
            : "Select Payment Reference"}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup>
              {methods.map((method) => (
                <CommandItem
                  key={method}
                  value={method}
                  onSelect={(currentValue) => {
                    handlePaymentMethodChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {formatPaymentMethod(method)}
                  <Check
                    className={value === method ? "opacity-100" : "opacity-0"}
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

export default PaymentMethodFilter;
