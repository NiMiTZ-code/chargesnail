import '../styles/style.css';
import React, {useState, useEffect} from 'react';

import Admin from './admin.jsx';
import { useLocation } from 'react-router-dom';
import {Charger} from "../models/Charger.js";
import Main from './main.jsx';
import axios from 'axios';
import Uhome from "./uhome.jsx";


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
        if(typeof(id)==="number"){
          await axios.delete(`/api/localizations/delete/${id}`, {
            headers: {
              "Authorization": `Bearer ${user.token}`
            }});
        }
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
  console.log(chargers);
}

useEffect(() => {
  loadChargers();
}, [isAdmin])

const saveChargers = async () => {
  for(const charger of chargers){
    charger.gps_lat = charger.gps_lat.toString();
    charger.gps_long = charger.gps_long.toString();
    const {id,...chargerWithoutId } = charger;
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    console.log(charger);

    try{
      if(typeof(id) === "number")
          await axios.patch(`/api/localizations/update/${id}`, chargerWithoutId, config);
      else{
          await axios.post(`/api/localizations/add`, chargerWithoutId, config);
          
      }
  }catch(e){
      console.error(e);
  }
  

  }
  await loadChargers();
}
  

  return (
    <>
      {!isAdmin && (
        <Uhome/>
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