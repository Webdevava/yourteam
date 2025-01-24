import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  const navItems = [
    { label: "Courses", path: "/courses" },
    { label: "Internships", path: "/internships" },
    { label: "Partnership", path: "/partnership" },
    { label: "Careers", path: "/careers" },
    { label: "About us", path: "/about" },
  ];

  return (
    <header className="container mx-auto py-8 flex justify-between items-center px-12">
      <nav className="flex items-center space-x-8">
        <div className="mr-4">
          <Image
            src="/assets/yourteam.svg"
            className="h-14 cursor-pointer"
            onClick={() => navigateTo("/")}
            alt="Logo"
          />
        </div>
        <ul className="flex gap-8">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`
                font-semibold 
                cursor-pointer 
                text-lg 
                transition-all 
                duration-200
                ${
                  pathname === item.path
                    ? "text-secondary font-bold"
                    : "hover:text-secondary"
                }
              `}
              onClick={() => navigateTo(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-muted p-1 rounded-full space-x-1">
        <Button
          size="lg"
          variant="ghost"
          className="hover:shadow-inner hover:bg-primary/5 rounded-full transition-all duration-200"
          onClick={() => navigateTo("/auth")}
        >
          Login
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="shadow-inner hover:shadow-none rounded-full transition-all duration-200"
          onClick={() => navigateTo("/auth")}
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
