import React, { useState } from 'react';
import '../styles/login.css';
import validator from "validator";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      const res = await axios.post('/api/users/auth/login', {
        email: cleanUsername,
        password: cleanPassword
      });

      navigate('/', {
        state:{isAdmin:(cleanUsername==="m@nowak.com")}
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