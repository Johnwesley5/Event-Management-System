import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import AddEvent from './components/AddEvent';
import EventList from './components/EventList';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/admin-register" element={<AdminRegister/>}/>
        <Route path="/admin-login" element={<AdminLogin/>}/>
        <Route path="/user-register" element={<UserRegister/>}/>
        <Route path="/user-login" element={<UserLogin/>}/>
        <Route path='/admin-home' element={<AdminHome/>}/>
        <Route path='/user-home' element={<UserHome/>}/>
        <Route path='/add-event' element={<AddEvent/>}/>
        <Route path='/view-events' element={<EventList/>}/>
        
      </Routes>
    
  </Router>
  );
}

export default App;
