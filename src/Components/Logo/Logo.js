import React from 'react'
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
  return (
    <Tilt options={{ max : 55 }} style={{ width: 150 }}>
      <div className="ml5 back" style={{ height: '100px', width: '100px'}}>
        <img className="mt3 " src={brain} alt="Logo" />
      </div>
    </Tilt>
  );
};

export default Logo;