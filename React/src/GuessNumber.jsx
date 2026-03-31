import { useState, useEffect } from 'react'

function GuessNumber() {
    const [randomNumber, setRandomNumber] = useState(null)
    const [guess, setGuess] = useState('')
    const [result, setResult] = useState(null)

    // Generate random number on page loading
    useEffect(() => {
        const num = Math.floor(Math.random() * 10) + 1 // Random number between 1 and 10
        setRandomNumber(num)
        console.log("Random Number (for testing):", num)
    }, [])

    const handleGuess = () => {
        const userGuess = parseInt(guess)
        if (isNaN(userGuess)) {
            setResult('Please enter a valid number.')
            return
        }

        if (userGuess === randomNumber) {
            setResult('Success Value : Matched!')
        } else {
            setResult('Failure Value : Not Matched!')
        }
    }

    const handleReset = () => {
        const num = Math.floor(Math.random() * 10) + 1
        setRandomNumber(num)
        setGuess('')
        setResult(null)
        console.log("New Random Number (for testing):", num)
    }

    return (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>Guess the Number (1-10)</h3>
            <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess..."
            />
            <button onClick={handleGuess} style={{ marginLeft: '10px' }}>Compare</button>
            <button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>

            {result && (
                <div style={{ marginTop: '15px' }}>
                    <p style={{ fontWeight: 'bold', color: result.includes('Success') ? 'green' : 'red' }}>
                        {result}
                    </p>
                </div>
            )}
        </div>
    )
}

export default GuessNumber
