
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import RegistrationsTable from './RegistrationsTable';

// function EventList() {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedRegistrations, setSelectedRegistrations] = useState(null);

//     useEffect(() => {
//         axios.get('http://localhost:8080/events')
//             .then(response => {
//                 setEvents(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("Error fetching events:", error);
//                 setLoading(false);
//             });
//     }, []);

//     const handleViewRegistrations = (eventId) => {
//         axios.get(`http://localhost:8080/events/${eventId}/registrations`)
//             .then(response => {
//                 setSelectedRegistrations(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching registrations:", error);
//             });
//     };

//     const handleDelete = (eventId) => {
//         if (window.confirm('Are you sure you want to delete this event?')) {
//             axios.delete(`http://localhost:8080/event/${eventId}`)
//                 .then(response => {
//                     console.log(response.data);
//                     setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
//                 })
//                 .catch(error => {
//                     console.error("Error deleting event:", error);
//                 });
//         }
//     };

//     if (loading) return <p>Loading events...</p>;

//     return (
//         <div>
//             <h2>Events</h2>
//             <ul style={{ listStyleType: 'none', padding: 0 }}>
//                 {events.map(event => (
//                     <li key={event.id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '15px', padding: '10px' }}>
//                         <h3>{event.eventName}</h3>
//                         <p><strong>Description:</strong> {event.eventDescription}</p>
//                         <p><strong>Venue:</strong> {event.eventVenue}</p>
//                         <p><strong>Date:</strong> {event.eventDate}</p>
//                         <p><strong>Organizer:</strong> {event.organizer}</p>
//                         <p><strong>Category:</strong> a{event.category}</p>
//                         <p><strong>Deadline:</strong> {event.deadline}</p>
//                         <p><strong>Contact Number:</strong> {event.contactNumber}</p>
//                         <button onClick={() => handleDelete(event.id)}>Delete</button>
//                         <button onClick={() => handleViewRegistrations(event.id)}>ViewRegistrations</button>
//                         {selectedRegistrations && <RegistrationsTable registrations={selectedRegistrations} />}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default EventList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrationsTable from './RegistrationsTable';

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [registrationsByEvent, setRegistrationsByEvent] = useState({});
    const [selectedEventId, setSelectedEventId] = useState(null);

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

    const handleViewRegistrations = (eventId) => {
        if (selectedEventId === eventId) {
            setSelectedEventId(null); // Toggle off if already selected
            return;
        }

        axios.get(`http://localhost:8080/events/${eventId}/registrations`)
            .then(response => {
                setRegistrationsByEvent(prevState => ({
                    ...prevState,
                    [eventId]: response.data
                }));
                setSelectedEventId(eventId);
            })
            .catch(error => {
                console.error("Error fetching registrations:", error);
            });
    };

    const deleteRegistrationsForEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:8080/events/${eventId}/registrations`);
            console.log("Registrations deleted successfully.");
        } catch (error) {
            console.error("Error deleting registrations:", error);
            throw error;
        }
    };

    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                // First, delete registrations for the event
                await deleteRegistrationsForEvent(eventId);
                
                // Then, delete the event itself
                await axios.delete(`http://localhost:8080/event/${eventId}`);
                
                // Update state to reflect the deletion
                setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
                
                console.log("Event and associated registrations deleted successfully.");
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };

    if (loading) return <p>Loading events...</p>;

    return (
        <div>
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
                        <button onClick={() => handleDelete(event.id)}>Delete</button>
                        <button onClick={() => handleViewRegistrations(event.id)}>View Registrations</button>
                        {selectedEventId === event.id && registrationsByEvent[event.id] && <RegistrationsTable registrations={registrationsByEvent[event.id]} />}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;
