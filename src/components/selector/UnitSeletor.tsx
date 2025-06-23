"use client";
import { apiCall } from "@/utils/apiHelper";
import { useField } from "formik";
import * as React from "react";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";

interface IUnitSelectorProps {
  name: string;
  placeholder?: string;
}

const UnitSelector: React.FunctionComponent<IUnitSelectorProps> = ({
  name,
  placeholder,
}) => {
  const [field, meta, helper] = useField(name);
  const [open, setOpen] = useState<boolean>(false);
  const [units, setUnits] = useState<string[]>([]);

  const getType = async () => {
    try {
      const response = await apiCall.get("/product/unit-product");
      setUnits(response.data.data);
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
            ? units.find((unit) => unit === field.value)
            : placeholder || "Select Unit"}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup>
              {units.map((unit) => (
                <CommandItem
                  key={unit}
                  value={unit}
                  onSelect={() => {
                    helper.setValue(unit);
                    setOpen(false);
                  }}
                >
                  {unit}
                  <Check
                    className={
                      field.value === unit ? "opacity-100" : "opacity-0"
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

export default UnitSelector;
