import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const res = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
                const data = await res.json();
                
                if (data.result === 'error') {
                    throw new Error('Failed to fetch exchange rates');
                }

                setCurrencies(Object.keys(data.rates));
                setExchangeRate(data.rates[toCurrency]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRates();
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        if (exchangeRate !== null) {
            setConvertedAmount((amount * exchangeRate).toFixed(2));
        }
    }, [amount, exchangeRate]);

    if (loading && currencies.length === 0) return <p>Loading exchange rates...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Currency Converter</h2>
            <div border="1" style={{ border: '1px solid black', padding: '20px', width: '300px', margin: '0 auto' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Amount: </label>
                    <br />
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        style={{ border: '1px solid #333', padding: '5px', width: '100px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>From: </label>
                    <select 
                        value={fromCurrency} 
                        onChange={(e) => setFromCurrency(e.target.value)}
                        style={{ border: '1px solid #333', padding: '5px' }}
                    >
                        {currencies.map(curr => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>To: </label>
                    <select 
                        value={toCurrency} 
                        onChange={(e) => setToCurrency(e.target.value)}
                        style={{ border: '1px solid #333', padding: '5px' }}
                    >
                        {currencies.map(curr => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                </div>

                <hr />

                <div>
                    <h3>Result:</h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
