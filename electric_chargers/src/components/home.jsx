import React, {useState, useEffect} from 'react';
import '../styles/style.css';
import Admin from './Admin';
import { useLocation } from 'react-router-dom';
import {Charger} from "../models/Charger";
import MainPage from './mainPage';
import axios from 'axios';


function Home() {
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const state = location.state;
  useEffect(()=>{
    window.history.replaceState({},"")
  },[])
  useEffect(() => {
    if (state && state.isAdmin) {
      
      setIsAdmin(state.isAdmin) 
    }

    if (state && state.user) {
      
      setUser(state.user)
    }
  }, [state]);

  const [chargers, setChargers] = useState([
    new Charger("Ładowarka 1", "Ulicka", "Bedzin", "42-500", "45.123456", "45.123456", true, "Fajna ladowarka", new Date(), new Date(new Date() + 1)),
    new Charger("Ładowarka 2", "Ulicka", "Bedzin", "42-500", "45.123456", "45.123456", true, "Fajna ladowarka", new Date(), new Date(new Date() + 1))
  ]);

  const removeCharger = (index) => {
    setChargers(prevChargers => prevChargers.filter((_, i) => i !== index));
  }

  const updateCharger = (index, field, value) => {
    setChargers(prevChargers => {
        const updatedChargers = [...prevChargers];
        updatedChargers[index] = { ...updatedChargers[index], [field]: value };
        return updatedChargers;
    });
};

const addCharger = () => {
  setChargers([...chargers, new Charger()]);
}

const saveChargers = async () => {
  try{
    const response = await axios.post("/api/localizations/add", chargers[0], {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    console.log(response);
  }catch(e){
    console.error(e);
  }
}
  

  return (
    <>
      {!isAdmin && (
        <MainPage/>
      )}

      {isAdmin && (
        <Admin
          chargers={chargers}
          removeCharger={removeCharger}
          updateCharger={updateCharger}
          addCharger={addCharger}
          saveChargers={saveChargers}
        />
      )}
    </>
  );
}

export default Home;