"use client";
import AdminSidebar from "@/components/navigation/admin-sidebar";
import Topbar from "@/components/navigation/topbar";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen ">
      <div className="flex flex-1 overflow-hidden p-2">
        <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <motion.div
          layout
          animate={{
            width: sidebarOpen ? "calc(100% - 240px)" : "calc(100% - 66px)",
            marginLeft: sidebarOpen ? "0.5rem" : "0.5rem",
          }}
          transition={{ type: "tween", duration: 0.4 }}
          className="flex flex-col w-full gap-2 shrink-0"
        >
          <Topbar />
          <div className="flex-1 overflow-auto bg-background rounded-xl border shadow-lg">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
