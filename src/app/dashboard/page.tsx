"use client";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { apiCall } from "@/utils/apiHelper";
import { useRouter } from "next/navigation";
import { setLogin } from "@/utils/redux/features/authSlice";
import { set } from "date-fns";
import { withAuth } from "@/hoc/withAuth";
import DashboardSummary from "@/view/components/dashboard/DashboardSummary";
import TopInvoices from "@/view/components/dashboard/top-invoices/TopInvoices";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TopClients from "@/view/components/dashboard/top-clients/TopClients";
import TopProducts from "@/view/components/dashboard/top-products/TopProducts";

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const user = useAppSelector((state) => {
    return state.authState;
  });
  const dispath = useAppDispatch();
  const router = useRouter();

  const keepLogin = async () => {
    try {
      setLoading(true);
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await apiCall.get("/auth/keep-login", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispath(
          setLogin({
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            profile_img: response.data.data.profile_img,
            is_verified: response.data.data.is_verified,
            token: response.data.data.token,
          })
        );
      } else {
        router.replace("/sign-in");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    keepLogin();
  }, []);
  return (
    <main className="p-4 md:p-10  bg-[#FAFAFA]">
      <div>
        <h1 className="font-bold text-lg md:text-2xl text-primary">
          Dashboard
        </h1>
        <h1 className="font-semibold text-lg md:text-xl text-primary">
          welcome {user.first_name}
        </h1>
      </div>
      <div className="flex flex-col gap-20 mt-8">
        <div className="flex gap-8">
          <div className="bg-white p-4 rounded-2xl shadow w-1/2">
            <h2 className="font-semibold text-lg mb-4">Invoices Summary</h2>
            <DashboardSummary />
          </div>
          <div className="bg-white p-4 rounded-2xl shadow w-1/2">
            <h2 className="font-semibold text-lg mb-4">Newest Invoices</h2>
            <TopInvoices />
            <Link href={"/dashboard/invoices"}>
              <Button className="mt-6">To Invoice Page</Button>
            </Link>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-4">Clients</h2>
          <TopClients />
          <Link href={"/dashboard/clients"}>
            <Button className="mt-6">To Client Page</Button>
          </Link>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-4">Products</h2>
          <TopProducts />
          <Link href={"/dashboard/products"}>
            <Button className="mt-6">To Product Page</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default withAuth(Dashboard);
