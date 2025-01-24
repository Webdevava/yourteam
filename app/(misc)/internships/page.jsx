'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import ContactForm from "../contact/page";

export default function InternshipPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const areasOfFocus = [
    {
      title: "IoT",
      description: "Sensor integration, prototyping, cloud-based analytics.",
    },
    {
      title: "Embedded Systems",
      description:
        "Microcontroller programming, FreeRTOS, hardware interfacing.",
    },
    {
      title: "Web Development",
      description:
        "Frontend/Backend design, responsive apps, and cloud integration.",
    },
    {
      title: "Mobile App Development",
      description:
        "Cross-platform development, UI/UX design, and performance optimization.",
    },
  ];

  const benefitsGained = [
    "Real-World Experience: Work on impactful projects that prepare you for industry challenges.",
    "Professional Network: Collaborate with tech leaders and companies to expand your connections.",
    "Career Growth: Develop job-ready skills that set you apart in the competitive tech world.",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dotted-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Tech Internship Program
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Looking to gain hands-on experience, work on real-world projects,
            and fast-track your career? Join our{" "}
            <strong>internship program</strong> designed for tech enthusiasts
            passionate about <strong>IoT</strong>,{" "}
            <strong>embedded systems</strong>, <strong>web development</strong>,
            and <strong>mobile application development</strong>!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Our Internship?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  "Flexible Options: Choose between online or offline internships",
                  "Industry Collaborations: Work on live projects with leading companies",
                  "Hands-On Learning: Practical training with experienced mentors",
                  "Stipend: Earn while you learn",
                  "Certificate of Completion: Professional recognition",
                  "Letter of Recommendation: Stand out from the crowd",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle2 className="text-primary" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Areas of Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {areasOfFocus.map((area, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <h3 className="font-semibold text-primary mb-1">
                      {area.title}
                    </h3>
                    <p className="text-muted-foreground">{area.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>What You&apos;ll Gain</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {benefitsGained.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle2 className="text-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-lg mb-6 text-muted-foreground">
            Don&apos;t miss this opportunity to learn, earn, and grow with a
            team committed to your success!
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="text-lg">
                Apply Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Apply for Internship</DialogTitle>
              </DialogHeader>
              <ContactForm onSubmitSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          <p className="mt-4 text-sm text-destructive">
            *Limited slots available—secure your spot today!
          </p>
        </div>
      </div>
    </div>
  );
}
