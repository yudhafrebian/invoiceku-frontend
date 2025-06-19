"use client";
import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { apiCall } from "@/utils/apiHelper";

const TopClients = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchSummary = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiCall.get("/dashboard/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.data.clients);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);
  return <DataTable columns={columns} data={data} />;
};

export default TopClients;
