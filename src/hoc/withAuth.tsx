"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hook";
import { apiCall } from "@/utils/apiHelper";
import { setLogin } from "@/utils/redux/features/authSlice";

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function ProtectedComponent(props: React.PropsWithChildren<P>) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = window.localStorage.getItem("token");
          if (!token) return redirect("/unauthorized");

          const res = await apiCall.get("/auth/keep-login", {
            headers: { Authorization: `Bearer ${token}` },
          });

          dispatch(setLogin({ ...res.data.data, token }));
        } catch (err) {
          console.error("Unauthorized", err);
          redirect("/unauthorized");
        } 
      };
      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };
}
