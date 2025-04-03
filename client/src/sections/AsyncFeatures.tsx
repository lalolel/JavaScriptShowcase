import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";

interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    medium: string;
  };
  location: {
    city: string;
    country: string;
  };
}

export default function AsyncFeatures() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<RandomUser | null>(null);
  
  const fetchRandomUser = async () => {
    setIsLoading(true);
    setUser(null);
    
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      setUser(data.results[0]);
    } catch (error) {
      console.error('Error fetching user:', error);
      alert('Failed to fetch user data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCode = `// Get DOM elements
const fetchButton = document.getElementById('fetch-data');
const loadingIndicator = document.getElementById('loading-indicator');
const userCard = document.getElementById('user-card');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userLocation = document.getElementById('user-location');

// Add click event listener
fetchButton.addEventListener('click', fetchRandomUser);

async function fetchRandomUser() {
  // Show loading, hide user
  loadingIndicator.classList.remove('hidden');
  userCard.classList.add('hidden');
  
  try {
    // Fetch data from the Random User API
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    
    // Update the UI with user data
    userAvatar.src = user.picture.medium;
    userName.textContent = \`\${user.name.first} \${user.name.last}\`;
    userEmail.textContent = user.email;
    userLocation.textContent = \`\${user.location.city}, \${user.location.country}\`;
    
    // Hide loading, show user
    loadingIndicator.classList.add('hidden');
    userCard.classList.remove('hidden');
  } catch (error) {
    console.error('Error fetching user:', error);
    loadingIndicator.classList.add('hidden');
    alert('Failed to fetch user data. Please try again.');
  }
}`;

  return (
    <section id="async-features" className="mb-16">
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-bold">Async Features</h2>
        <div className="ml-4 h-px bg-gray-300 flex-grow"></div>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        JavaScript provides powerful asynchronous programming capabilities, allowing non-blocking operations and handling time-based events.
      </p>
      
      {/* Example: Promises & Fetch API */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Example: Fetching Data</h3>
          <span className="px-3 py-1 bg-secondary text-white text-sm rounded-full">Interactive</span>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="mb-4">JavaScript can fetch data from APIs without reloading the page using the Fetch API and Promises.</p>
            
            <div className="mb-6">
              <button 
                className="mb-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 transition"
                onClick={fetchRandomUser}
                disabled={isLoading}
              >
                {isLoading ? 'Fetching...' : 'Fetch Random User'}
              </button>
              
              {isLoading && (
                <div className="flex justify-center items-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              )}
              
              {user && (
                <div className="bg-gray-100 rounded-lg p-4 max-w-md">
                  <div className="flex items-center space-x-4">
                    <img src={user.picture.medium} alt="User avatar" className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h4 className="font-semibold text-lg">{user.name.first} {user.name.last}</h4>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-gray-600">{user.location.city}, {user.location.country}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="group">
            <CodeBlock code={fetchCode} />
          </div>
        </div>
      </div>
    </section>
  );
}
