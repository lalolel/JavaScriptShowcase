import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <div className="text-primary text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
              <line x1="16" y1="8" x2="2" y2="22"></line>
              <line x1="17.5" y1="15" x2="9" y2="15"></line>
            </svg>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">JavaScript Showcase</h1>
        </a>
        
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#dom-manipulation" className="text-gray-600 hover:text-primary transition-colors">DOM Manipulation</a>
          <a href="#async-features" className="text-gray-600 hover:text-primary transition-colors">Async Features</a>
          <a href="#animations" className="text-gray-600 hover:text-primary transition-colors">Animations</a>
          <a href="#canvas" className="text-gray-600 hover:text-primary transition-colors">Canvas</a>
          <a href="#web-apis" className="text-gray-600 hover:text-primary transition-colors">Web APIs</a>
        </div>
        
        <button 
          className="md:hidden text-gray-600 hover:text-primary"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-md`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <a href="#dom-manipulation" className="text-gray-600 hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>DOM Manipulation</a>
          <a href="#async-features" className="text-gray-600 hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Async Features</a>
          <a href="#animations" className="text-gray-600 hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Animations</a>
          <a href="#canvas" className="text-gray-600 hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Canvas</a>
          <a href="#web-apis" className="text-gray-600 hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Web APIs</a>
        </div>
      </div>
    </header>
  );
}
