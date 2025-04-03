import { useEffect, useState } from 'react';

export default function CategoryTabs() {
  const [activeSection, setActiveSection] = useState('dom-manipulation');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['dom-manipulation', 'async-features', 'animations', 'canvas', 'web-apis'];
      const scrollPosition = window.scrollY + 200; // offset
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex overflow-x-auto pb-2 mb-8 sticky top-16 bg-gray-50 pt-4 z-40">
      <div className="flex space-x-2 mx-auto">
        <a 
          href="#dom-manipulation" 
          className={`flex-shrink-0 px-4 py-2 rounded-full transition-colors ${
            activeSection === 'dom-manipulation' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          DOM Manipulation
        </a>
        <a 
          href="#async-features" 
          className={`flex-shrink-0 px-4 py-2 rounded-full transition-colors ${
            activeSection === 'async-features' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Async Features
        </a>
        <a 
          href="#animations" 
          className={`flex-shrink-0 px-4 py-2 rounded-full transition-colors ${
            activeSection === 'animations' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Animations
        </a>
        <a 
          href="#canvas" 
          className={`flex-shrink-0 px-4 py-2 rounded-full transition-colors ${
            activeSection === 'canvas' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Canvas
        </a>
        <a 
          href="#web-apis" 
          className={`flex-shrink-0 px-4 py-2 rounded-full transition-colors ${
            activeSection === 'web-apis' 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Web APIs
        </a>
      </div>
    </div>
  );
}
