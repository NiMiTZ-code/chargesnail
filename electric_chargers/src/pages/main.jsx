import { logo, map, fb, lin, yt, ins } from '../images/index.js';
import { Link } from 'react-router-dom';


function Main(){
    return(
        <>
        <div className="menu">
        <img src={logo} alt="logo" id='logo'/>
        
          <ul id='menu-items'>
            <li><Link to="/login">Zaloguj się</Link></li>
            <li><Link to="/register">Zarejestruj się</Link></li>
          </ul>
        
      </div>
      <main>
        <section>
          <h1>O nas</h1>
          <p>Dołącz do nas w podróży ku bardziej ekologicznej przyszłości z E-Parkerem – tam, gdzie każde ładowanie napędza nas w kierunku czystszej i bardziej zrównoważonej przyszłości</p>
          <p>W E-Parkerze kształtujemy przyszłość zrównoważonego transportu, oferując nowoczesne rozwiązania do ładowania pojazdów elektrycznych (EV). Nasza misja polega na umożliwieniu właścicielom EV wygodnej, niezawodnej i dostępnej infrastruktury do ładowania, aby elektryczna mobilność stała się normą, a nie wyjątkiem. </p>
          <p>Opierając się na zasadach innowacji i dbałości o środowisko, E-Parker zapewnia bezproblemowe doświadczenie ładowania poprzez sieć wydajnych ładowarek. Jesteśmy zobowiązani do przyspieszenia przejścia na pojazdy zasilane energią czystą poprzez rozbudowę naszej sieci stacji szybkiego ładowania w obszarach miejskich i wiejskich.</p>
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

export default Main;