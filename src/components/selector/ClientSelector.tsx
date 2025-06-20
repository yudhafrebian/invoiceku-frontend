"use client";
import { apiCall } from "@/utils/apiHelper";
import { useField } from "formik";
import * as React from "react";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, CheckCircle, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";

interface IClientSelectorProps {
  name: string;
  placeholder?: string;
  setFieldValue: (field: string, value: any) => void;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  payment_ref: string;
  user_id: number;
  is_deleted: boolean;
}

const ClientSelector: React.FunctionComponent<IClientSelectorProps> = ({
  name,
  placeholder,
  setFieldValue,
}) => {
  const [field, meta, helper] = useField(name);
  const [open, setOpen] = useState<boolean>(false);
  const [clients, setClients] = useState<Client[]>([]);

  const formatMethod = (method: string) => {
    if (method === "Qris") return "QRIS";
    return method
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getClient = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.get("/client/all-client", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(response.data.data.clients);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClient();
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
              ? clients.find((client) => client.id === field.value)?.name ||
                placeholder
              : placeholder || "Select Client"}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandList>
              <CommandGroup>
                {clients.map((client) => (
                  <CommandItem
                    key={client.id}
                    value={client.id.toString()}
                    onSelect={() => {
                      helper.setValue(client.id);
                      helper.setTouched(true);
                      setOpen(false);
                      setFieldValue("payment_method", client.payment_ref)
                    }}
                  >
                    {client.name}
                    <Check
                      className={
                        field.value === client.id ? "opacity-100" : "opacity-0"
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
    {field.value && (
        <div className="flex flex-col gap-1 mt-4">
            <h5 className="font-semibold">Clients:</h5>
            <div className="flex gap-2">
                <h5 className="font-semibold">
                    {clients.find((client) => client.id === field.value)?.name}
                </h5>
                <CheckCircle className="text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">
               Email: {clients.find((client) => client.id === field.value)?.email}
            </p>
            <p className="text-xs text-muted-foreground">Payment Referrence: {formatMethod(clients.find((client) => client.id === field.value)?.payment_ref || '')}</p>
        </div>
    )}
    </div>
  );
};

export default ClientSelector;
