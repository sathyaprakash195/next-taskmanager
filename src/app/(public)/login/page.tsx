"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const isLoginButtonDisabled = () => {
    return !user.password || !user.email;
  };

  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary flex flex-col justify-center items-center h-screen lg:p-0 p-5">
      <div className="flex flex-col gap-5 bg-white p-5 lg:w-[500px] w-[380px]  text-gray-700">
        <h1 className="text-2xl font-bold">Login</h1>
        <hr />

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
          />
        </div>

        <button
          className={
            isLoginButtonDisabled()
              ? "btn-disabled cursor-not-allowed"
              : "btn-primary"
          }
          disabled={isLoginButtonDisabled()}
          onClick={onLogin}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link href="/register">Dont have an account? Register</Link>
      </div>
    </div>
  );
}

export default Login;
