import { useState, useEffect } from 'react'

function DigitalClock() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', textAlign: 'center' }}>
            <h2>Digital Clock</h2>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                {time.toLocaleTimeString()}
            </div>
            <div style={{ fontSize: '1.2rem', marginTop: '10px' }}>
                {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        </div>
    )
}

export default DigitalClock
