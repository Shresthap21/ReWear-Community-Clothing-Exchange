const Footer = () => {
  return (
    <footer className="bg-[#D9D9D9] text-black px-6 md:px-20 py-10 text-center font-beatrice text-sm">
      <div className="space-y-2">
        <p className="font-medium">© {new Date().getFullYear()} Elegant Vogue</p>
        <p>All rights reserved</p>
        <p>Crafted with care and creativity.</p>
      </div>
    </footer>
  );
};

export default Footer;
