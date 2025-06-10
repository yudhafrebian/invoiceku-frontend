"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { withAuth } from "@/hoc/withAuth";
import AddPaymentMethodForm from "@/view/components/user/AddPaymentMethodForm";
import PaymentMethodList from "@/view/components/user/PaymentMethod";
import * as React from "react";

interface IPaymentMethodPageProps {}

const PaymentMethodPage: React.FunctionComponent<IPaymentMethodPageProps> = (
  props
) => {
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  return (
    <div className="px-80 py-4">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment method.</CardDescription>
        </CardHeader>
        <div className="flex justify-end px-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)}>Add Payment Method</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
              </DialogHeader>
              <AddPaymentMethodForm
                onClose={() => setIsDialogOpen(false)}
                onSuccess={() => {
                  setRefresh((prev) => !prev);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="px-6">
          <PaymentMethodList refresh={refresh} />
        </div>
      </Card>
    </div>
  );
};

export default withAuth(PaymentMethodPage);
