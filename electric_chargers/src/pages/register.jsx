import React, {useState} from 'react';
import "../styles/style.css";
import "../styles/register.css";
import validator from 'validator';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let cleanName = validator.escape(name);
    let cleanEmail = validator.escape(email);
    let cleanPassword = validator.escape(password);
    let cleanSurname = validator.escape(surname);

    console.log(cleanName+"\n"+cleanEmail+"\n"+cleanPassword+"\n"+cleanSurname)
    try{
      const res = await axios.post('/api/users/auth/register', {
        name: cleanName,
        surname: cleanSurname,
        email: cleanEmail,
        password: cleanPassword
      });
      navigate('/');
      console.log(res.data);
    }catch(e){
      console.error(e);
    }
  }


  return (
    <>
      <main>
        <div className="login-container">
          <form onSubmit={(e) => handleSubmit(e)} method="post">
            <div className='input'>
              <label htmlFor="uname"><b>Imię</b></label>
              <input id='nameVal' type="text" placeholder="Wprowadź imię" name="uname" required onChange={(e) => handleNameChange(e)} />
            </div>
            <div className='input'>
              <label htmlFor="surname"><b>Nazwisko</b></label>
              <input id='surnameVal' type="text" placeholder="Wprowadź nazwisko" name="usurname" required onChange={(e) => handleSurnameChange(e)} />
            </div>
            <div className='input'>
              <label htmlFor="email"><b>Email</b></label>
              <input id='emailVal' type="text" placeholder="Wprowadź Email" name="email" required onChange={(e) => handleEmailChange(e)} />
            </div>
            <div className='input'>
              <label htmlFor="psw"><b>Hasło</b></label>
              <input id='passwordVal' type="password" placeholder="Wprowadź hasło" name="psw" required onChange={(e) => handlePasswordChange(e)} />
            </div>
            <div className='inputbutton'>
            <button id='button' type="submit" >Zarejestruj się</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Register;
