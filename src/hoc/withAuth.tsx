"use client";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hook";
import { apiCall } from "@/utils/apiHelper";
import { setLogin } from "@/utils/redux/features/authSlice";
import axios from "axios";
import { useTheme } from "next-themes";

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
      const token = window.localStorage.getItem("token");

      const interceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          const message = error?.response?.data?.error?.message;
          if (message === "jwt expired") {
            console.warn("Token expired");
            window.localStorage.removeItem("token");
            router.replace("/auth/sign-in");
          }
          return Promise.reject(error);
        }
      );

      const checkAuth = async () => {
        try {
          const res = await apiCall.get("/auth/keep-login", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setLogin({ ...res.data.data, token }));
          setLoading(false);
        } catch (err) {
          console.error("Unauthorized", err);
          window.localStorage.removeItem("token");
          router.replace("/auth/sign-in");
        }
      };

      checkAuth();

      return () => {
        axios.interceptors.response.eject(interceptor);
      };
    }, [dispatch, router]);

    if (loading)
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <HashLoader size={50} color={resolvedTheme === "dark" ? "#ffffff" : "#000"} />
          <p className="text-xl font-bold">Loading</p>
        </div>
      );

    return <WrappedComponent {...(props as React.PropsWithChildren<P>)} />;
  };
}
