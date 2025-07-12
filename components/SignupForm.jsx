"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosPublic from "@/lib/axiosPublic";
import { useRouter } from "next/navigation";
import { RxCheck, RxCross2 } from "react-icons/rx";

const SignupForm = () => {
  const router = useRouter();
  const [signUpDetail, setSignUpDetail] = useState({
    name: "",
    emailID: "",
    password: "",
  });

  const [signUpErr, setSignUpErr] = useState({ msg: "", password: [] });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpDetail((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setSignUpErr((prev) => ({
        ...prev,
        password: [
          checkLength(value),
          checkDigit(value),
          checkUppercase(value),
          checkLowercase(value),
          checkSymbol(value),
        ],
      }));
    }
  };

  function checkLength(password) {
    return {
      status: password.length >= 8,
      msg: "At least 8 characters",
    };
  }

  function checkDigit(password) {
    return {
      status: /\d/.test(password),
      msg: "At least one digit",
    };
  }

  function checkUppercase(password) {
    return {
      status: /[A-Z]/.test(password),
      msg: "At least one uppercase letter",
    };
  }

  function checkLowercase(password) {
    return {
      status: /[a-z]/.test(password),
      msg: "At least one lowercase letter",
    };
  }

  function checkSymbol(password) {
    return {
      status: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
      msg: "At least one special character",
    };
  }

  const handleSignUp = async () => {
    if (!signUpDetail.name || !signUpDetail.emailID || !signUpDetail.password) {
      toast.error("All fields required");
      return;
    }
    try {
      const res = await axiosPublic.post("/signup", signUpDetail);
      if (res.status === 200) {
        toast.success(res.data.msg);
        router.push("/auth/signin");
      }
    } catch (error) {
      setSignUpErr((prev) => ({
        ...prev,
        msg: error?.response?.data?.msg || "Signup failed",
      }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-center text-black text-2xl font-semibold">
        Create Account
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={signUpDetail.name}
        onChange={handleInputChange}
        className="w-full border rounded p-2 bg-white text-black"
      />

      <input
        type="email"
        name="emailID"
        placeholder="Email"
        value={signUpDetail.emailID}
        onChange={handleInputChange}
        className="w-full border rounded p-2 bg-white text-black"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={signUpDetail.password}
        onChange={handleInputChange}
        className="w-full border rounded p-2 bg-white text-black"
      />
      {signUpErr.password.length > 0 && (
        <div className="text-xs space-y-1">
          {signUpErr.password.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 ${
                item.status ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.status ? <RxCheck /> : <RxCross2 />} {item.msg}
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-red-600">{signUpErr.msg}</p>
      <button
        onClick={handleSignUp}
        className="bg-black text-white w-full py-2 rounded"
      >
        Sign Up
      </button>
      <p className="text-sm text-center">
        Already have an account?{" "}
        <a href="/auth/signin" className="text-black underline">
          Log In
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
