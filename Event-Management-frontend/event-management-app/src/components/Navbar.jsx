import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Navbar Component
const StyledNavbar = styled.nav`
  background-color: black;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .button-group {
    display: flex;
    gap: 10px;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropbtn {
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      background-color: #333;
    }
  }

  .dropdown-content {
    display: ${props => props.registerDropdownVisible || props.loginDropdownVisible ? 'block' : 'none'};
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

function Navbar() {
  const [registerDropdownVisible, setRegisterDropdownVisible] = useState(false);
  const [loginDropdownVisible, setLoginDropdownVisible] = useState(false);

  const toggleRegisterDropdown = () => {
    setRegisterDropdownVisible(!registerDropdownVisible);
    if (loginDropdownVisible) setLoginDropdownVisible(false);  
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownVisible(!loginDropdownVisible);
    if (registerDropdownVisible) setRegisterDropdownVisible(false);  
  };

  return (
    <StyledNavbar registerDropdownVisible={registerDropdownVisible} loginDropdownVisible={loginDropdownVisible}>
      <h1>Event Management System</h1>
      <div className="button-group">
        <div className="dropdown">
          <button onClick={toggleRegisterDropdown} className="dropbtn">Register</button>
          {registerDropdownVisible && (
            <div className="dropdown-content">
              <Link to="/admin-register">Admin Register</Link>
              <Link to="/user-register">User Register</Link>
            </div>
          )}
        </div>
        <div className="dropdown">
          <button onClick={toggleLoginDropdown} className="dropbtn">Login</button>
          {loginDropdownVisible && (
            <div className="dropdown-content">
              <Link to="/admin-login">Admin Login</Link>
              <Link to="/user-login">User Login</Link>
            </div>
          )}
        </div>
      </div>
    </StyledNavbar>
  );
}

export default Navbar;
