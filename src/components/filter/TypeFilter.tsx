"use client";
import { apiCall } from "@/utils/apiHelper";
import * as React from "react";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { useRouter, useSearchParams } from "next/navigation";

interface ITypeFilterProps {
  value: string;
  onChange: (val: string) => void;
}

const TypeFilter = ({ value, onChange }: ITypeFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === value) {
      params.delete("type");
      onChange("");
    } else {
      params.set("type", type);
      onChange(type);
    }

    params.set("page", "1");
    router.replace(`?${params.toString()}`);

  };

  useEffect(() => {
    getType();
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} type="button" role="combobox">
          {value ? types.find((type) => type === value) : "Select Type"}
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
                  onSelect={(currentValue) => {
                    handleTypeChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {type}
                  <Check
                    className={value === type ? "opacity-100" : "opacity-0"}
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

export default TypeFilter;
