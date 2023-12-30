import React, { useState } from 'react';
import axios from 'axios';

function EventRegister({ eventId, setRegistrationMessage, onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phnNumber, setPhnNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRegistration = {
            name,
            email,
            phnNumber
        };

        axios.post(`http://localhost:8080/events/${eventId}/register`, newRegistration)
            .then(response => {
                console.log('Registration successful:', response.data);
                setRegistrationMessage({ success: true, message: 'Registration successful!' });
                onClose(); // Close the form after successful registration
            })
            .catch(error => {
                console.error("Error registering:", error);
                setRegistrationMessage({ success: false, message: 'Registration failed!' });
            });
    };

    return (
        <div>
            <h2>Register for Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="text" value={phnNumber} onChange={e => setPhnNumber(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default EventRegister;
