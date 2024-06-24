import '../styles/style.css';
import React, {useState, useEffect} from 'react';

import Admin from './admin.jsx';
import { useLocation } from 'react-router-dom';
import {Charger} from "../models/Charger.js";
import Main from './main.jsx';
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

  const removeCharger = async (id) => {
    try{
      await axios.delete(`/api/localizations/delete/${id}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }});
      setChargers(prevChargers => prevChargers.filter((charger) => charger.id !== id));
    }catch(e){
      console.error(e);
    }
  }

  const updateCharger = async (id, field, value) => {
    setChargers(prevChargers => {
      return prevChargers.map(charger => 
        charger.id === id ? { ...charger, [field]: value } : charger
      );
    });
  }


const addCharger = () => {
  setChargers([...chargers, new Charger({ id: null })]);
}

const loadChargers = async () => {
  if(!isAdmin)
    return 
  try{
    const response = await axios.get("/api/localizations", {
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
  for(const charger of chargers){
    charger.gps_lat = charger.gps_lat.toString();
    charger.gps_long = charger.gps_long.toString();
    const {res_start_date, res_end_date, id, ...chargerWithoutDates} = charger;
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }

    try{
      if(id.id === null){
        await axios.post(`/api/localizations/add`, chargerWithoutDates, config);
      }else{
        await axios.patch(`/api/localizations/update/${id}`, chargerWithoutDates,config);
      }
    }catch(e){
      console.error(e);
    }

  }
}
  

  return (
    <>
      {!isAdmin && (
        <Main/>
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