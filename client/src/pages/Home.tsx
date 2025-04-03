import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import DOMManipulation from "@/sections/DOMManipulation";
import AsyncFeatures from "@/sections/AsyncFeatures";
import Animations from "@/sections/Animations";
import Canvas from "@/sections/Canvas";
import WebAPIs from "@/sections/WebAPIs";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA: {
      HALO: (config: any) => any;
    };
  }
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    document.title = "JavaScript Showcase";
  }, []);

  useEffect(() => {
    // Initialize Vanta effect
    if (!vantaEffect.current && heroRef.current && window.VANTA) {
      vantaEffect.current = window.VANTA.HALO({
        el: heroRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        baseColor: 0x0066FF,
        backgroundColor: 0xf9fafb,
        amplitudeFactor: 1.50,
        size: 0.90
      });
    }

    // Cleanup Vanta effect
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section with Vanta.js background */}
        <section ref={heroRef} className="py-12 md:py-20 text-center relative rounded-xl overflow-hidden">
          <div className="relative z-10 p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Discover the Power of <span className="text-primary">JavaScript</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore interactive examples showcasing what JavaScript can do in modern browsers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#dom-manipulation"
                className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
              >
                Explore Examples
              </a>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-lg transition-colors shadow-md border border-gray-200"
              >
                Learn More <i className="inline-block ml-2">↗</i>
              </a>
            </div>
          </div>
        </section>

        <CategoryTabs />
        
        <DOMManipulation />
        <AsyncFeatures />
        <Animations />
        <Canvas />
        <WebAPIs />
      </main>
      
      <Footer />
    </div>
  );
}
