import { logo, map, fb, lin, yt, ins } from '../images';
import { Link } from 'react-router-dom';


function MainPage(){
    return(
        <>
        <div className="menu">
        <img src={logo} alt="logo" id='logo'/>
        
          <ul id='menu-items'>
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/register">Sign up</Link></li>
          </ul>
        
      </div>
      <main>
        <section>
          <h1>About us</h1>
          <p>Join us on the journey to a greener tomorrow with E-Parker – where every charge propels us towards a cleaner, more sustainable future.</p>
          <p>At E-Parker, we’re driving the future of sustainable transportation by offering state-of-the-art electric vehicle (EV) charging solutions. Our mission is to empower EV owners with convenient, reliable, and accessible charging infrastructure, making electric mobility the norm, not the exception.</p>
          <p>Founded on the principles of innovation and environmental stewardship, E-Parker provides a seamless charging experience through a network of high-performance chargers. We’re committed to accelerating the transition to clean energy vehicles by expanding our footprint of fast-charging stations across urban and rural landscapes.</p>
        </section>
        <div className="mapa">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81630.22253703541!2d18.880846297265617!3d50.2556217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce4ab183674f%3A0xf5b0bf7dd50cb457!2sWydzia%C5%82%20In%C5%BCynierii%20Materia%C5%82owej%20Politechniki%20%C5%9Al%C4%85skiej!5e0!3m2!1spl!2spl!4v1716035646128!5m2!1spl!2spl" width="600" height="450" loading="lazy" allowFullScreen={true} referrerPolicy="no-referrer-when-downgrade"></iframe>
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
      </footer>
</>
    )
}

export default MainPage;