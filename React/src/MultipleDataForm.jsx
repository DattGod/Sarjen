import React, { useState, useEffect } from 'react';

const MultipleDataForm = () => {
    // Current form field state
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        gender: '',
        hobbies: [],
        city: ''
    });

    // List of records stored in LocalStorage
    const [records, setRecords] = useState(() => {
        const saved = localStorage.getItem('multiple_records_task_13');
        return saved ? JSON.parse(saved) : [];
    });

    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null); // ID of the record being edited

    // Sync records to LocalStorage whenever they change
    useEffect(() => {
        localStorage.setItem('multiple_records_task_13', JSON.stringify(records));
    }, [records]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const newHobbies = checked
                ? [...formData.hobbies, value]
                : formData.hobbies.filter(h => h !== value);
            setFormData({ ...formData, hobbies: newHobbies });
        } else if (name === 'mobile') {
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
            return;
        }

        setError('');

        if (editingId !== null) {
            // Update existing record
            setRecords(records.map(rec =>
                rec.id === editingId ? { ...formData, id: editingId } : rec
            ));
            setEditingId(null);
        } else {
            // Add new record
            setRecords([...records, { ...formData, id: Date.now() }]);
        }

        // Reset form
        setFormData({
            name: '',
            mobile: '',
            gender: '',
            hobbies: [],
            city: ''
        });
    };

    const handleEdit = (rec) => {
        setFormData({
            name: rec.name,
            mobile: rec.mobile,
            gender: rec.gender,
            hobbies: rec.hobbies,
            city: rec.city
        });
        setEditingId(rec.id);
        setError('');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            setRecords(records.filter(rec => rec.id !== id));
            // If deleting the record currently being edited, reset form
            if (editingId === id) {
                setEditingId(null);
                setFormData({
                    name: '',
                    mobile: '',
                    gender: '',
                    hobbies: [],
                    city: ''
                });
            }
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({
            name: '',
            mobile: '',
            gender: '',
            hobbies: [],
            city: ''
        });
        setError('');
    };

    return (
        <div>
            <h2>{editingId !== null ? 'Edit Data' : 'Add New Data'}</h2>
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
                <button type="submit">{editingId !== null ? 'Update Data' : 'Submit Data'}</button>
                {editingId !== null && <button type="button" onClick={cancelEdit}>Cancel Edit</button>}
            </form>

            {error && <p>{error}</p>}

            <hr />

            <h3>Stored Records:</h3>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Gender</th>
                        <th>Hobbies</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.length === 0 ? (
                        <tr>
                            <td colSpan="7">No records found in LocalStorage.</td>
                        </tr>
                    ) : (
                        records.map(rec => (
                            <tr key={rec.id}>
                                <td>{rec.id}</td>
                                <td>{rec.name}</td>
                                <td>{rec.mobile}</td>
                                <td>{rec.gender}</td>
                                <td>{rec.hobbies.join(', ')}</td>
                                <td>{rec.city}</td>
                                <td>
                                    <button onClick={() => handleEdit(rec)}>Edit</button>
                                    <button onClick={() => handleDelete(rec.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MultipleDataForm;
