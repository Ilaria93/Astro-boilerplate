import { useState } from 'react';

export default function NextComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="next-component">
      <h3>Next.js Component Example</h3>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
} 