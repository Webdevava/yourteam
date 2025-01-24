"use client";
import React, { useState } from "react";
import {
  Home,
  BookOpen,
  BarChart,
  User,
  File,
  Settings,
  ChevronsRight,
} from "lucide-react"; // Importing relevant icons from lucide-react
import { motion } from "framer-motion";

const Sidebar = ({ open, setOpen }) => {
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 h-full shrink-0 border shadow-lg bg-background p-2 rounded-xl"
      style={{
        width: open ? "232px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <Option
            Icon={Home}
            title="Dashboard"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={BookOpen}
            title="Courses"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={BarChart}
            title="Progress"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={File}
            title="Projects"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        </div>

        <hr />
        {/* Bottom Section for Profile and Settings */}
        <div className="mt-auto space-y-1">
          <Option
            Icon={User}
            title="Profile"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={Settings}
            title="Settings"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        </div>
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-accent shadow-inner text-primary"
          : "text-foreground/50 hover:bg-primary/25"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-sm font-medium"
        >
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-foreground/20">
        <div className="flex items-end gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <h1 className="block text-xl font-normal not-italic text-foreground">
                YourTeam.in
              </h1>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.img
      layout
      className="grid size-10 shrink-0 place-content-center"
      src="/assets/yourteam.svg"
    />
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t text-foreground transition-colors hover:bg-accent hover:text-primary rounded-b-xl"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <ChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default Sidebar;
