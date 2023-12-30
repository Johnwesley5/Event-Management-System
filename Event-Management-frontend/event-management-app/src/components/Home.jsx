import React from 'react';
import Navbar from './Navbar';
import backgroundImage from './background.jpg';

function Home() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh' }}>
      <Navbar />
      {/* Other components or content here */}
    </div>
  );
}

export default Home;

