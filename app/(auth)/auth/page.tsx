"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitMerge, LogIn, UserPlus, EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState({
    login: false,
    register: false,
    confirmRegister: false
  });
  const router = useRouter();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [dob, setDob] = useState("");
  const [college, setCollege] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = (type: 'login' | 'register' | 'confirmRegister') => {
    setShowPassword(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save token and user details to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on admin status
      if (data.user.isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }

      setSuccess("Login successful!");
    } else {
      setError(data.error || "Login failed. Please try again.");
    }
  } catch (error) {
    setError("An error occurred. Please try again.");
  }
};

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (registerPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: registerEmail,
          dob,
          college,
          contactNumber,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Please log in.");
        setActiveTab("login");
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 dotted-lg">
      <Card className="w-full max-w-7xl shadow-2xl border-2 border-primary/10 rounded-[2.5rem]">
        <div className="grid md:grid-cols-2">
          {/* Left side - Branding & Illustration */}
          <div className="hidden flex-1 md:flex flex-col justify-center items-center bg-primary/5 p-8 rounded-l-[2.5rem]">
            <img 
              src="/assets/yourteam.svg" 
              alt="YourTeam Logo" 
              className="h-24 mb-6"
            />
            <h1 className="text-3xl font-bold text-primary mb-4">YourTeam.in</h1>
            <p className="text-center text-muted-foreground">
              Connect, Collaborate, and Grow Together
            </p>
          </div>

          {/* Right side - Authentication Form */}
          <div className="flex-1 p-6 md:p-8">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center items-center gap-2 mb-4 md:hidden">
                <img 
                  src="/assets/yourteam.svg" 
                  alt="YourTeam Logo" 
                  className="h-12"
                />
                <CardTitle className="text-2xl font-bold">YourTeam.in</CardTitle>
              </div>
              <CardTitle className="text-2xl mb-2">
                {activeTab === "login" ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription>
                {activeTab === "login" 
                  ? "Enter your credentials to access your account" 
                  : "Fill in your details to get started"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">
                  {success}
                </div>
              )}

              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab} 
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </TabsTrigger>
                  <TabsTrigger value="register">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail">Email</Label>
                      <Input
                        id="loginEmail"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 relative">
                      <Label htmlFor="loginPassword">Password</Label>
                      <Input
                        id="loginPassword"
                        type={showPassword.login ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('login')}
                        className="absolute right-3 top-9 text-muted-foreground"
                      >
                        {showPassword.login ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input
                          id="contactNumber"
                          type="tel"
                          placeholder="+1234567890"
                          required
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="registerEmail">Email</Label>
                        <Input
                          id="registerEmail"
                          type="email"
                          placeholder="m@example.com"
                          required
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          required
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="college">College/Institute Name</Label>
                      <Input
                        id="college"
                        placeholder="Your College"
                        required
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2 relative">
                        <Label htmlFor="registerPassword">Password</Label>
                        <Input
                          id="registerPassword"
                          type={showPassword.register ? "text" : "password"}
                          required
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('register')}
                          className="absolute right-3 top-9 text-muted-foreground"
                        >
                          {showPassword.register ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <div className="space-y-2 relative">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type={showPassword.confirmRegister ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('confirmRegister')}
                          className="absolute right-3 top-9 text-muted-foreground"
                        >
                          {showPassword.confirmRegister ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="my-6">
                <Separator />
                <div className="text-center relative -top-3">
                  <span className="bg-background px-4 text-xs text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert("Google login not implemented yet")}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Continue with Google
              </Button>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}