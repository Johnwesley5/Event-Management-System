// RegistrationsTable.jsx
import React from 'react';

function RegistrationsTable({ registrations }) {
    return (
        <div>
            <h4>Registrations</h4>
            <table style={{ width: '100%', border: '1px solid #ccc', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        {/* Add other columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {registrations.map(registration => (
                        <tr key={registration.id}>
                            <td>{registration.name}</td>
                            <td>{registration.email}</td>
                            {/* Add other columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RegistrationsTable;
