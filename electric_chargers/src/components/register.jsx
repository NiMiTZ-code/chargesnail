import React, {useState} from 'react';
import "../styles/style.css";

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
        /*const res = await axios.post(null, {
          username: cleanUsername,
          password: cleanPassword
        });*/
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
            <label htmlFor="uname"><b>Nazwa użytkownika</b></label>
            <input type="text" placeholder="Wprowadź nazwę użytkownika" name="uname" required onChange={(e) => handleUsernameChange(e)} />

            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Wprowadź Email" name="email" required onChange={(e) => handleEmailChange(e)} />

            <label htmlFor="psw"><b>Hasło</b></label>
            <input type="password" placeholder="Wprowadź hasło" name="psw" required onChange={(e) => handlePasswordChange(e)} />

            <label htmlFor="psw-repeat"><b>Powtórz hasło</b></label>
            <input type="password" placeholder="Powtórz hasło" name="psw-repeat" required onChange={(e) => handleRepeatPasswordChange(e)} />

            <button type="submit" onSubmit={(e) => handleSubmit(e)}>Zarejestruj się</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Register;
