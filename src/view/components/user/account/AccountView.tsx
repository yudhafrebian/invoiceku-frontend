"use client";
import { useAppSelector } from "@/app/hook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { apiCall } from "@/utils/apiHelper";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AccountView = () => {
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();

  const user = useAppSelector((state) => state.authState);

  const handleResetPassEmail = async () => {
    const toastId = toast.loading("Sending email...");
    setResetLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await apiCall.post(
        "/auth/send-reset-email",
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Email sent successfully", {
        id: toastId,
        description: response.data.message,
      });
    } catch (error: any) {
      toast.error("Failed to send email", {
        id: toastId,
        description: error?.response?.data?.error || "Something went wrong",
      });
    } finally {
      setResetLoading(false);
    }
  };

  const handleSendVerifyEmail = async () => {
    const toastId = toast.loading("Sending email...");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await apiCall.post(
        "/auth/send-verify-email",
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Email sent successfully", {
        id: toastId,
        description: response.data.message,
      });
    } catch (error: any) {
      toast.error("Failed to send email", {
        id: toastId,
        description: error?.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const toastId = toast.loading("Deleting account...");
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await apiCall.patch("/user/delete-user",null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Account deleted", {
        id: toastId,
        description: response.data.message,
      });
      localStorage.removeItem("token");
      router.replace("/auth/sign-in");
    } catch (error: any) {
      toast.error("Failed to delete account", {
        id: toastId,
        description: error?.response?.data?.error || "Something went wrong",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex justify-between mb-4">
            <p>Email : {user.email}</p>
            <Badge
              variant={"outline"}
              className={
                user.is_verified
                  ? "text-green-400 border-green-400"
                  : "text-red-400 border-red-400"
              }
            >
              {user.is_verified ? "Verified" : "Not Verified"}
            </Badge>
          </div>
          {!user.is_verified && (
            <div>
              {loading ? (
                <Button size={"sm"} disabled>
                  Sending Email ...
                </Button>
              ) : (
                <Button size={"sm"} onClick={handleSendVerifyEmail}>
                  Send Verification Email Link
                </Button>
              )}
            </div>
          )}
        </div>
        <Separator className="my-4" />
        <div>
          <p className="mb-4">Forgot Your Password?</p>
          {resetLoading ? (
            <Button size={"sm"} disabled>
              Sending Email ...
            </Button>
          ) : (
            <Button size={"sm"} onClick={handleResetPassEmail}>
              Send Reset Password Email Link
            </Button>
          )}
        </div>
        <Separator className="my-4" />
        <div>
          <p className="mb-4 text-red-500 font-semibold">Delete Your Account</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"destructive"} size={"sm"}>
                Delete Account <Trash2 className="ml-2 w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  This action cannot be undone. Please type <strong className="text-red-500">delete my account</strong> to confirm.
                </p>
              </DialogHeader>
              <Input
                placeholder="delete my account"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
              <DialogFooter>
                <Button
                  variant="destructive"
                  disabled={confirmText !== "delete my account" || deleting}
                  onClick={handleDeleteAccount}
                >
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountView;
