"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerStore } from "@/store/signupStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "recharts";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter()
  const { register, error, success, message } = registerStore();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isLoaded, setIsLoaded] = useState(false)
  
  useState(()=>{
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  })
  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      router.push(`/home`)
    }
  })

  const handleSubmit = async () => {
    await register(form);
    setForm({username: "", email: "", password: ""})
  };

  useEffect(() => {
    if (success){
      toast.success(message)
      router.push(`/home`)
    }else
      toast.error(message || error)
    
    return ()=>{}
  }, [success, error, message, router])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-200 via-pink-200 via-yellow-100 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Blob 1 */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-xl animate-float-slow"></div>

        {/* Floating Blob 2 */}
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-pink-300/40 to-yellow-300/40 rounded-full blur-lg animate-float-medium"></div>

        {/* Floating Blob 3 */}
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-yellow-200/30 to-white/50 rounded-full blur-2xl animate-float-fast"></div>

        {/* Abstract Wave */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-purple-300/20 via-pink-300/20 to-yellow-300/20 transform rotate-1 animate-wave"></div>
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Presento
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2 gap-8 p-8">
        {/* Left Side - Welcome Text */}
        <div className="flex flex-col justify-end pb-16 lg:pb-32">
          <div
            className={`transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <h2 className="text-5xl lg:text-7xl font-bold text-gray-800 leading-tight mb-4">
              WELCOME
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                NEW USER
              </span>
            </h2>
            <p onClick={()=>router.push(`/login`)} className="text-xl hover:cursor-pointer underline text-gray-600 font-medium">or pick up from where you left</p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex items-center justify-center">
          <Card
            className={`w-full max-w-md transform transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
            } shadow-2xl border-0 bg-white/80 backdrop-blur-sm`}
          >
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">Sign Up</CardTitle>
              <CardDescription className="text-gray-600">Delighted to help you out new user</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={form.username}
                  onChange={(e)=>setForm({...form, username: e.target.value})}
                  placeholder="Enter your full name"
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e)=>setForm({...form, email: e.target.value})}
                  placeholder="Enter your email"
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e)=>setForm({...form, password: e.target.value})}
                  placeholder="Create a password"
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent border-gray-200"
                />
              </div>
              <Button onClick={()=>handleSubmit()} className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-2.5 transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                Create Account
              </Button>
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button onClick={()=>router.push(`/login`)} className="text-purple-600 hover:text-purple-700 hover:cursor-pointer font-medium transition-colors duration-200 hover:underline">
                  Sign in
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
