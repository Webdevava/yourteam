'use client'
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
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
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
      console.log(error);

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
    <section className="bg-gradient-to-b from-background to-secondary/5 flex-1  flex justify-center w-full">
      <Card className="p-8 pt-0 rounded-[2.5rem] shadow-inner border-0 hover:shadow-3xl max-w-3xl w-full">
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
                <SelectItem value="mobile">Mobile App Development</SelectItem>
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
    </section>
  );
};

export default ContactForm;
