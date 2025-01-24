import React from "react";
import { Rocket, BookOpen, TrendingUp, Code, Users, Award } from "lucide-react";

const BentoFeatures = () => {
  return (
    <section className="pt-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-foreground">
            Transform Your Coding Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge learning platform designed to accelerate your
            programming skills
          </p>
        </div>

        <div className="grid grid-cols-4 grid-rows-3 gap-6 h-[700px]">
          {/* Large Dashboard Feature */}
          <div className="col-span-2 row-span-2 bg-primary/10 rounded-3xl p-8 flex flex-col justify-between hover:bg-primary/20 transition-colors">
            <div>
              <div className="bg-primary/20 w-16 h-16 rounded-xl mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Personal Learning Dashboard
              </h3>
              <p className="text-muted-foreground">
                Comprehensive tracking of your coding progress with intelligent
                insights and personalized recommendations.
              </p>
            </div>
            <img
              src="/assets/dash.jpg"
              alt="Dashboard Preview"
              className="w-full h-48 object-cover object-center rounded-2xl mt-4 bg-bottom"
            />
          </div>

          {/* Interactive Coding */}
          <div className="bg-secondary/15 rounded-3xl p-6 flex flex-col justify-between hover:bg-secondary/20 transition-colors">
            <div>
              <div className="bg-secondary/20 w-12 h-12 rounded-xl mb-4 flex items-center justify-center">
                <Code className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Code Editor</h3>
              <p className="text-muted-foreground text-sm">
                Real-time coding environment with instant feedback.
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-amber-400/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-amber-400/20 transition-colors">
            <div>
              <div className="bg-amber-400/20 w-12 h-12 rounded-xl mb-4 flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Certifications</h3>
              <p className="text-muted-foreground text-sm">
                Industry-recognized credentials to boost your career.
              </p>
            </div>

          </div>

          {/* Community */}
          <div className="col-span-2 bg-rose-400/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-rose-400/20 transition-colors">
            <div>
              <div className="bg-rose-400/20 w-12 h-12 rounded-xl mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 text-forebg-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Global Learning Community
              </h3>
              <p className="text-muted-foreground">
                Connect with developers worldwide, collaborate on projects, and
                learn together.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
