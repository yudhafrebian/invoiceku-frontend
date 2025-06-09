"use client";
import { apiCall } from "@/utils/apiHelper";
import { useField } from "formik";
import * as React from "react";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, CheckCircle, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";

interface IProductSelectorProps {
  name: string;
  placeholder?: string;
  setFieldValue: (field: string, value: any) => void;
  productIndex: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  type: string;
  unit: string;
  price: number;
}

const ProductSelector: React.FunctionComponent<IProductSelectorProps> = ({
    name,
    placeholder,
    setFieldValue,
    productIndex,
}) => {
  const [field, meta, helper] = useField(name);
  const [open, setOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const getProduct = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.get("/product/all-product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.data.products);
      console.log(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
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
              ? products.find((product) => product.id === field.value)?.name ||
                placeholder
              : placeholder || "Select Product"}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandList>
              <CommandGroup>
                {products.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.id.toString()}
                    onSelect={() => {
                      helper.setValue(product.id);
                      helper.setTouched(true);
                      setOpen(false);
                      setFieldValue(`invoice_items.${productIndex}.name_snapshot`, product.name);
                      setFieldValue(`invoice_items.${productIndex}.description`, product.description);
                      setFieldValue(`invoice_items.${productIndex}.price_snapshot`, product.price);
                    }}
                  >
                    {product.name}
                    <Check
                      className={
                        field.value === product.id ? "opacity-100" : "opacity-0"
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
    </div>
  );
};

export default ProductSelector;
