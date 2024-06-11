import React, {useState, useEffect} from 'react';
import '../styles/style.css';
import Admin from './Admin';
import Conservator from './conservator';
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

  const [chargers, setChargers] = useState([]);

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

const loadChargers = async () => {
  if(!isAdmin)
    return 
  try{
    const response = await axios.get("/api/localizations", null, {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    setChargers(response.data);
  }catch(e){
    console.error(e);
  }
}

useEffect(() => {
  loadChargers();
}, [isAdmin])

const saveChargers = async () => {
  // Na razie usuwamy date z ladowarki - pozniej sie to usunie
  const entries = Object.entries(chargers[0]);
  const newEntries = entries.slice(0, -2);
  const newCharger = Object.fromEntries(newEntries);
  try{
    const response = await axios.post("/api/localizations/add", newCharger, {
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