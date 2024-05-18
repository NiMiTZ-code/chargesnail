import React, { useState } from 'react';
import '../styles/style.css';
import validator from "validator";
import axios from "axios";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let cleanUsername = validator.escape(username);
    let cleanPassword = validator.escape(password);

    try{
     /* const res = await axios.post(null, {
        username: cleanUsername,
        password: cleanPassword
      });*/
    }catch(e){
      console.error(e);
    }
  }

  return (
    <>
      <main>
        <div className="login-container">
          <form method="post">
            <label htmlFor="uname"><b>Nazwa użytkownika</b></label>
            <input type="text" placeholder="Wprowadź nazwę użytkownika" name="uname" required onChange={(e) => handleUsernameChange(e)} />

            <label htmlFor="psw"><b>Hasło</b></label>
            <input type="password" placeholder="Wprowadź hasło" name="psw" required onChange={(e) => handlePasswordChange(e)} />

            <button type="submit" onSubmit={(e) => handleSubmit(e)}>Zaloguj się</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
