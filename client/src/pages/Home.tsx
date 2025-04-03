import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import DOMManipulation from "@/sections/DOMManipulation";
import AsyncFeatures from "@/sections/AsyncFeatures";
import Animations from "@/sections/Animations";
import Canvas from "@/sections/Canvas";
import WebAPIs from "@/sections/WebAPIs";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "JavaScript Showcase";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-20 text-center">
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
