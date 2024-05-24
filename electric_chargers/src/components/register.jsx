import React, {useState} from 'react';
import "../styles/style.css";
import "../styles/register.css";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let cleanUsername = validator.escape(username);
    let cleanEmail = validator.escape(email);
    let cleanPassword = validator.escape(password);
    let cleanRepeatPassword = validator.escape(repeatPassword);

    if(cleanPassword === cleanRepeatPassword){
      try{
        const res = await axios.post('/api/auth/register', {
          username: cleanUsername,
          email: cleanEmail,
          password: cleanPassword
        });
        console.log(res.data);
      }catch(e){
        console.error(e);
      }
    }else{
      window.alert("Hasła się nie zgadzają");
    }

    
  }


  return (
    <>
      <main>
        <div className="login-container">
          <form method="post">
            <div className='input'>
              <label htmlFor="uname"><b>Nazwa użytkownika</b></label>
              <input id='nameVal' type="text" placeholder="Wprowadź nazwę użytkownika" name="uname" required onChange={(e) => handleUsernameChange(e)} />
            </div>
            <div className='input'>
              <label htmlFor="email"><b>Email</b></label>
              <input id='emailVal' type="text" placeholder="Wprowadź Email" name="email" required onChange={(e) => handleEmailChange(e)} />
            </div>
            <div className='input'>
              <label htmlFor="psw"><b>Hasło</b></label>
              <input id='passwordVal' type="password" placeholder="Wprowadź hasło" name="psw" required onChange={(e) => handlePasswordChange(e)} />
            </div>
            <div className='input'>
              <label htmlFor="psw-repeat"><b>Powtórz hasło</b></label>
              <input id='passwordAgainVal' type="password" placeholder="Powtórz hasło" name="psw-repeat" required onChange={(e) => handleRepeatPasswordChange(e)} />
            </div>
            <div className='input'>
            <button id='button' type="submit" onSubmit={(e) => handleSubmit(e)}>Zarejestruj się</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Register;
