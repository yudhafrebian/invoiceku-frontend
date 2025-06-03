"use client";
import { apiCall } from "@/utils/apiHelper";
import * as React from "react";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { useRouter, useSearchParams } from "next/navigation";

interface IUnitFilterProps {
  value: string;
  onChange: (val: string) => void;
}

const UnitFilter = ({ value, onChange }: IUnitFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [units, setUnit] = useState<string[]>([]);

  const getUnit = async () => {
    try {
      const response = await apiCall.get("/product/unit-product");
      setUnit(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnitChange = (unit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (unit === value) {
      params.delete("unit");
      onChange("");
    } else {
      params.set("unit", unit);
      onChange(unit);
    }

    params.set("page", "1");
    router.replace(`?${params.toString()}`);

  };

  useEffect(() => {
    getUnit();
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} type="button" role="combobox">
          {value ? units.find((unit) => unit === value) : "Select Unit"}
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
                  onSelect={(currentValue) => {
                    handleUnitChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {unit}
                  <Check
                    className={value === unit ? "opacity-100" : "opacity-0"}
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

export default UnitFilter;
