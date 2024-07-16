import ReportSection from "@/components/Admin/Report/ReportSection";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== "admin") {
      redirect("/");
    }
  } else if (!token) {
    redirect("/");
  }
  return (
    <DashboardLayout title={"Laporan Penjualan"}>
      <ReportSection token={token} />
    </DashboardLayout>
  );
};

export default page;
