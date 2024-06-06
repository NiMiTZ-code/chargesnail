import React, {useState, useEffect} from 'react';
import '../styles/style.css';
import Admin from './Admin';
import { useLocation } from 'react-router-dom';
import {Charger} from "../models/Charger";
import MainPage from './mainPage';


function Home() {
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
  }, [state]);

  const [chargers, setChargers] = useState([
    new Charger("Ładowarka 1", "Ulicka", "Bedzin", "42-500", "szerokosc", "dlugosc", true, "Fajna ladowarka", new Date(), new Date(new Date() + 1)),
    new Charger("Ładowarka 2", "Ulicka", "Bedzin", "42-500", "szerokosc", "dlugosc", true, "Fajna ladowarka", new Date(), new Date(new Date() + 1))
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

const saveChargers = () => {

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