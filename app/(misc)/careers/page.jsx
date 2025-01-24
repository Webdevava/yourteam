import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Laptop,
  Users,
  GraduationCap,
  Star,
  Rocket,
} from "lucide-react";

const CareersPage = () => {
  const openPositions = [
    {
      title: "Fullstack Developer",
      location: "Remote/On-site",
      experience: "2+ years",
      skills: ["React.js", "Node.js", "MySQL", "AWS"],
      description:
        "Build dynamic web applications and APIs, ensure performance and scalability.",
    },
    {
      title: "UI/UX Designer",
      location: "Remote/On-site",
      experience: "1+ year",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      description:
        "Create user-centered designs, wireframes, and prototypes for web and mobile applications.",
    },
    {
      title: "Android Developer",
      location: "Remote/On-site",
      experience: "2+ years",
      skills: ["Kotlin", "Java", "Firebase", "REST APIs"],
      description: "Build and maintain high-performance Android applications.",
    },
    {
      title: "IoT/Embedded Developer",
      location: "Remote/On-site",
      experience: "2+ years",
      skills: ["STM32", "ESP32", "C/C++", "MQTT", "FreeRTOS"],
      description:
        "Design and develop IoT solutions for smart devices and embedded systems.",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className=" mx-auto">
        {/* Header Section */}
        <header className="text-center my-16 mb-20 dotted-lg">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Join Our Team. Build the Future with Us.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            At Yourteam.in, we believe in innovation, collaboration, and growth.
            Be part of our mission to shape the future of technology and design.
          </p>
          <div className="mt-8 space-x-4">
            <Button size="lg">View Open Positions</Button>
            <Button variant="secondary" size="lg">
              Apply Now
            </Button>
          </div>
        </header>

        {/* Why Join Us Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Join Us?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Rocket className="w-12 h-12 text-primary" />,
                title: "Innovative Projects",
                description:
                  "Work on cutting-edge technology and creative solutions.",
              },
              {
                icon: <Users className="w-12 h-12 text-primary" />,
                title: "Supportive Team",
                description:
                  "Collaborate with talented professionals who value your input.",
              },
              {
                icon: <GraduationCap className="w-12 h-12 text-primary" />,
                title: "Growth Opportunities",
                description:
                  "Professional development through training and mentorship.",
              },
              {
                icon: <Laptop className="w-12 h-12 text-primary" />,
                title: "Flexible Work",
                description: "Hybrid and remote work options available.",
              },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {item.icon}
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Open Positions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{position.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>
                      <strong>Location:</strong> {position.location}
                    </p>
                    <p>
                      <strong>Experience:</strong> {position.experience}
                    </p>
                    <p>
                      <strong>Skills:</strong> {position.skills.join(", ")}
                    </p>
                    <p className="text-muted-foreground">
                      {position.description}
                    </p>
                    <Button className="mt-4">Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-popover p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center mb-8">
            Perks & Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Competitive salary and performance bonuses",
              "Health and wellness programs",
              "Professional development budget",
              "Company-sponsored team outings and events",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Star className="text-primary w-6 h-6" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareersPage;
