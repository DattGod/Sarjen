import { useState } from 'react'

function GSTCalculator() {
    const [amount, setAmount] = useState('')
    const [gstRate, setGstRate] = useState('18')
    const [result, setResult] = useState(null)

    const calculateGST = () => {
        const amt = parseFloat(amount)
        if (isNaN(amt)) {
            alert('Please enter a valid amount')
            return
        }

        const rate = parseFloat(gstRate)
        const gstAmount = (amt * rate) / 100
        const total = amt + gstAmount

        setResult({
            amount: amt.toFixed(2),
            gstAmount: gstAmount.toFixed(2),
            total: total.toFixed(2),
            rate: rate
        })
    }

    return (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
            <h2>GST Calculator</h2>

            <div style={{ marginBottom: '10px' }}>
                <label>Enter Amount (in INR): </label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="10000"
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Select GST Rate: </label>
                <select value={gstRate} onChange={(e) => setGstRate(e.target.value)}>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                </select>
            </div>

            <button onClick={calculateGST}>Calculate GST</button>

            {result && (
                <div style={{ marginTop: '20px', textAlign: 'left', display: 'inline-block' }}>
                    <p><strong>Amount:</strong> ₹ {result.amount}</p>
                    <p><strong>GST ({result.rate}%):</strong> ₹ {result.gstAmount}</p>
                    <p><strong>Total:</strong> ₹ {result.total}</p>
                </div>
            )}
        </div>
    )
}

export default GSTCalculator
