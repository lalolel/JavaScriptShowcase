import { useState, useEffect, useRef } from "react";
import CodeBlock from "@/components/CodeBlock";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = 256; // Fixed height
    }
    
    // Set initial canvas properties
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = currentColor;
    
    // Handle window resize
    const handleResize = () => {
      if (container) {
        // Save the current canvas content
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Resize canvas
        canvas.width = container.clientWidth;
        
        // Restore canvas properties
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 5;
        ctx.strokeStyle = currentColor;
        
        // Restore the canvas content
        ctx.putImageData(imageData, 0, 0);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentColor]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.strokeStyle = currentColor;
  }, [currentColor]);
  
  const handleColorChange = (color: string) => {
    setCurrentColor(color);
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ): [number, number] => {
    const rect = canvas.getBoundingClientRect();
    
    if (e.type.includes("touch")) {
      const touchEvent = e as React.TouchEvent<HTMLCanvasElement>;
      return [
        touchEvent.touches[0].clientX - rect.left,
        touchEvent.touches[0].clientY - rect.top,
      ];
    } else {
      const mouseEvent = e as React.MouseEvent<HTMLCanvasElement>;
      return [
        mouseEvent.clientX - rect.left,
        mouseEvent.clientY - rect.top,
      ];
    }
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const [x, y] = getCoordinates(e, canvas);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const [x, y] = getCoordinates(e, canvas);
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  const drawingCode = `// Get canvas element and context
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear-canvas');
const colorButtons = document.querySelectorAll('.drawing-color');

// Drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = '#000000';
let lineWidth = 5;

// Set initial canvas properties
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = lineWidth;
ctx.strokeStyle = currentColor;

// Highlight the active color (black by default)
document.querySelector('[data-color="#000000"]').classList.add('border-2', 'border-gray-800');

// Drawing functions
function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = getCoordinates(e);
}

function draw(e) {
  if (!isDrawing) return;
  
  // Prevent scrolling on touch devices
  e.preventDefault();
  
  const [currentX, currentY] = getCoordinates(e);
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();
  
  [lastX, lastY] = [currentX, currentY];
}

function stopDrawing() {
  isDrawing = false;
}

function getCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  if (e.type.includes('touch')) {
    return [
      (e.touches[0].clientX - rect.left) * scaleX,
      (e.touches[0].clientY - rect.top) * scaleY
    ];
  } else {
    return [
      (e.clientX - rect.left) * scaleX,
      (e.clientY - rect.top) * scaleY
    ];
  }
}

// Set up event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch support
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

// Clear canvas
clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Color selection
colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const color = button.getAttribute('data-color');
    ctx.strokeStyle = color;
    currentColor = color;
    
    // Update active color indicator
    colorButtons.forEach(btn => btn.classList.remove('border-2', 'border-gray-800'));
    button.classList.add('border-2', 'border-gray-800');
  });
});`;

  return (
    <section id="canvas" className="mb-16">
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-bold">Canvas</h2>
        <div className="ml-4 h-px bg-gray-300 flex-grow"></div>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        The HTML5 Canvas API with JavaScript enables drawing, animations, and even games in the browser.
      </p>
      
      {/* Example: Interactive Drawing */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Example: Simple Drawing App</h3>
          <span className="px-3 py-1 bg-secondary text-white text-sm rounded-full">Interactive</span>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="mb-4">Use the mouse to draw on the canvas below. Change colors and clear the canvas with the buttons.</p>
            
            <div className="mb-6">
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleColorChange("#000000")}
                  className={`w-8 h-8 bg-black rounded-full ${currentColor === "#000000" ? "border-2 border-gray-800" : ""}`}
                ></button>
                <button
                  onClick={() => handleColorChange("#3B82F6")}
                  className={`w-8 h-8 bg-blue-500 rounded-full ${currentColor === "#3B82F6" ? "border-2 border-gray-800" : ""}`}
                ></button>
                <button
                  onClick={() => handleColorChange("#EF4444")}
                  className={`w-8 h-8 bg-red-500 rounded-full ${currentColor === "#EF4444" ? "border-2 border-gray-800" : ""}`}
                ></button>
                <button
                  onClick={() => handleColorChange("#10B981")}
                  className={`w-8 h-8 bg-green-500 rounded-full ${currentColor === "#10B981" ? "border-2 border-gray-800" : ""}`}
                ></button>
                <button
                  onClick={() => handleColorChange("#F59E0B")}
                  className={`w-8 h-8 bg-amber-500 rounded-full ${currentColor === "#F59E0B" ? "border-2 border-gray-800" : ""}`}
                ></button>
                <button
                  onClick={() => handleColorChange("#8B5CF6")}
                  className={`w-8 h-8 bg-violet-500 rounded-full ${currentColor === "#8B5CF6" ? "border-2 border-gray-800" : ""}`}
                ></button>
                <button
                  onClick={clearCanvas}
                  className="ml-4 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 transition text-sm"
                >
                  Clear
                </button>
              </div>
              
              <canvas
                ref={canvasRef}
                className="border border-gray-300 rounded-lg w-full max-w-2xl h-64 touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              ></canvas>
            </div>
          </div>
          
          <div className="group">
            <CodeBlock code={drawingCode} />
          </div>
        </div>
      </div>
    </section>
  );
}
