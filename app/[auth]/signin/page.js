import SigninForm from "@/components/SigninForm";

export default function SigninPage() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-[24rem] p-6 shadow-lg rounded bg-white">
        <SigninForm />
      </div>
    </main>
  );
}