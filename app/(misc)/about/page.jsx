import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Globe, Award, Users } from "lucide-react";

export default function AboutUsPage() {
  const coreValues = [
    {
      icon: Target,
      title: "Innovation",
      description:
        "Pushing technological boundaries and creating groundbreaking solutions.",
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description:
        "Thinking beyond borders, solving problems with a worldwide mindset.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Committed to delivering highest quality work and continuous improvement.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Believing in the power of teamwork and collective intelligence.",
    },
  ];

  const teamHistory = [
    {
      year: 2018,
      milestone: "Founded with a vision to revolutionize tech solutions",
    },
    {
      year: 2020,
      milestone: "Expanded operations, launched first IoT product line",
    },
    {
      year: 2022,
      milestone: "Achieved ISO certification and international recognition",
    },
    {
      year: 2024,
      milestone: "Established global partnerships and innovation centers",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            About Yourteam.in
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are a dynamic technology company dedicated to creating innovative
            solutions that transform industries and improve lives through
            cutting-edge IoT, embedded systems, web, and mobile technologies.
          </p>
        </div>

        {/* Core Values Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-primary">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <value.icon className="text-primary" size={48} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company History */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamHistory.map((milestone, index) => (
                <div
                  key={index}
                  className="border-l-4 border-primary pl-4 py-2"
                >
                  <h3 className="text-lg font-semibold text-primary">
                    {milestone.year}
                  </h3>
                  <p className="text-muted-foreground">{milestone.milestone}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To empower businesses and individuals through transformative
                technology solutions, driving innovation that creates meaningful
                impact across industries.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be a global leader in technological innovation, consistently
                delivering cutting-edge solutions that solve complex challenges
                and improve quality of life.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Join Our Journey
          </h2>
          <p className="text-muted-foreground mb-6">
            Interested in being part of our innovative team?
          </p>
          <Button size="lg">Explore Careers</Button>
        </div>
      </div>
    </div>
  );
}
