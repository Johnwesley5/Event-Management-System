// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// const StyledNavbar = styled.nav`
//   background-color: black;
//   color: white;
//   padding: 10px 20px;
//   display: flex;
//   justify-content: space-between;  // Updated to space-between
//   align-items: center;

//   button {
//     background-color: black;
//     color: white;
//     border: none;
//     cursor: pointer;
//     font-size: 16px;
//     margin-left: 20px;
//     &:hover {
//       background-color: #333;
//     }
//   }
// `;

// function AdminHome() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Logic to logout
//     // For now, just redirecting to Home.jsx
//     navigate('/');
//   };

//   return (
//     <div>
//       <StyledNavbar>
//         <h1>Event Management System - Admin</h1>  {/* Added heading */}
//         <button onClick={handleLogout}>Logout</button>
//       </StyledNavbar>

//       {/* Other AdminHome content here */}
//       <div>
//         {/* <h2>Welcome to Admin Dashboard</h2> */}
//         {/* Add any other admin-related components or information here */}
//       </div>

//       <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>  {/* Updated styling */}
//         <button onClick={() => navigate('/add-event')}>Add Event</button>
//         <button onClick={() => navigate('/view-events')}>View Events</button>
//       </div>
//     </div>
//   );
// }

// export default AdminHome;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavbar = styled.nav`
  background-color: black;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-left: 20px;
    &:hover {
      background-color: #333;
    }
  }
`;

function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <StyledNavbar>
        <h1>Event Management System - Admin</h1>
        <button onClick={handleLogout}>Logout</button>
      </StyledNavbar>

      <div>
        {/* <h2>Welcome to Admin Dashboard</h2> */}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => navigate('/add-event')}>Add Event</button>
        <button style={{ marginLeft: '10px' }} onClick={() => navigate('/view-events')}>View Events</button>  {/* Added margin */}
      </div>
    </div>
  );
}

export default AdminHome;
