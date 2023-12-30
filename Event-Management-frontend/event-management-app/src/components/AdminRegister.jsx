// import React, { useState } from 'react';
// import axios from 'axios';

// function AdminRegister() {
//   const [admin, setAdmin] = useState({ name: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAdmin(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/adminRegistration', admin, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.data) {
//         setMessage('Admin registration successful!');
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setMessage(error.response.data.message || 'Error registering admin');
//       } else {
//         setMessage('Error registering admin');
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Username" onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} />
//         <button type="submit">Register</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default AdminRegister;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminRegister() {
  const [admin, setAdmin] = useState({ name: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/adminRegistration', admin);
      console.log(response.data);  // Log the entire response data for debugging
      
      if (response.status === 201) {  // Check for the 201 Created status
        setMessage('Registration successful!');
        navigate('/admin-home');
      } else {
        setMessage('Error registering admin: ' + response.data);  // Display the error message from the backend
      }
    } catch (error) {
      console.error(error);  // Log the entire error object for debugging
      setMessage('Error registering admin. Please try again.');  // Generic error message
    }
  };

  return (
    <div>
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminRegister;
