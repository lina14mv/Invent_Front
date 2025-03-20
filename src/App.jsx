import { useState } from 'react';
import './App.css';
import Dashboard from './Componentes/Dashboard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-4xl font-bold">Bienvenido a INVET++</h1>
      </header>
      <Dashboard />
      <div className="card mt-4">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;