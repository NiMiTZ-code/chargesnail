// import React, {useEffect} from 'react';
// import {useNavigate, BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import Home from './home.jsx';
// import Login from './login.jsx';
// import Register from './register.jsx';
// import User from './user.jsx';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/user" element={<User />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


//TEST MODE!!! -- wcześniejsze
//import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from '../pages/home.jsx';
//import Login from '../pages/login.jsx';
//import Register from '../pages/register.jsx';
//import User from '../pages/user.jsx';


import AuthProvider from "../provider/authProvider.jsx";
import Routes from "../routes/index.jsx"
function App() {
  return(
      <AuthProvider>
        <Routes />
      </AuthProvider>
  )
  // Tymczasowe dane użytkownika --wcześniejsze
  //const testUser = {
   // name: 'Test User',
   // token: 'test-token'
  //};

  //return (
  //  <Router>
   //   <Routes>
    //    <Route path="login" element={<Login />} />
     //   <Route path="register" element={<Register />} />
    //    <Route path="/" element={<Home />} />
     //   <Route path="user" element={<User user={testUser} />} /> {/* Przekazujemy tymczasowego użytkownika */}

    //  </Routes>
  // </Router>
 // );
}

export default App;

