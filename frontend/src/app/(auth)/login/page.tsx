"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { loginStore } from "@/store/loginStore"
import { toast } from "sonner"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const {error, success, message, login} = loginStore()

  // Trigger animations on mount
  useState(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  })

  const handleSubmit = async ()=>{
    await login(form);
    setForm({
      email: "",
      password: ""
    })
  }

  useEffect(()=>{
    if(success){
      toast.success(message)
      router.push(`/home`)
    } else{
      toast.error(message || error)
    }

    return ()=>{}
  },[success,message,router])

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
      <Link href={`/`} className="absolute hover:cursor-pointer top-8 left-8 z-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Presento
        </h1>
      </Link>

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
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">BACK</span>
            </h2>
            <p onClick={()=>router.push(`/sign-up`)} className="text-xl underline hover:cursor-pointer text-gray-600 font-medium">or start your journey with us</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center">
          <Card
            className={`w-full max-w-md transform transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
            } shadow-2xl border-0 bg-white/80 backdrop-blur-sm`}
          >
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600">Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
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
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e)=>setForm({...form, password: e.target.value})}
                  placeholder="Enter your password"
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent border-gray-200"
                />
              </div>
              <Button onClick={()=>handleSubmit()} className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500 text-white font-semibold py-2.5 transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                Sign In
              </Button>
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button onClick={()=>router.push(`/sign-up`)} className="text-purple-600 hover:cursor-pointer hover:text-purple-700 font-medium transition-colors duration-200 hover:underline">
                  Create account
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
