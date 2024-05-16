import React from 'react';
import './style.css';

function Register() {
  return (
    <div>
      <div className="menu">
        {/* Twoja zawartość menu */}
      </div>

      <main>
        <div className="login-container">
          <form action="/action_page.php" method="post">
            <label htmlFor="uname"><b>Nazwa użytkownika</b></label>
            <input type="text" placeholder="Wprowadź nazwę użytkownika" name="uname" required />

            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Wprowadź Email" name="email" required />

            <label htmlFor="psw"><b>Hasło</b></label>
            <input type="password" placeholder="Wprowadź hasło" name="psw" required />

            <label htmlFor="psw-repeat"><b>Powtórz hasło</b></label>
            <input type="password" placeholder="Powtórz hasło" name="psw-repeat" required />

            <button type="submit">Zarejestruj się</button>
          </form>
        </div>
      </main>

      <footer>
        {/* Twoja zawartość stopki */}
      </footer>
    </div>
  );
}

export default Register;
