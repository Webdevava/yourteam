"use client";

import Link from "next/link";
import {
  BookOpen,
  File,
  Users,
  MessageSquareDot,
  GraduationCap,
} from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DASHBOARD_ITEMS = [
  {
    title: "Course Management",
    description: "Manage and create courses",
    icon: BookOpen,
    href: "/admin/courses",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  {
    title: "Project Management",
    description: "Track and manage projects",
    icon: File,
    href: "/admin/projects",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  {
    title: "Students Management",
    description: "Student records and tracking",
    icon: Users,
    href: "/admin/students",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
  {
    title: "Contacts",
    description: "View contact requests",
    icon: MessageSquareDot,
    href: "/admin/contacts",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  {
    title: "Colleges",
    description: "Manage college information",
    icon: GraduationCap,
    href: "/admin/colleges",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DASHBOARD_ITEMS.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card
              className={`
                p-6 
                hover:shadow-lg 
                transition-all 
                duration-300 
                ${item.bgColor} 
                hover:scale-105
                cursor-pointer
                flex 
                flex-col 
                items-start 
                space-y-4
              `}
            >
              <div
                className={`
                p-3 
                rounded-full 
                ${item.bgColor} 
                ${item.textColor}
              `}
              >
                <item.icon size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
