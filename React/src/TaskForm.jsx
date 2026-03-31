import React, { useState } from 'react';

const TaskForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        gender: '',
        hobbies: [],
        city: ''
    });

    const [submittedData, setSubmittedData] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const newHobbies = checked
                ? [...formData.hobbies, value]
                : formData.hobbies.filter(h => h !== value);
            setFormData({ ...formData, hobbies: newHobbies });
        } else if (name === 'mobile') {
            // Only allow numbers
            if (/^\d*$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.mobile || !formData.gender || formData.hobbies.length === 0 || !formData.city) {
            setError('Please fill out all fields and select at least one hobby.');
            setSubmittedData(null);
            return;
        }

        setError('');
        setSubmittedData({ ...formData });
    };

    return (
        <div>
            <h2>Task 12-A: Data Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enter Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>
                    <label>Enter Mobile No: </label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>
                    <label>Gender: </label>
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                    /> Male
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                    /> Female
                </div>
                <br />
                <div>
                    <label>Hobby: </label>
                    <input
                        type="checkbox"
                        name="hobbies"
                        value="Reading"
                        checked={formData.hobbies.includes('Reading')}
                        onChange={handleChange}
                    /> Reading
                    <input
                        type="checkbox"
                        name="hobbies"
                        value="Dancing"
                        checked={formData.hobbies.includes('Dancing')}
                        onChange={handleChange}
                    /> Dancing
                    <input
                        type="checkbox"
                        name="hobbies"
                        value="Singing"
                        checked={formData.hobbies.includes('Singing')}
                        onChange={handleChange}
                    /> Singing
                </div>
                <br />
                <div>
                    <label>City: </label>
                    <select name="city" value={formData.city} onChange={handleChange}>
                        <option value="">---Select City---</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Surat">Surat</option>
                        <option value="Rajkot">Rajkot</option>
                        <option value="Vadodara">Vadodara</option>
                    </select>
                </div>
                <br />
                <button type="submit">Submit Data</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {submittedData && (
                <div style={{ marginTop: '20px', border: '1px solid black', padding: '10px' }}>
                    <h3>Submitted Data:</h3>
                    <p><strong>Name:</strong> {submittedData.name}</p>
                    <p><strong>Mobile No:</strong> {submittedData.mobile}</p>
                    <p><strong>Gender:</strong> {submittedData.gender}</p>
                    <p><strong>Hobbies:</strong> {submittedData.hobbies.join(', ')}</p>
                    <p><strong>City:</strong> {submittedData.city}</p>
                </div>
            )}
        </div>
    );
};

export default TaskForm;
