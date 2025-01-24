import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Network,
  Handshake,
  Globe,
  BarChart,
  Rocket,
  Shield,
} from "lucide-react";

export default function PartnershipPage() {
  const partnershipTypes = [
    {
      icon: Network,
      title: "Strategic Collaborations",
      description:
        "Deep technical partnerships to co-develop innovative solutions and technologies.",
    },
    {
      icon: Handshake,
      title: "Technology Licensing",
      description:
        "Flexible licensing models for our proprietary technologies and innovations.",
    },
    {
      icon: Globe,
      title: "Global Expansion",
      description:
        "Support for international market entry and technology adaptation.",
    },
  ];

  const partnerBenefits = [
    {
      icon: BarChart,
      title: "Market Acceleration",
      description: "Faster time-to-market with proven technological solutions.",
    },
    {
      icon: Rocket,
      title: "Innovation Boost",
      description:
        "Access to cutting-edge research and development capabilities.",
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description:
        "Comprehensive support and expertise to reduce technological risks.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Partnership Opportunities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            At Yourteam.in, we believe in the power of strategic partnerships to
            drive technological innovation and create transformative solutions
            across industries.
          </p>
        </div>

        {/* Partnership Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-primary">
            Partnership Models
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {partnershipTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <type.icon className="text-primary" size={48} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partner Benefits */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Benefits of Partnering with Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {partnerBenefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <benefit.icon className="text-primary" size={48} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Partnership Sectors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-primary">
            Industries We Partner With
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "IoT and Smart Technologies",
              "Automotive and Transportation",
              "Healthcare and Medical Devices",
              "Manufacturing and Industrial Automation",
              "Agriculture and Environmental Technologies",
              "Consumer Electronics",
            ].map((sector, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground font-semibold">
                    {sector}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Let&apos;s Innovate Together
          </h2>
          <p className="text-muted-foreground mb-6">
            Interested in exploring partnership opportunities?
          </p>
          <Button size="lg">Contact Our Partnerships Team</Button>
        </div>
      </div>
    </div>
  );
}
