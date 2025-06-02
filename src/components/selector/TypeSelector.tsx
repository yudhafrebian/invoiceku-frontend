"use client";
import { apiCall } from "@/utils/apiHelper";
import { useField } from "formik";
import * as React from "react";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";

interface ITypeSelectorProps {
  name: string;
  placeholder?: string;
}

const TypeSelector: React.FunctionComponent<ITypeSelectorProps> = ({
  name,
  placeholder,
}) => {
  const [field, meta, helper] = useField(name);
  const [open, setOpen] = useState<boolean>(false);
  const [types, setTypes] = useState<string[]>([]);

  const getType = async () => {
    try {
      const response = await apiCall.get("/product/type-product");
      setTypes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getType();
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
            ? types.find((type) => type === field.value)
            : placeholder || "Select Type"}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup>
              {types.map((type) => (
                <CommandItem
                  key={type}
                  value={type}
                  onSelect={() => {
                    helper.setValue(type);
                    helper.setTouched(true);
                    setOpen(false);
                  }}
                >
                  {type}
                  <Check
                    className={
                      field.value === type ? "opacity-100" : "opacity-0"
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

export default TypeSelector;
