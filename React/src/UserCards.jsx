import React, { useState, useEffect } from 'react';

const UserCards = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.ok ? await response.json() : [];
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={containerStyle}>
            <h2>Task 14: User Directory</h2>
            <div style={gridStyle}>
                {users.map(user => (
                    <div key={user.id} style={cardStyle}>
                        <h3 style={{ margin: '0 0 10px 0' }}>{user.id}. {user.name}</h3>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Website:</strong> {user.website}</p>
                        <p><strong>Company:</strong> {user.company?.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Simple inline styles for a card grid without a separate CSS file
const containerStyle = {
    padding: '30px'
};

const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '25px',
    justifyContent: 'center'
};

const cardStyle = {
    border: '2px solid #4A90E2', // Prominent border on the card
    borderRadius: '12px',
    padding: '20px',
    width: '280px',
    backgroundColor: '#ffffff',
    textAlign: 'left',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease'
};

export default UserCards;
