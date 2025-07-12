"use client";

import { useState } from "react";
import SigninForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";

export default function HomePage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md space-y-6">
        {isSignUp ? <SignupForm /> : <SigninForm />}

        <div className="text-sm text-center">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-blue-600 underline"
              >
                Log in
              </button>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-blue-600 underline"
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
