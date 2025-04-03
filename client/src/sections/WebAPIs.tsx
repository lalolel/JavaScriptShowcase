import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export default function WebAPIs() {
  const [isLoading, setIsLoading] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const getLocation = () => {
    // Reset state
    setIsLoading(true);
    setLocationData(null);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        setLocationData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setIsLoading(false);
      },
      // Error callback
      (error) => {
        let errorMessage = "An unknown error occurred.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "You denied the request for geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request timed out.";
            break;
        }
        
        setLocationError(errorMessage);
        setIsLoading(false);
      },
      // Options
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const geolocationCode = `// Get DOM elements
const getLocationBtn = document.getElementById('get-location');
const locationResult = document.getElementById('location-result');
const locationError = document.getElementById('location-error');
const latitudeSpan = document.getElementById('latitude');
const longitudeSpan = document.getElementById('longitude');
const accuracySpan = document.getElementById('accuracy');
const mapsLink = document.getElementById('maps-link');
const errorMessage = document.getElementById('error-message');

// Check if geolocation is supported
if (!navigator.geolocation) {
  getLocationBtn.disabled = true;
  getLocationBtn.textContent = 'Geolocation not supported';
  getLocationBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
  getLocationBtn.classList.remove('hover:bg-blue-600');
}

// Set up event listener
getLocationBtn.addEventListener('click', getLocation);

function getLocation() {
  // Hide previous results
  locationResult.classList.add('hidden');
  locationError.classList.add('hidden');
  
  // Show button as loading
  getLocationBtn.disabled = true;
  getLocationBtn.innerHTML = '<span class="inline-block animate-spin mr-2">↻</span> Getting location...';
  
  // Request the current position
  navigator.geolocation.getCurrentPosition(
    // Success callback
    (position) => {
      // Update UI with position data
      latitudeSpan.textContent = position.coords.latitude.toFixed(6);
      longitudeSpan.textContent = position.coords.longitude.toFixed(6);
      accuracySpan.textContent = Math.round(position.coords.accuracy);
      
      // Create Google Maps link
      const mapsUrl = \`https://www.google.com/maps?q=\${position.coords.latitude},\${position.coords.longitude}\`;
      mapsLink.href = mapsUrl;
      
      // Show result and reset button
      locationResult.classList.remove('hidden');
      getLocationBtn.disabled = false;
      getLocationBtn.innerHTML = 'Get My Location';
    },
    // Error callback
    (error) => {
      // Handle different error types
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage.textContent = "You denied the request for geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage.textContent = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage.textContent = "The request timed out.";
          break;
        default:
          errorMessage.textContent = "An unknown error occurred.";
      }
      
      // Show error and reset button
      locationError.classList.remove('hidden');
      getLocationBtn.disabled = false;
      getLocationBtn.innerHTML = 'Get My Location';
    },
    // Options
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}`;

  return (
    <section id="web-apis" className="mb-16">
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-bold">Web APIs</h2>
        <div className="ml-4 h-px bg-gray-300 flex-grow"></div>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        Modern browsers provide powerful APIs that JavaScript can leverage for advanced functionality.
      </p>
      
      {/* Example: Geolocation */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Example: Geolocation</h3>
          <span className="px-3 py-1 bg-secondary text-white text-sm rounded-full">Interactive</span>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="mb-4">The Geolocation API allows your web app to access the user's location (with permission).</p>
            
            <div className="mb-6">
              <button 
                className={`mb-4 px-4 py-2 ${
                  navigator.geolocation
                    ? 'bg-primary hover:bg-blue-600'
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white rounded transition`}
                onClick={getLocation}
                disabled={!navigator.geolocation || isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin mr-2">↻</span> Getting location...
                  </>
                ) : navigator.geolocation ? (
                  'Get My Location'
                ) : (
                  'Geolocation not supported'
                )}
              </button>
              
              {locationData && (
                <div className="bg-gray-100 rounded-lg p-4">
                  <p><strong>Latitude:</strong> {locationData.latitude.toFixed(6)}</p>
                  <p><strong>Longitude:</strong> {locationData.longitude.toFixed(6)}</p>
                  <p><strong>Accuracy:</strong> {Math.round(locationData.accuracy)} meters</p>
                  <div className="mt-2">
                    <a 
                      href={`https://www.google.com/maps?q=${locationData.latitude},${locationData.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              )}
              
              {locationError && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                  <p>{locationError}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="group">
            <CodeBlock code={geolocationCode} />
          </div>
        </div>
      </div>
    </section>
  );
}
