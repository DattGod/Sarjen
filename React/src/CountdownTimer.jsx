import { useState, useEffect, useRef } from 'react'

function CountdownTimer() {
    const [count, setCount] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const timerRef = useRef(null)

    useEffect(() => {
        if (isActive && !isPaused && count < 10) {
            timerRef.current = setInterval(() => {
                setCount(prev => prev + 1)
            }, 1000)
        } else {
            clearInterval(timerRef.current)
        }

        if (count >= 10) {
            setIsActive(false)
            clearInterval(timerRef.current)
        }

        return () => clearInterval(timerRef.current)
    }, [isActive, isPaused, count])

    const handleStart = () => {
        setCount(0)
        setIsActive(true)
        setIsPaused(false)
    }

    const handleStop = () => {
        setIsActive(false)
        setIsPaused(false)
        setCount(0)
    }

    const handlePause = () => {
        if (isActive) {
            setIsPaused(prev => !prev)
        }
    }

    return (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop} style={{ marginLeft: '10px' }}>Stop</button>
            <button onClick={handlePause} style={{ marginLeft: '10px' }}>
                {isPaused ? 'Resume' : 'Pause'}
            </button>

            <p style={{ marginTop: '15px', fontSize: '2rem', fontWeight: 'bold' }}>
                {count}
            </p>

            {count === 10 && <p style={{ color: 'red' }}>Timer Completed!</p>}
            {isActive && isPaused && <p style={{ color: 'orange' }}>Timer Paused</p>}
        </div>
    )
}

export default CountdownTimer
