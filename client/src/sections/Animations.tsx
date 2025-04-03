import { useState, useEffect } from "react";
import CodeBlock from "@/components/CodeBlock";

export default function Animations() {
  const [currentValue, setCurrentValue] = useState(0);
  const [targetValue, setTargetValue] = useState(0);
  
  useEffect(() => {
    let animationFrameId: number;
    
    const animateCounter = () => {
      // Calculate the step (faster for bigger differences)
      const diff = targetValue - currentValue;
      const step = Math.sign(diff) * Math.max(1, Math.abs(diff) * 0.1);
      
      if (Math.abs(diff) < 1) {
        // If we're close enough, just set to the target
        setCurrentValue(targetValue);
      } else {
        // Otherwise, move toward the target
        setCurrentValue(prev => prev + step);
        // Request the next animation frame
        animationFrameId = requestAnimationFrame(animateCounter);
      }
    };
    
    if (currentValue !== targetValue) {
      animationFrameId = requestAnimationFrame(animateCounter);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [currentValue, targetValue]);

  const counterCode = `// Get DOM elements
const counterValue = document.getElementById('counter-value');
const incrementBtn = document.getElementById('counter-increment');
const decrementBtn = document.getElementById('counter-decrement');
const resetBtn = document.getElementById('counter-reset');

// Current value and target value
let currentValue = 0;
let targetValue = 0;

// Animation function using requestAnimationFrame
function animateCounter() {
  // Calculate the step (faster for bigger differences)
  const diff = targetValue - currentValue;
  const step = Math.sign(diff) * Math.max(1, Math.abs(diff) * 0.1);
  
  if (Math.abs(diff) < 1) {
    // If we're close enough, just set to the target
    currentValue = targetValue;
  } else {
    // Otherwise, move toward the target
    currentValue += step;
    // Request the next animation frame
    requestAnimationFrame(animateCounter);
  }
  
  // Update the display (rounded to handle floating point)
  counterValue.textContent = Math.round(currentValue);
}

// Set up event handlers
incrementBtn.addEventListener('click', () => {
  targetValue += 100;
  requestAnimationFrame(animateCounter);
});

decrementBtn.addEventListener('click', () => {
  targetValue -= 100;
  requestAnimationFrame(animateCounter);
});

resetBtn.addEventListener('click', () => {
  targetValue = 0;
  requestAnimationFrame(animateCounter);
});`;

  return (
    <section id="animations" className="mb-16">
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-bold">Animations</h2>
        <div className="ml-4 h-px bg-gray-300 flex-grow"></div>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        JavaScript can create smooth animations and transitions, enhancing user experience.
      </p>
      
      {/* Example: Animated Counter */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Example: Animated Counter</h3>
          <span className="px-3 py-1 bg-secondary text-white text-sm rounded-full">Interactive</span>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="mb-4">This example shows how to create a smooth counting animation using JavaScript.</p>
            
            <div className="mb-6 flex flex-col items-center">
              <div className="text-6xl font-bold text-primary mb-4">{Math.round(currentValue)}</div>
              <div className="flex space-x-2">
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => setTargetValue(prev => prev - 100)}
                >
                  Decrease
                </button>
                <button 
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  onClick={() => setTargetValue(0)}
                >
                  Reset
                </button>
                <button 
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  onClick={() => setTargetValue(prev => prev + 100)}
                >
                  Increase
                </button>
              </div>
            </div>
          </div>
          
          <div className="group">
            <CodeBlock code={counterCode} />
          </div>
        </div>
      </div>
    </section>
  );
}
