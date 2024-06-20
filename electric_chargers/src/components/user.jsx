// import React, { useState, useEffect } from 'react';
// import '../styles/user.css';
// import axios from 'axios';

// function User({ user }) {
//     const [chargers, setChargers] = useState([]);
//     const [selectedCharger, setSelectedCharger] = useState(null);
//     const [reservationTime, setReservationTime] = useState(1);

//     useEffect(() => {
//         const loadAvailableChargers = async () => {
//             try {
//                 const response = await axios.get("/api/localizations", {
//                     headers: {
//                         "Authorization": `Bearer ${user.token}`
//                     }
//                 });
//                 setChargers(response.data);
//             } catch (e) {
//                 console.error(e);
//             }
//         };

//         loadAvailableChargers();
//     }, [user.token]);

//     const handleChargerSelect = (id) => {
//         setSelectedCharger(id);
//     };

//     const handleReservationTimeChange = (e) => {
//         setReservationTime(parseInt(e.target.value));
//     };

//     const handleReserve = async () => {
//         if (!selectedCharger) {
//             alert("Proszę wybrać ładowarkę do rezerwacji");
//             return;
//         }

//         const charger = chargers.find(charger => charger.id === selectedCharger);

//         try {
//             await axios.patch(`/api/localizations/update/${selectedCharger}`, {
//                 res_start_date: new Date().toISOString(),
//                 res_end_date: new Date(Date.now() + reservationTime * 3600000).toISOString(),
//                 isActive: false
//             }, {
//                 headers: {
//                     "Authorization": `Bearer ${user.token}`
//                 }
//             });

//             alert("Rezerwacja została dokonana");
//             setChargers(chargers.map(c => c.id === selectedCharger ? { ...c, isActive: false } : c));
//             setSelectedCharger(null);
//             setReservationTime(1);
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h1>Witaj, {user.name}!</h1>
//             <div className="table-responsive mt-4">
//                 <table className="table table-bordered table-striped">
//                     <thead className="thead-dark">
//                         <tr>
//                             <th>Wybierz</th>
//                             <th>Nazwa</th>
//                             <th>Ulica</th>
//                             <th>Miasto</th>
//                             <th>Kod pocztowy</th>
//                             <th>Szerokość geograficzna</th>
//                             <th>Długość geograficzna</th>
//                             <th>Aktywny</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {chargers.map((charger) => (
//                             <tr key={charger.id}>
//                                 <td>
//                                     <input
//                                         type="radio"
//                                         name="chargerSelect"
//                                         checked={selectedCharger === charger.id}
//                                         onChange={() => handleChargerSelect(charger.id)}
//                                         disabled={!charger.isActive}
//                                     />
//                                 </td>
//                                 <td>{charger.display_name}</td>
//                                 <td>{charger.street}</td>
//                                 <td>{charger.city}</td>
//                                 <td>{charger.postal_code}</td>
//                                 <td>{charger.gps_lat}</td>
//                                 <td>{charger.gps_long}</td>
//                                 <td>{charger.isActive ? "Tak" : "Nie"}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="form-group mt-4">
//                 <label htmlFor="reservationTime">Czas rezerwacji (w godzinach):</label>
//                 <select
//                     id="reservationTime"
//                     className="form-control"
//                     value={reservationTime}
//                     onChange={handleReservationTimeChange}
//                 >
//                     {[1, 2, 3, 4, 5, 6, 7, 8].map(hours => (
//                         <option key={hours} value={hours}>{hours} godzina{hours > 1 ? 'y' : ''}</option>
//                     ))}
//                 </select>
//             </div>
//             <button className="btn btn-primary mt-3" onClick={handleReserve}>Zarezerwuj</button>
//         </div>
//     );
// }

// export default User;


//TEST MODE
import React, { useState, useEffect } from 'react';
import '../styles/user.css';
import axios from 'axios';

function User({ user }) {
    const [chargers, setChargers] = useState([]);
    const [selectedCharger, setSelectedCharger] = useState(null);
    const [reservationTime, setReservationTime] = useState(1);

    const exampleChargers = [
        { id: 1, display_name: 'Ładowarka 1', street: 'ul. 3 Maja 30', city: 'Katowice', isActive: true },
        { id: 2, display_name: 'Ładowarka 2', street: 'ul. Mariacka 1', city: 'Katowice', isActive: true },
        { id: 3, display_name: 'Ładowarka 3', street: 'ul. Sienkiewicza 3', city: 'Katowice', isActive: true },
        { id: 4, display_name: 'Ładowarka 4', street: 'ul. Stawowa 10', city: 'Katowice', isActive: true },
        { id: 5, display_name: 'Ładowarka 5', street: 'ul. Dworcowa 4', city: 'Katowice', isActive: true }
    ];

    useEffect(() => {
        const loadAvailableChargers = async () => {
            try {
                const response = await axios.get("/api/localizations", {
                    headers: {
                        "Authorization": `Bearer ${user?.token}`
                    }
                });
                setChargers(response.data.length > 0 ? response.data : exampleChargers);
            } catch (e) {
                console.error(e);
                setChargers(exampleChargers);
            }
        };

        loadAvailableChargers();
    }, [user?.token]);

    const handleChargerSelect = (id) => {
        setSelectedCharger(id);
    };

    const handleReservationTimeChange = (e) => {
        setReservationTime(parseInt(e.target.value));
    };

    const handleReserve = async () => {
        if (!selectedCharger) {
            alert("Proszę wybrać ładowarkę do rezerwacji");
            return;
        }

        const charger = chargers.find(charger => charger.id === selectedCharger);

        try {
            await axios.patch(`/api/localizations/update/${selectedCharger}`, {
                res_start_date: new Date().toISOString(),
                res_end_date: new Date(Date.now() + reservationTime * 3600000).toISOString(),
                isActive: false
            }, {
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            });

            alert("Rezerwacja została dokonana");
            setChargers(chargers.map(c => c.id === selectedCharger ? { ...c, isActive: false } : c));
            setSelectedCharger(null);
            setReservationTime(1);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Witaj, {user?.name}!</h1>
            <div className="table-responsive mt-4">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Wybierz</th>
                            <th>Nazwa</th>
                            <th>Ulica</th>
                            <th>Miasto</th>
                            <th>Aktywny</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chargers.map((charger) => (
                            <tr key={charger.id}>
                                <td>
                                    <input
                                        type="radio"
                                        name="chargerSelect"
                                        checked={selectedCharger === charger.id}
                                        onChange={() => handleChargerSelect(charger.id)}
                                        disabled={!charger.isActive}
                                    />
                                </td>
                                <td>{charger.display_name}</td>
                                <td>{charger.street}</td>
                                <td>{charger.city}</td>
                                <td>{charger.isActive ? "Tak" : "Nie"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="form-group mt-4">
                <label htmlFor="reservationTime">Czas rezerwacji (w godzinach):</label>
                <select
                    id="reservationTime"
                    className="form-control"
                    value={reservationTime}
                    onChange={handleReservationTimeChange}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(hours => (
                        <option key={hours} value={hours}>{hours} godzina{hours > 1 ? 'y' : ''}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleReserve}>Zarezerwuj</button>
        </div>
    );
}

export default User;



