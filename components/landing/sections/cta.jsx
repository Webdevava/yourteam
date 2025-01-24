import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Trophy } from "lucide-react";

const CTA = () => {
  const stats = [
    { icon: Users, label: "10k+ Students", color: "text-blue-300" },
    { icon: Trophy, label: "95% Success Rate", color: "text-yellow-300" },
    { icon: Sparkles, label: "24/7 Support", color: "text-purple-300" },
  ];

  return (
    <div className="container mx-auto px-4 md:px-14 py-8">
      <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground rounded-3xl transform transition-all duration-300 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-no-repeat bg-cover bg-bottom"
          style={{ backgroundImage: "url('/assets/ass.png')" }}
        ></div>

        <div
          className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-no-repeat  rotate-180"
          style={{ backgroundImage: "url('/assets/brain.png')" }}
        ></div>

        <CardContent className="relative p-8 md:p-12 z-10">
          <div className="flex flex-col items-center space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
                Transform Your Future Today
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-100/90">
                Join an elite community of learners and unlock your full
                potential with our cutting-edge platform.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              {stats.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center justify-center space-x-2 bg-white/10 rounded-xl p-4 backdrop-blur-sm"
                >
                  <Icon className={`h-6 w-6 ${color}`} />
                  <span className="font-semibold">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="relative">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg font-semibold hover:scale-105 transition-transform duration-200"
              >
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badge */}
            <p className="text-sm text-gray-100/80">
              ⭐️ Trusted by leading companies worldwide
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CTA;
