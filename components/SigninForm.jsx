"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosPublic from "@/lib/axiosPublic";

const SigninForm = () => {
  const router = useRouter();
  const [signInDetail, setSignInDetail] = useState({ emailID: "", password: "" });
  const [signInErr, setSignInErr] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!signInDetail.emailID || !signInDetail.password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const promise = axiosPublic.post("/login", signInDetail);
      const res = await promise;
      toast.promise(promise, {
        loading: "Logging in...",
        success: "Logged in!",
        error: "Login failed",
      });
      if (res.status === 200) {
        localStorage.setItem("access", res.data.token);
        localStorage.setItem("refresh", res.data.refresh_token);
        router.push("/dashboard");
      }
    } catch (error) {
      setSignInErr(error?.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-center text-2xl text-black my-4 font-semibold">Welcome Back!</h2>

      <input
        type="email"
        name="emailID"
        placeholder="Email"
        value={signInDetail.emailID}
        onChange={handleInputChange}
        className="w-full border rounded p-2 bg-white text-black"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={signInDetail.password}
        onChange={handleInputChange}
        className="w-full border rounded p-2 bg-white text-black"
      />

      {signInErr && <p className="text-red-600 text-sm">{signInErr}</p>}

      <button onClick={handleLogin} className="bg-black text-white w-full py-2 rounded">
        Log In
      </button>

      <p className="text-sm text-center">
        Don't have an account?{" "}
        <a href="/auth/signup" className="text-black underline">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default SigninForm;
