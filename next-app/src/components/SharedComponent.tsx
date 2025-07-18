'use client';

import { useState } from 'react';

export default function SharedComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Componente Next.js</h2>
      <p className="mb-4">Contatore: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Incrementa
      </button>
    </div>
  );
} 