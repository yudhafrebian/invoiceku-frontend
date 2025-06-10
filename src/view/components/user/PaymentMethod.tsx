"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiCall } from "@/utils/apiHelper";
import { Edit, Landmark } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import EditPaymentMethodForm from "./EditPaymentMethod";

interface IPaymentMethodListProps {
  refresh: boolean;
}

interface IPaymentMethod {
  id: number;
  payment_method: string;
  accont_number: string;
  is_active: boolean;
  qris_image_url: string;
}

const PaymentMethodList: React.FunctionComponent<IPaymentMethodListProps> = ({
  refresh,
}) => {
  const [paymentMethod, setPaymentMethod] = React.useState<IPaymentMethod[]>(
    []
  );
  const [internalRefresh, setInternalRefresh] = React.useState<boolean>(false);
  const [editId, setEditId] = React.useState<number | null>(null);

  const formatMethod = (method: string) => {
    if (method === "Qris") return "QRIS";
    return method
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const switchStatus = async (id: number, currentStatus: boolean) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.patch(
        `/user/switch-status/${id}`,
        { is_active: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      getUserPaymentMethod();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPaymentMethod = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.get("/user/payment-method", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setPaymentMethod(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printPaymentMethod = () => {
    return paymentMethod.map((method) => {
      return (
        <div key={method.id} className="flex items-center gap-2">
          <div className="flex justify-between w-full p-2 border rounded-lg">
            <div className="flex items-center gap-2">
              {method.payment_method === "Bank_Transfer" ? (
                <Landmark className="text-blue-800 w-8 h-8" />
              ) : method.payment_method === "Dana" ? (
                <Image
                  src={"../../dana.svg"}
                  width={32}
                  height={32}
                  alt={"Dana"}
                />
              ) : method.payment_method === "Gopay" ? (
                <Image
                  src={"../../gopay.svg"}
                  width={32}
                  height={32}
                  alt={"Gopay"}
                />
              ) : method.payment_method === "Shopeepay" ? (
                <Image
                  src={"../../shopeepay.svg"}
                  width={32}
                  height={32}
                  alt={"Shopeepay"}
                />
              ) : (
                <Image
                  src={"../../qris.svg"}
                  width={32}
                  height={32}
                  alt={"OVO"}
                />
              )}
              <p>{formatMethod(method.payment_method)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id={`status-${method.id}`}
                checked={method.is_active}
                onCheckedChange={() =>
                  switchStatus(method.id, method.is_active)
                }
              />
              <Label htmlFor="status">
                {method.is_active ? "Active" : "Inactive"}
              </Label>
            </div>
          </div>
          <Dialog
            open={editId === method.id}
            onOpenChange={(isOpen) => {
              if (isOpen) {
                setEditId(method.id);
              } else {
                setEditId(null);
              }
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant={"ghost"}>
                    <Edit />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Payment Method</DialogTitle>
              </DialogHeader>
              <EditPaymentMethodForm
                params={{ id: method.id }}
                onSuccess={() => {
                  setInternalRefresh((prev) => !prev), setEditId(null);
                }}
                onClose={() => setEditId(null)}
              />
            </DialogContent>
          </Dialog>
        </div>
      );
    });
  };

  React.useEffect(() => {
    getUserPaymentMethod();
  }, [refresh]);

  return <div className={`flex flex-col gap-2`}>{printPaymentMethod()}</div>;
};

export default PaymentMethodList;
