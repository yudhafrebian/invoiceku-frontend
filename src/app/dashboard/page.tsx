"use client";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { apiCall } from "@/utils/apiHelper";
import { useRouter } from "next/navigation";
import { setLogin } from "@/utils/redux/features/authSlice";
import { set } from "date-fns";
import { withAuth } from "@/hoc/withAuth";

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
        console.log(response);
      } else {
        router.replace("/sign-in");
      }
    } catch (error:any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    keepLogin();
  }, []);
  return (
    <div className="p-10 bg-[#FAFAFA]">
      <h1>Dashboard</h1>
      <h1>welcome {user.first_name}</h1>
    </div>
  );
};

export default withAuth(Dashboard);
