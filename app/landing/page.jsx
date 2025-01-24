import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  GitMerge,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Check,
  Clock,
  BarChart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Marquee from "@/components/ui/marquee";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Nav Section */}
      <header className="container mx-auto px-14 py-8 flex justify-between items-center">
        <nav className="flex items-center space-x-8">
          <div className="rounded-lg rotate-45 bg-primary border w-fit p-2 shadow-xl mr-4">
            <GitMerge className="text-secondary" />
          </div>
          <ul className="flex gap-8">
            <li className="font-semibold hover:text-secondary cursor-pointer text-lg transition-all duration-200">
              Courses
            </li>
            <li className="font-semibold hover:text-secondary cursor-pointer text-lg transition-all duration-200">
              Internships
            </li>
            <li className="font-semibold hover:text-secondary cursor-pointer text-lg transition-all duration-200">
              Partnership
            </li>
            <li className="font-semibold hover:text-secondary cursor-pointer text-lg transition-all duration-200">
              About us
            </li>
          </ul>
        </nav>

        <div className="bg-muted p-1 rounded-lg space-x-2">
          <Button
            size="lg"
            variant="ghost"
            className="hover:shadow-inner hover:bg-primary/5"
          >
            Login
          </Button>
          <Button size="lg" variant="secondary">
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
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
                Master programming through interactive learning, expert
                guidance, and hands-on projects. Join our community of
                developers.
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
                  <p className="text-muted-foreground text-sm">
                    Active Students
                  </p>
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
              <Card className="p-8 pt-0 rounded-[2.5rem] shadow-inner border-0">
                <CardHeader className="p-0 flex items-end justify-end">
                  <h2 className="text-2xl font-bold mb-6 text-secondary p-2 pb-4  bg-background rounded-3xl rounded-t-none border-2 border-t-0 text-center">
                    Get in Touch
                  </h2>
                </CardHeader>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      className="text-lg text-foreground/55"
                      htmlFor="fullName"
                    >
                      Full Name
                    </Label>
                    <Input
                      className="text-xl"
                      id="fullName"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      className="text-lg text-foreground/55"
                      htmlFor="email"
                    >
                      Email
                    </Label>
                    <Input
                      className="text-xl"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      className="text-lg text-foreground/55"
                      htmlFor="phone"
                    >
                      Phone Number
                    </Label>
                    <Input
                      className="text-xl"
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      className="text-lg text-foreground/55"
                      htmlFor="interest"
                    >
                      I&apos;m interested in
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fullstack">
                          Full Stack Development
                        </SelectItem>
                        <SelectItem value="uiux">UI/UX Design</SelectItem>
                        <SelectItem value="datascience">
                          Data Science
                        </SelectItem>
                        <SelectItem value="mobile">
                          Mobile App Development
                        </SelectItem>
                        <SelectItem value="cpp">C++ Programming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full text-lg" size={"lg"}>
                    Submit
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Marquee pauseOnHover className="[--duration:10s]">
        <div className="flex gap-8">
          <div className="bg-secondary/75 p-4 rounded-lg shadow -rotate-1">
            <p className="text-foreground">Join 10k+ Students</p>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg shadow rotate-1">
            <p className="text-primary">Master Programming Skills</p>
          </div>
          <div className="bg-secondary/75 p-4 rounded-lg shadow -rotate-1">
            <p className="text-foreground">Get Certified</p>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg shadow rotate-1">
            <p className="text-primary">Land Your Dream Job</p>
          </div>
        </div>
      </Marquee>

      {/* Features Section */}
      <section className="dotted-lg pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides comprehensive tools and resources to help
              you master programming skills effectively.
            </p>
          </div>
          <div className="flex flex-row gap-8">
            <Card className="bg-card rounded-[2.5rem] shadow-inner flex-1">
              <CardHeader>
                <CardTitle className="text-secondary bg-black -rotate-1 p-2 rounded-lg w-fit">
                  Learning Dashboard
                </CardTitle>
                <CardDescription>
                  Track your progress and manage your coding journey efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Personal progress tracking</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Achievement badges</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Course completion certificates</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
              <Card className="bg-card rounded-[2.5rem] shadow-inner">
                <CardHeader>
                  <CardTitle className="text-secondary bg-black -rotate-1 p-2 rounded-lg w-fit">
                    Interactive Learning
                  </CardTitle>
                  <CardDescription>
                    Hands-on coding experience with real-time feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Live code editor</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Practice exercises</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Instant feedback</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card rounded-[2.5rem] shadow-inner">
                <CardHeader>
                  <CardTitle className="text-secondary bg-black -rotate-1 p-2 rounded-lg w-fit">
                    Student Resources
                  </CardTitle>
                  <CardDescription>
                    Comprehensive learning materials and support
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Downloadable materials</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Video tutorials</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Discussion forums</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card rounded-[2.5rem] shadow-inner col-span-2">
                <CardHeader>
                  <CardTitle className="text-secondary bg-black -rotate-1 p-2 rounded-lg w-fit">
                    Course Management
                  </CardTitle>
                  <CardDescription>
                    Comprehensive learning path with professional certification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>
                        Multiple programming languages (Python, JavaScript,
                        Java)
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>
                        Project-based assessments with instructor feedback
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>
                        Industry-recognized certificates upon completion
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>
                        Personalized learning paths based on skill level
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>
                        Regular progress reports and performance analytics
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Direct communication channel with instructors</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-14 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular courses designed to help you master
            in-demand programming skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <Card
              key={index}
              className="bg-card rounded-[2.5rem] shadow-inner overflow-hidden"
            >
              <div className="relative">
                <img
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
                    <BarChart className="h-4 w-4" />
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

      {/* Testimonials Section */}
      <section className="container mx-auto px-14 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from developers who have transformed their careers through our
            platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-card rounded-[2.5rem] shadow-inner">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10" />
                    <div>
                      <h4 className="font-semibold">Student Name</h4>
                      <p className="text-sm text-muted-foreground">
                        Software Developer
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    &quot;The structured learning path and hands-on projects
                    helped me land my dream job as a developer. The community
                    support was incredible!&quot;
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="container mx-auto px-14 py-8">
        <Card className="bg-primary text-primary-foreground rounded-[2.5rem]">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Join thousands of students who have transformed their learning
              experience. Start your journey today.
            </p>
            <Button size="lg" variant="secondary">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-muted mt-24">
        <div className="container mx-auto px-14 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg rotate-45 bg-primary border w-8 h-8 flex items-center justify-center">
                  <GitMerge className="text-secondary h-4 w-4" />
                </div>
                <span className="font-bold text-lg">CodeAcademy</span>
              </div>
              <p className="text-muted-foreground">
                Transforming lives through accessible and effective programming
                education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li className="text-muted-foreground hover:text-primary cursor-pointer">
                  About Us
                </li>
                <li className="text-muted-foreground hover:text-primary cursor-pointer">
                  Courses
                </li>
                <li className="text-muted-foreground hover:text-primary cursor-pointer">
                  Testimonials
                </li>
                <li className="text-muted-foreground hover:text-primary cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@codeacademy.com</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>123 Coding Street, Tech City</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 CodeAcademy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
