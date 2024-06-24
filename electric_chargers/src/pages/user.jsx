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
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet';
import axios from 'axios';
import '../styles/user.css';

const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

function User({ user }) {
    const [chargers, setChargers] = useState([]);
    const [selectedCharger, setSelectedCharger] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reservations, setReservations] = useState([]);
    const [futureReservations, setFutureReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);

    const exampleChargers = [
        { id: 1, display_name: 'Ładowarka 1', street: 'ul. 3 Maja 30', city: 'Katowice', position: [50.2599, 19.0275], isActive: true },
        { id: 2, display_name: 'Ładowarka 2', street: 'ul. Mariacka 1', city: 'Katowice', position: [50.2584, 19.0240], isActive: true },
        { id: 3, display_name: 'Ładowarka 3', street: 'ul. Sienkiewicza 3', city: 'Katowice', position: [50.2592, 19.0184], isActive: true },
        { id: 4, display_name: 'Ładowarka 4', street: 'ul. Stawowa 10', city: 'Katowice', position: [50.2587, 19.0280], isActive: true },
        { id: 5, display_name: 'Ładowarka 5', street: 'ul. Dworcowa 4', city: 'Katowice', position: [50.2573, 19.0252], isActive: true }
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

        const loadReservations = async () => {
            try {
                const response = await axios.get("/api/reservations", {
                    headers: {
                        "Authorization": `Bearer ${user?.token}`
                    }
                });
                setReservations(response.data);
                const now = new Date();
                setFutureReservations(response.data.filter(res => new Date(res.start_date) > now));
                setPastReservations(response.data.filter(res => new Date(res.end_date) < now));
            } catch (e) {
                console.error(e);
            }
        };

        loadAvailableChargers();
        loadReservations();
    }, [user?.token]);

    const handleChargerSelect = (id) => {
        setSelectedCharger(id);
    };

    const handleReserve = async () => {
        if (!selectedCharger || !startDate || !endDate) {
            alert("Proszę wypełnić wszystkie pola rezerwacji");
            return;
        }

        const charger = chargers.find(charger => charger.id === selectedCharger);

        try {
            await axios.post('/api/reservations', {
                charger_id: selectedCharger,
                start_date: new Date(startDate).toISOString(),
                end_date: new Date(endDate).toISOString()
            }, {
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            });

            alert("Rezerwacja została dokonana");
            setChargers(chargers.map(c => c.id === selectedCharger ? { ...c, isActive: false } : c));
            setSelectedCharger(null);
            setStartDate('');
            setEndDate('');
            const response = await axios.get("/api/reservations", {
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            });
            setReservations(response.data);
            const now = new Date();
            setFutureReservations(response.data.filter(res => new Date(res.start_date) > now));
            setPastReservations(response.data.filter(res => new Date(res.end_date) < now));
        } catch (e) {
            console.error(e);
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Witaj, {user?.name}!</h1>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
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
                </div>
                <div className="col-md-6">
                    <div style={{ height: "300px", width: "100%" }}>
                        <MapContainer center={[50.2590, 19.0230]} zoom={15} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {chargers.map(charger => (
                                <Marker key={charger.id} position={charger.position} icon={customIcon}>
                                    <Popup>{charger.display_name}</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6 offset-md-3">
                    <div className="form-group">
                        <label htmlFor="startDate">Czas rozpoczęcia:</label>
                        <input
                            type="datetime-local"
                            id="startDate"
                            className="form-control"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">Czas zakończenia:</label>
                        <input
                            type="datetime-local"
                            id="endDate"
                            className="form-control"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </div>
                    <button className="btn btn-primary btn-block mt-3" onClick={handleReserve}>Zarezerwuj</button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <h3>Obecne Rezerwacje</h3>
                    <ul className="list-group">
                        {futureReservations.map(reservation => (
                            <li key={reservation.id} className="list-group-item">
                                Ładowarka: {reservation.charger.display_name} <br />
                                Od: {new Date(reservation.start_date).toLocaleString()} <br />
                                Do: {new Date(reservation.end_date).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3>Poprzednie Rezerwacje</h3>
                    <ul className="list-group">
                        {pastReservations.map(reservation => (
                            <li key={reservation.id} className="list-group-item">
                                Ładowarka: {reservation.charger.display_name} <br />
                                Od: {new Date(reservation.start_date).toLocaleString()} <br />
                                Do: {new Date(reservation.end_date).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default User;
