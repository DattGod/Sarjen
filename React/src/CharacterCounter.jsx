import { useState } from 'react'

function CharacterCounter() {
    const [input, setInput] = useState('')

    return (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <label>Enter String: </label>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type to count characters..."
            />

            <div style={{ marginTop: '15px' }}>
                <p><strong>Character Count:</strong> {input.length}</p>
            </div>
        </div>
    )
}

export default CharacterCounter
