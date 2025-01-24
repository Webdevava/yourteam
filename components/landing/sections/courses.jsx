import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Clock } from 'lucide-react';
import Image from 'next/image';



const featuredCourses = [
  {
    title: "Full-Stack Web Developer",
    description:
      "Build end-to-end web apps using modern JavaScript. Master React components, Node.js APIs, MongoDB databases & deploy production-ready applications with DevOps.",
    duration: "6 months",
    difficulty: "Intermediate",
    image: "/images/fullstack.jpeg",
    price: "$499",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    title: "Mobile Apps Development",
    description:
      "Develop iOS & Android apps simultaneously. Learn React Native architecture, native modules, app store deployment & performance optimization techniques.",
    duration: "4 months",
    difficulty: "Advanced",
    image: "/images/mobile.jpeg",
    price: "$599",
    technologies: ["React Native", "Redux", "Firebase", "Jest"],
  },
  {
    title: "Data Science & ML Expert",
    description:
      "Learn practical data science skills from data cleaning to ML models. Master Python libraries, statistical analysis & build real-world prediction systems.",
    duration: "3 months",
    difficulty: "Intermediate",
    image: "/images/datascience.jpeg",
    price: "$399",
    technologies: ["Python", "Pandas", "Scikit-learn", "TensorFlow"],
  },
  {
    title: "Modern C++ Programming",
    description:
      "Master modern C++ features & OOP principles. Build robust applications using design patterns, STL, memory management & concurrent programming.",
    duration: "4 months",
    difficulty: "Beginner",
    image: "/images/cpp.jpeg",
    price: "$499",
    technologies: ["C++", "STL", "Design Patterns", "CMake"],
  },
  {
    title: "UI/UX Design Mastery",
    description:
      "Create intuitive digital experiences from concept to prototype. Learn user research, wireframing, visual design & usability testing methods.",
    duration: "4 months",
    difficulty: "Advanced",
    image: "/images/uiux.jpeg",
    price: "$599",
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle"],
  },
  {
    title: "Django REST API Expert",
    description:
      "Build secure & scalable web backends with Django. Create REST APIs, implement authentication, handle testing & master database optimization.",
    duration: "3 months",
    difficulty: "Intermediate",
    image: "/images/django.jpeg",
    price: "$399",
    technologies: ["Django", "DRF", "PostgreSQL", "Docker"],
  },
];


const Courses = () => {
  return (
    <section className="container mx-auto px-14 py-24 ">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our most popular courses designed to help you master in-demand
          programming skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredCourses.map((course, index) => (
          <Card
            key={index}
            className="bg-card rounded-3xl hover:rounded-[2.5rem] shadow-inner overflow-hidden hover:shadow-[5px_5px_0px_0px_rgba(202,251,127)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative">
              <Image
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
            </div>

            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <CardDescription className="text-base">
                  {course.description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {course.technologies.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  <span>{course.difficulty}</span>
                </div>
              </div>

              <Button className="w-full group" variant="outline">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Courses
