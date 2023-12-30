import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventRegister from './EventRegister';

function UserHome() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [registrationMessage, setRegistrationMessage] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/events')
            .then(response => {
                setEvents(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching events:", error);
                setLoading(false);
            });
    }, []);

    const handleRegister = (eventId) => {
        setSelectedEventId(eventId);
    };

    const handleLogout = () => {
        // Here, you can clear any user-related session or token, and then redirect to the home page.
        // For demonstration purposes, I'm just redirecting to the home page.
        window.location.href = '/'; // Redirecting to the home page
    };

    return (
        <div>
            {/* Navbar */}
            <nav style={{ backgroundColor: 'black', color: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Event Management System - User</h1>
                <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>Logout</button>
            </nav>

            <div>
                {registrationMessage && (
                    <div style={{ position: 'fixed', top: '10px', right: '10px', padding: '10px', backgroundColor: registrationMessage.success ? 'green' : 'red', color: 'white', borderRadius: '5px' }}>
                        {registrationMessage.message}
                    </div>
                )}

                <h2>Events</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {events.map(event => (
                        <li key={event.id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '15px', padding: '10px' }}>
                            <h3>{event.eventName}</h3>
                            <p><strong>Description:</strong> {event.eventDescription}</p>
                            <p><strong>Venue:</strong> {event.eventVenue}</p>
                            <p><strong>Date:</strong> {event.eventDate}</p>
                            <p><strong>Organizer:</strong> {event.organizer}</p>
                            <p><strong>Category:</strong> {event.category}</p>
                            <p><strong>Deadline:</strong> {event.deadline}</p>
                            <p><strong>Contact Number:</strong> {event.contactNumber}</p>
                            <button onClick={() => handleRegister(event.id)}>Register</button>
                            {selectedEventId === event.id && <EventRegister eventId={event.id} setRegistrationMessage={setRegistrationMessage} onClose={() => setSelectedEventId(null)} />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserHome;
