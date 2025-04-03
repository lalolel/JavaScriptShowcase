import { useEffect, useState, useRef } from "react";
import CodeBlock from "@/components/CodeBlock";

export default function DOMManipulation() {
  // Color Changer Demo
  const [boxColor, setBoxColor] = useState("bg-blue-500");
  
  // Todo Demo
  const [todos, setTodos] = useState<string[]>(["Learn JavaScript", "Practice DOM manipulation"]);
  const [newTodo, setNewTodo] = useState("");
  
  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };
  
  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const colorChangerCode = `// Get the box element
const colorBox = document.getElementById('color-box');
const colorButtons = document.querySelectorAll('[data-color]');

// Add click event listeners to each button
colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove all background classes
    colorBox.className = 'w-32 h-32 rounded-lg shadow-md transition-colors duration-300';
    // Add the selected color class
    colorBox.classList.add(button.dataset.color);
  });
});`;

  const todoCode = `// Get DOM elements
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Add a new todo item
function addTodo() {
  const todoText = newTodoInput.value.trim();
  if (todoText === '') return;
  
  // Create new list item
  const li = document.createElement('li');
  li.className = 'flex justify-between items-center px-4 py-2 bg-gray-100 rounded';
  
  // Add todo text
  const span = document.createElement('span');
  span.textContent = todoText;
  li.appendChild(span);
  
  // Add delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-todo text-red-500 hover:text-red-700';
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });
  li.appendChild(deleteBtn);
  
  // Add to list and clear input
  todoList.appendChild(li);
  newTodoInput.value = '';
}

// Setup event listeners
addTodoButton.addEventListener('click', addTodo);
newTodoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

// Setup existing delete buttons
document.querySelectorAll('.delete-todo').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.remove();
  });
});`;

  return (
    <section id="dom-manipulation" className="mb-16">
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-bold">DOM Manipulation</h2>
        <div className="ml-4 h-px bg-gray-300 flex-grow"></div>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        JavaScript excels at manipulating the Document Object Model (DOM), enabling dynamic updates to your web pages without requiring a reload.
      </p>
      
      {/* Example 1: Color Changer */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Example: Color Changer</h3>
          <span className="px-3 py-1 bg-secondary text-white text-sm rounded-full">Interactive</span>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="mb-4">This example demonstrates how JavaScript can dynamically change the styling of elements.</p>
            
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
              <div className={`w-32 h-32 ${boxColor} rounded-lg shadow-md transition-colors duration-300`}></div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setBoxColor("bg-red-500")}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:opacity-80 transition"
                >
                  Red
                </button>
                <button
                  onClick={() => setBoxColor("bg-green-500")}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:opacity-80 transition"
                >
                  Green
                </button>
                <button
                  onClick={() => setBoxColor("bg-blue-500")}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:opacity-80 transition"
                >
                  Blue
                </button>
                <button
                  onClick={() => setBoxColor("bg-yellow-500")}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:opacity-80 transition"
                >
                  Yellow
                </button>
                <button
                  onClick={() => setBoxColor("bg-purple-500")}
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:opacity-80 transition"
                >
                  Purple
                </button>
                <button
                  onClick={() => setBoxColor("bg-pink-500")}
                  className="px-4 py-2 bg-pink-500 text-white rounded hover:opacity-80 transition"
                >
                  Pink
                </button>
              </div>
            </div>
          </div>
          
          <div className="group">
            <CodeBlock code={colorChangerCode} />
          </div>
        </div>
      </div>
      
      {/* Example 2: Dynamic Content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Example: Dynamic Content</h3>
          <span className="px-3 py-1 bg-secondary text-white text-sm rounded-full">Interactive</span>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="mb-4">JavaScript allows you to dynamically add, remove, and modify content on your page.</p>
            
            <div className="mb-6">
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Add a new item..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-primary"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTodo()}
                />
                <button
                  onClick={addTodo}
                  className="bg-primary text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
                >
                  Add
                </button>
              </div>
              
              <ul className="space-y-2">
                {todos.map((todo, index) => (
                  <li key={index} className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded">
                    <span>{todo}</span>
                    <button
                      onClick={() => deleteTodo(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="group">
            <CodeBlock code={todoCode} />
          </div>
        </div>
      </div>
    </section>
  );
}
