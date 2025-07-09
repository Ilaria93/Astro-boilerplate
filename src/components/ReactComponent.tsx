import { useState } from 'react';

export default function ReactComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="react-component">
      <h3>React Component Example</h3>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
} 