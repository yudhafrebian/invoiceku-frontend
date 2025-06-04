"use client";
import { apiCall } from "@/utils/apiHelper";
import { useField } from "formik";
import * as React from "react";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";

interface IPaymentMethodProps {
  name: string;
  placeholder?: string;
}

const PaymentMethodSelector: React.FunctionComponent<IPaymentMethodProps> = ({
  name,
  placeholder,
}) => {
  const [field, meta, helper] = useField(name);
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

  const formatMethod = (method: string) => {
  if (method === "Qris") return "QRIS";
  return method
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


  useEffect(() => {
    getPaymentMethod();
  }, []);
  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          helper.setTouched(true);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          type="button"
          role="combobox"
          className={`cursor-pointer w-full justify-between ${
            meta.touched && meta.error ? "border-red-500" : ""
          }`}
        >
          {field.value
            ? formatMethod(field.value)
            : placeholder || "Select Payment Reference"}
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
                  onSelect={() => {
                    helper.setValue(method);
                    helper.setTouched(true);
                    setOpen(false);
                  }}
                >
                  {formatMethod(method)}
                  <Check
                    className={
                      field.value === method ? "opacity-100" : "opacity-0"
                    }
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {meta.error && meta.touched && (
          <p className="text-xs text-red-500">{meta.error}</p>
      )}
    </Popover>
  );
};

export default PaymentMethodSelector;
