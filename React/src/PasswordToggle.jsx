import { useState } from 'react'

function PasswordToggle() {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <label>Password: </label>
            <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
            />
            <button
                onClick={() => setShowPassword(prev => !prev)}
                style={{ marginLeft: '10px' }}
            >
                {showPassword ? 'Hide' : 'Show'}
            </button>
        </div>
    )
}

export default PasswordToggle
