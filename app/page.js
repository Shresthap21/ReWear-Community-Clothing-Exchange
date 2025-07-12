"use client";

import { useState } from "react";
import SigninForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";

export default function Page() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {isSignUp ? <SignupForm setIsSignUp={setIsSignUp} /> : <SigninForm />}
        <div className="mt-4 text-center text-sm">
          {isSignUp ? (
            <span className="text-sm text-black text-center">
              Already have an account?{" "}
              <button onClick={() => setIsSignUp(false)} className="text-black underline">
                Log in
              </button>
            </span>
          ) : (
            <span className="text-sm text-black text-center">
              Don't have an account?{" "}
              <button onClick={() => setIsSignUp(true)} className="text-black underline">
                Sign up
              </button>
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
