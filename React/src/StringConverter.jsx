import { useState, useRef } from 'react'

function StringConverter() {
    const inputRef = useRef(null)
    const [results, setResults] = useState({ upper: '', lower: '' })

    const handleConvert = () => {
        const value = inputRef.current.value
        setResults({
            upper: value.toUpperCase(),
            lower: value.toLowerCase()
        })
    }

    return (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <label>Enter String: </label>
            <input
                type="text"
                ref={inputRef}
                placeholder="Type something..."
            />
            <button onClick={handleConvert} style={{ marginLeft: '10px' }}>
                Convert
            </button>

            <div style={{ marginTop: '15px' }}>
                <p><strong>Uppercase:</strong> {results.upper}</p>
                <p><strong>Lowercase:</strong> {results.lower}</p>
            </div>
        </div>
    )
}

export default StringConverter
