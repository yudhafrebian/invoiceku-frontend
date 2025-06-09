"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Settings, User2, Verified, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { setLogout } from "@/utils/redux/features/authSlice";
import Link from "next/link";

interface IDashboardNavbarProps {}

const DashboardNavbar: React.FunctionComponent<IDashboardNavbarProps> = (
  props
) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.authState);
  const [openSignOut, setOpenSignOut] = React.useState<boolean>(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex items-center gap-4 hover:bg-[#f5f5f5] p-2 rounded-xl">
          <Avatar>
            <AvatarImage src={user.profile_img || ""} />
            <AvatarFallback>{user.first_name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h4 className="text-sm">{`${user.first_name} ${user.last_name}`}</h4>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          <Link href="/dashboard/user/profile">
            <DropdownMenuItem>
              <User2 /> Profile
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/user/account"}>
            <DropdownMenuItem>
              <Verified /> Account
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/user/payment-method"}>
            <DropdownMenuItem>
              <Wallet /> Payment Method
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/user/setting"}>
          <DropdownMenuItem>
            <Settings /> Settings
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setOpenSignOut(true)}>
          <LogOut className="text-destructive" />{" "}
          <span className="text-destructive">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Dialog open={openSignOut} onOpenChange={setOpenSignOut}>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>Sign Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to Sign Out?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                dispatch(setLogout());
                window.localStorage.removeItem("token");
                router.replace("/auth/sign-in");
              }}
              variant={"destructive"}
            >
              Sign Out
            </Button>
            <Button onClick={() => setOpenSignOut(false)} variant={"outline"}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
};

export default DashboardNavbar;
