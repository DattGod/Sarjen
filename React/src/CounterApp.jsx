import { useState } from 'react'

function CounterApp() {
    const [count, setCount] = useState(0)

    const increment = () => {
        if (count < 10) {
            setCount(prev => prev + 1)
        }
    }

    const decrement = () => {
        if (count > 0) {
            setCount(prev => prev - 1)
        }
    }

    return (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement} style={{ marginLeft: '10px' }}>Decrement</button>

            <p style={{ marginTop: '15px', fontSize: '1.2rem' }}>
                <strong>Current Value:</strong> {count}
            </p>

            {count === 10 && <p style={{ color: 'red' }}>Maximum limit reached (10)</p>}
            {count === 0 && <p style={{ color: 'blue' }}>Minimum limit reached (0)</p>}
        </div>
    )
}

export default CounterApp
