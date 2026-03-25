import React, { useState } from 'react'

function FunctionComponents() {

  const [name, setName] = useState("")
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>React Function Component</h1>

      <h1>React Function Component a</h1>


      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h2>Your Name: {name}</h2>

      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrease
      </button>
    </div>
  )
}

export default FunctionComponents