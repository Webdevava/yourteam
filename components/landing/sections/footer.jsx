import React from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-foreground mt-20 pt-16 pb-6 relative ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                alt="logo"
                src="/assets/yourteam.svg"
                className="h-10 transition-transform duration-300 hover:rotate-6"
              />
              <h3 className="font-bold text-xl text-background tracking-wider">
                YourTeam
              </h3>
            </div>
            <p className="text-card text-sm leading-relaxed opacity-80">
              Transforming lives through accessible and effective programming
              education.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-background mb-3 tracking-wide">
              Contact Info
            </h4>
            <ul className="space-y-3">
              {[
                { icon: Mail, text: "info@yourteam.in" },
                { icon: Phone, text: "+91 93595 47362" },
                {
                  icon: MapPin,
                  text: "Nirmal Nagari, Umred Road, Nandanvan, Nagpur, Maharashtra",
                },
              ].map(({ icon: Icon, text }, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-card group"
                >
                  <Icon className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
                  <span className="text-sm transition-colors group-hover:text-accent">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-background mb-3 tracking-wide">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {[Github, Linkedin, Twitter].map((Icon, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="rounded-full group hover:bg-accent transition-all duration-300"
                >
                  <Icon className="h-5 w-5 text-primary transition-transform group-hover:rotate-12 group-hover:scale-110" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center relative z-10">
          <p className="text-sm text-accent opacity-90">
            &copy; 2025 YourTeam. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Powered by TracknNinja Pvt Ltd | CIN: U74999MH2021PTC361857
          </p>
        </div>

        {/* Decorative Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-primary/10 to-transparent opacity-20"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
