import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { logo, map, fb, lin, yt, ins } from './images';


function Home() {
  return (
    <div>
      <div className="menu"> 
        <div className="logo" ><Link to="/"><img src={logo} alt="logo" /></Link></div>
        <div className="menu_bar">
          <ul>
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/register">Sign up</Link></li>
          </ul>
        </div>
      </div>
      <main>
        <section>
          <h1>About us</h1>
          <p>Join us on the journey to a greener tomorrow with E-Parker – where every charge propels us towards a cleaner, more sustainable future.<br /></p>
          <p>At E-Parker, we’re driving the future of sustainable transportation by offering state-of-the-art electric vehicle (EV) charging solutions. Our mission is to empower EV owners with convenient, 
            reliable, and accessible charging infrastructure, making electric mobility the norm, not the exception.<br /></p>
          <p>Founded on the principles of innovation and environmental stewardship, E-Parker provides a seamless charging experience through a network of high-performance chargers. We’re committed to accelerating
            the transition to clean energy vehicles by expanding our footprint of fast-charging stations across urban and rural landscapes.</p>
        </section>
        <div className="mapa">
          <img src={map} alt="map" />
        </div>
      </main>
      <footer>
        <div>
          <h2>E-Parker</h2>
          <ul>
            <li><img src={fb} alt="facebook" /></li>
            <li><img src={lin} alt="linkedin" /></li>
            <li><img src={yt} alt="youtube" /></li>
            <li><img src={ins} alt="instagram" /></li>
          </ul>
        </div>
        <div></div>
      </footer>
    </div>
  );
}

export default Home;
