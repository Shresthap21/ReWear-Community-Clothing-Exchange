"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosPublic from "@/lib/axiosPublic";
import Link from "next/link";

const SigninForm = () => {
  const router = useRouter();
  const [signInDetail, setSignInDetail] = useState({ email: "", password: "" });
  const [signInErr, setSignInErr] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!signInDetail.email || !signInDetail.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const promise = axiosPublic.post("/auth/login", signInDetail);
      const res = await promise;

      toast.promise(promise, {
        loading: "Logging in...",
        success: "Logged in!",
        error: "Login failed",
      });

      if (res.status === 200) {
        localStorage.setItem("access", res.data.token);
        router.push("/home");
      }
    } catch (error) {
      setSignInErr(error?.response?.data?.msg || "Login failed");
    }
  };

  useEffect(() => {
   if(localStorage.getItem("access")) {
      router.push("/home");
    }
  }, [])
  

  return (
    <div className="space-y-6">
      <h2 className="text-center text-2xl text-black my-4 font-semibold">Welcome Back!</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={signInDetail.email}
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

      
    </div>
  );
};

export default SigninForm;
