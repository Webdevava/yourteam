import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Marque from "./marque";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseInterested: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, courseInterested: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Your message has been sent successfully!",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          courseInterested: "",
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description:
          "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-[2] space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-medium text-primary">
                Welcome to the future of learning
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Transform Your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Coding Journey
                </span>
              </h1>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Master programming through interactive learning, expert guidance,
              and hands-on projects. Join our community of developers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-96">
              <button
                className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-card bg-primary backdrop-blur-md lg:font-semibold isolation-auto border-card before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-3xl group"
                type="submit"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 19"
                  className="w-8 h-8 justify-end bg-card group-hover:rotate-90 group-hover:bg-card text-card ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-gray-700 p-2 rotate-45"
                >
                  <path
                    className="fill-gray-800 group-hover:fill-gray-800"
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  ></path>
                </svg>
              </button>

              <button
                className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-foreground bg-secondary backdrop-blur-md lg:font-semibold isolation-auto border-card before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-3xl group"
                type="submit"
              >
                View Courses
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 19"
                  className="w-8 h-8 justify-end bg-card group-hover:rotate-90 group-hover:bg-card text-card ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-gray-700 p-2 rotate-45"
                >
                  <path
                    className="fill-gray-800 group-hover:fill-gray-800"
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="space-y-2">
                <h4 className="text-4xl font-bold">10k+</h4>
                <p className="text-muted-foreground text-sm">Active Students</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-bold">500+</h4>
                <p className="text-muted-foreground text-sm">Courses</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-bold">95%</h4>
                <p className="text-muted-foreground text-sm">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex-1">
            <Card className="p-8 pt-0 rounded-[2.5rem] shadow-inner border-0 hover:shadow-3xl ">
              <CardHeader className="p-0 flex items-end justify-end">
                <h2 className="text-2xl font-bold mb-6 text-secondary p-2 pb-4  bg-background rounded-3xl rounded-t-none border-0 border-t-0 text-center shadow-md">
                  Get in Touch
                </h2>
              </CardHeader>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label className="text-lg text-foreground/55" htmlFor="name">
                    Full Name
                  </Label>
                  <Input
                    className="text-xl"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-lg text-foreground/55" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    className="text-xl"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-lg text-foreground/55" htmlFor="phone">
                    Phone Number
                  </Label>
                  <Input
                    className="text-xl"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    className="text-lg text-foreground/55"
                    htmlFor="courseInterested"
                  >
                    I&apos;m interested in
                  </Label>
                  <Select
                    value={formData.courseInterested}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack">
                        Full Stack Development
                      </SelectItem>
                      <SelectItem value="uiux">UI/UX Design</SelectItem>
                      <SelectItem value="datascience">Data Science</SelectItem>
                      <SelectItem value="mobile">
                        Mobile App Development
                      </SelectItem>
                      <SelectItem value="cpp">C++ Programming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full text-lg"
                  size={"lg"}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
      <Marque />
    </section>
  );
};

export default Hero;
