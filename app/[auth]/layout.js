export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <img 
        src="/assets/logo.png" 
        alt="Logo" 
        className="absolute top-4 left-4 h-auto" 
      />

      {children}
    </div>
  );
}
