import '../styles/login.css';
import React, { useState } from 'react';
import {json, useNavigate} from "react-router-dom";
import {useAuth} from "../provider/authProvider.jsx";
import axios from 'axios';
import validator from "validator";
import {decodeToken} from "react-jwt";
import {simplify} from "leaflet/src/geometry/LineUtil.js";



function Login() {

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let cleanEmail = validator.escape(email);
    let cleanPassword = validator.escape(password);

    try{
      const res = await axios.post('/api/users/auth/login', {
        email: cleanEmail,
        password: cleanPassword
      });

      setToken(res.data.token);
      console.log('Datatoken:'+res.data.token);

      //sprawdź czy admin
      let token = localStorage.getItem('token');
      var role = JSON.parse(decodeToken(token).role)

      if(role==1)
        navigate('/admin');
      if(role!=1)
        navigate('/uhome');

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
                <input id='logVal' type="text" placeholder="Wprowadź nazwę użytkownika" name="uname" required onChange={(e) => handleEmailChange(e)} />
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