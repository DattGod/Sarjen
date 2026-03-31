import { useState } from 'react'

function BasicCalculator() {
    const [num1, setNum1] = useState('')
    const [num2, setNum2] = useState('')
    const [result, setResult] = useState('')

    const handleSum = () => {
        setResult(Number(num1) + Number(num2))
    }

    const handleSub = () => {
        setResult(Number(num1) - Number(num2))
    }

    const handleMul = () => {
        setResult(Number(num1) * Number(num2))
    }

    const handleDiv = () => {
        if (Number(num2) === 0) {
            setResult('Cannot divide by zero')
        } else {
            setResult(Number(num1) / Number(num2))
        }
    }

    return (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <div style={{ marginBottom: '10px' }}>
                <label>num1: </label>
                <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>num2: </label>
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label>result: </label>
                <input
                    type="text"
                    value={result}
                    readOnly
                    style={{ backgroundColor: '#f0f0f0' }}
                />
            </div>
            <div>
                <button onClick={handleSum}>SUM</button>
                <button onClick={handleSub} style={{ marginLeft: '5px' }}>SUB</button>
                <button onClick={handleMul} style={{ marginLeft: '5px' }}>MUL</button>
                <button onClick={handleDiv} style={{ marginLeft: '5px' }}>DIV</button>
            </div>
        </div>
    )
}

export default BasicCalculator
