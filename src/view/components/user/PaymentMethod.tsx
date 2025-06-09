"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiCall } from "@/utils/apiHelper";
import { Edit, Landmark } from "lucide-react";
import * as React from "react";

interface IPaymentMethodListProps {}

interface IPaymentMethod {
  id: number;
  payment_method: string;
  accont_number: string;
  is_active: boolean;
  qris_image_url: string;
}

const PaymentMethodList: React.FunctionComponent<IPaymentMethodListProps> = (
  props
) => {
  const [paymentMethod, setPaymentMethod] = React.useState<IPaymentMethod[]>(
    []
  );

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
            <div className="flex gap-2">
              <Landmark className="text-blue-800" />
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"}>
                <Edit />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    });
  };

  React.useEffect(() => {
    getUserPaymentMethod();
  }, []);

  return (
    <div className={`flex flex-col gap-2 px-4`}>{printPaymentMethod()}</div>
  );
};

export default PaymentMethodList;
