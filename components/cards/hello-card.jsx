import React from "react";

const HelloCard = () => {
  return (
    <div className="relative w-96 bg-gradient-to-r from-secondary/25 to-card border border-border rounded-xl shadow-xl overflow-hidden p-8 ">
      {/* Background shapes */}
      <div
        className="absolute -bottom-16 -right-16 w-48 h-48 bg-no-repeat bg-cover opacity-40 "
        style={{ backgroundImage: "url('/assets/smile.svg')" }}
      ></div>

      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-snug">
          Welcome Back,{" "}
          <span className="text-primary">
            Ankur Auti
          </span>
          <span className="text-secondary font-black text-5xl">!</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mt-4 leading-relaxed">
          Let&apos;s dive into something amazing today! 🚀
        </p>
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 bg-primary text-white font-medium rounded-full shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105">
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelloCard;
