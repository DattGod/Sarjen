import { useState } from 'react'

function FullCalculator() {
    const [display, setDisplay] = useState('')

    const handleButtonClick = (value) => {
        if (value === '=') {
            try {
                // Simple evaluation using Function constructor for safety over eval()
                // Standard calculator behavior for this task
                const result = new Function(`return ${display}`)()
                setDisplay(String(result))
            } catch (error) {
                setDisplay('Error')
            }
        } else if (value === 'C') {
            setDisplay('')
        } else {
            setDisplay(prev => prev + value)
        }
    }

    const buttons = [
        ['1', '2', '3', '+'],
        ['4', '5', '6', '-'],
        ['7', '8', '9', '*'],
        ['.', '0', '=', '/'],
    ]

    return (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', display: 'inline-block' }}>
            <input
                type="text"
                value={display}
                readOnly
                style={{ width: '100%', marginBottom: '10px', textAlign: 'right', fontSize: '1.2rem', padding: '5px' }}
            />
            <div>
                {buttons.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((btn) => (
                            <button
                                key={btn}
                                onClick={() => handleButtonClick(btn)}
                                style={{ width: '40px', height: '40px', margin: '2px', fontSize: '1rem' }}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                ))}
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={() => handleButtonClick('C')}
                        style={{ width: '40px', height: '40px', margin: '2px', fontSize: '1rem' }}
                    >
                        C
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FullCalculator
