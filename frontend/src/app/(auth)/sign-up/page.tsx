"use client";
import { registerStore } from "@/store/signupStore";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const { register, loading, error, success } = registerStore();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <div className="flex p-[10%] justify-center items-center">
      <form className="flex text-center h-auto w-[500px] p-6 rounded-2xl shadow-xl flex-col gap-5" onSubmit={handleSubmit}>
      <p className="font-bold text-5xl">Welcome</p>
      <span>Hello user we are your only solution for all ppt needs</span>
        <input
          placeholder="Username"
          className=""
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? 
          <p className="flex gap-4">
            <Loader2 />
            Registering...
          </p> 
          : 
          <p>Register</p>
          }
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Registration successful!</p>}
      </form>
    </div>
  );
}
