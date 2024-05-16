import React from 'react';
import './style.css';

function Login() {
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

            <label htmlFor="psw"><b>Hasło</b></label>
            <input type="password" placeholder="Wprowadź hasło" name="psw" required />

            <button type="submit">Zaloguj się</button>
          </form>
        </div>
      </main>

      <footer>
        {/* Twoja zawartość stopki */}
      </footer>
    </div>
  );
}

export default Login;
