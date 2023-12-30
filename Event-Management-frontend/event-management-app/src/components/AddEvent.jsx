import React, { useState } from 'react';
import axios from 'axios';

function AddEvent() {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEvent = {
            eventName,
            eventDescription,
            eventVenue,
            eventDate,
            organizer,
            category,
            deadline,
            contactNumber
        };

        axios.post('http://localhost:8080/eventCreate', newEvent)
            .then(response => {
                console.log('Event created:', response.data);
                setSuccessMessage('Event created successfully!');
                
                setEventName('');
                setEventDescription('');
                setEventVenue('');
                setEventDate('');
                setOrganizer('');
                setCategory('');
                setDeadline('');
                setContactNumber('');
            })
            .catch(error => {
                console.error("Error creating event:", error);
                setErrorMessage('Error creating event. Please try again.');
            });
    };

    const formStyle = {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <div style={formStyle}>
            <h2>Create Event</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Name:</label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={e => setEventName(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <label>Event Description:</label>
                    <input
                        type="text"
                        value={eventDescription}
                        onChange={e => setEventDescription(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <label>Event Venue:</label>
                    <input
                        type="text"
                        value={eventVenue}
                        onChange={e => setEventVenue(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <label>Event Date:</label>
                    <input
                        type="date"
                        value={eventDate}
                        onChange={e => setEventDate(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <label>Event Organiser name:</label>
                    <input
                        type="text"
                        value={organizer}
                        onChange={e => setOrganizer(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <label>Event Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <label>Registration deadline:</label>
                    <input
                        type="text"
                        value={deadline}
                        onChange={e => setDeadline(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={e => setContactNumber(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
               
                <button type="submit" style={buttonStyle}>Create</button>
            </form>
        </div>
    );
}

export default AddEvent;
