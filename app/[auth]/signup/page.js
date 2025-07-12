import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-[24rem] p-6 shadow-lg rounded bg-white">
        <SignupForm />
      </div>
    </main>
  );
}