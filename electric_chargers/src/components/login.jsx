import React, { useState } from 'react';
import '../styles/style.css';
import '../styles/login.css';
import validator from "validator";
import axiosInstance from "../axiosInstance.js";

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
      const res = await axiosInstance.post('/api/users/auth/login', {
        email: cleanUsername,
        password: cleanPassword
      });

      console.log(res.data);
    }catch(e){
      console.error(e);
    }
  }

  return (
      <>
        <main>
          <div className="login-container">
            <form method="post" onSubmit={(e) => handleSubmit(e)}>
              <div className='loginInput'>
                <label htmlFor="uname"><b>Nazwa użytkownika</b></label>
                <input id='logVal' type="text" placeholder="Wprowadź nazwę użytkownika" name="uname" required onChange={(e) => handleUsernameChange(e)} />
              </div>
              <div className='loginInput'>
                <label htmlFor="psw"><b>Hasło</b></label>
                <input id='passVal' type="password" placeholder="Wprowadź hasło" name="psw" required onChange={(e) => handlePasswordChange(e)} />
              </div>
              <div className='loginButton'>
                <button id='button' type="submit">Zaloguj się</button>
              </div>
            </form>
          </div>
        </main>
      </>
  );
}

export default Login;