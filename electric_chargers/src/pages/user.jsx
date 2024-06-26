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
    const [editReservation, setEditReservation] = useState(null);
    const [chargers, setChargers] = useState([]);
    const [selectedCharger, setSelectedCharger] = useState(null); 
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reservations, setReservations] = useState([]);
    const [futureReservations, setFutureReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    

    useEffect(() => {
        const loadAvailableChargers = async () => {
            try {
                const response = await axios.get("/api/localizations", {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                const chargersWithCoords = await Promise.all(response.data.map(async (charger) => {
                    const coords = await geocodeAddress(`${charger.street}, ${charger.city}`);
                    return { ...charger, ...coords };
                }));
                setChargers(chargersWithCoords);
            } catch (e) {
                console.error("Error loading chargers:", e);
            }
        };

        const loadReservations = async () => {
            try {
                const response = await axios.get("/api/reserve/past-reservations", {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                setReservations(response.data);
                const now = new Date();
                setFutureReservations(response.data.filter(res => new Date(res.start_date) > now));
                setPastReservations(response.data.filter(res => new Date(res.end_date) < now));
            } catch (e) {
                console.error("Error loading reservations:", e);
            }
        };

        loadAvailableChargers();
        loadReservations();
    }, [sessionStorage.getItem('token')]);

    const geocodeAddress = async (address) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: address,
                    format: 'json',
                    addressdetails: 1,
                    limit: 1
                }
            });
            if (response.data.length > 0) {
                return {
                    gps_lat: parseFloat(response.data[0].lat),
                    gps_long: parseFloat(response.data[0].lon)
                };
            }
        } catch (e) {
            console.error('Geocoding error:', e);
        }
        return { gps_lat: 0, gps_long: 0 };
    };

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
            await axios.post('/api/reserve/add', {
                localization_id: selectedCharger,
                start_date: new Date(startDate),
                end_date: new Date(endDate)
            }, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            alert("Rezerwacja została dokonana");
            setChargers(chargers.map(c => c.id === selectedCharger ? { ...c, isActive: false } : c));
            setSelectedCharger(null);
            setStartDate('');
            setEndDate('');
            const response = await axios.get("/api/reserve/past-reservations", {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            setReservations(response.data);
            const now = new Date();
            setFutureReservations(response.data.filter(res => new Date(res.start_date) > now));
            setPastReservations(response.data.filter(res => new Date(res.end_date) < now));
        } catch (e) {
            console.error("Error making reservation:", e);
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleEditReservation = (reservation) => {
        setEditReservation(reservation);
        setSelectedReservation(reservation.id);
        setSelectedCharger(reservation.id)
        setStartDate(new Date(reservation.start_date).toISOString().slice(0, 16));
        setEndDate(new Date(reservation.end_date).toISOString().slice(0, 16));
    };

    

    const handleUpdateReservation = async () => {
        if (!selectedCharger || !startDate || !endDate) {
            alert("Proszę wypełnić wszystkie pola rezerwacji");
            return;
        }

        try {
            await axios.patch("/api/reserve/update", {
                id: selectedReservation ,
                start_date: new Date(startDate).toISOString(),
                end_date: new Date(endDate).toISOString()
            }, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            alert("Rezerwacja została zaktualizowana");
            setEditReservation(null);
            setSelectedCharger(null);
            setStartDate('');
            setEndDate('');

            const response = await axios.get("/api/reserve/past-reservations", {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            setReservations(response.data);
            const now = new Date();
            setFutureReservations(response.data.filter(res => new Date(res.start_date) > now));
            setPastReservations(response.data.filter(res => new Date(res.end_date) < now));
        } catch (e) {
            console.error("Error updating reservation:", e);
        }
    };

    const deleteResource = async (resourceId) => {
        try {
          const response = await axiosInstance.request({
            method: 'delete',
            url: '/resource',
            data: {
              id: resourceId
            },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          });
          console.log('Delete successful:', response.data);
        } catch (error) {
          console.error('Error deleting resource:', error);
        }
      };

    /*const handleDeleteReservation = async (reservation) => {
        try {
            console.log(reservation.id);
            console.log(sessionStorage.getItem("token"));
            await axios.delete("/api/reserve/delete", {
                id: reservation.id,},
            {headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            alert("Rezerwacja została usunięta");
            setFutureReservations(futureReservations.filter((res) => res.id !== reservation.id));
            setReservations(reservations.filter((res) => res.id!== reservation.id));
            //setPastReservations(pastReservations.filter((res) => res.id !== reservation.id));
        } catch (e) {
            console.error("Error deleting reservation:", e);
        }
    };*/

    const handleDeleteReservation = async (reservation) => {
        try {
            console.log(reservation.id);
            console.log(sessionStorage.getItem("token"));
            await axios.delete("/api/reserve/delete", {
                data: { id: reservation.id },
                headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
            alert("Rezerwacja została usunięta");
            setFutureReservations(futureReservations.filter((res) => res.id !== reservation.id));
            setReservations(reservations.filter((res) => res.id!== reservation.id));
            //setPastReservations(pastReservations.filter((res) => res.id !== reservation.id));
        } catch (e) {
            console.error("Error deleting reservation:", e);
        }
    };


    return (
        <div className="container mt-4">
            <h1 className="text-center">Witaj, {user?.name || 'Użytkowniku'}!</h1>

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
                                                disabled={selectedCharger !== null && selectedCharger !== charger.id}
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
                        <MapContainer center={[50.261, 19.020]} zoom={13} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {chargers.map(charger => (
                                <Marker key={charger.id} position={[charger.gps_lat, charger.gps_long]} icon={customIcon}>
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
                    <button className="btn btn-primary btn-block mt-3" onClick={editReservation ? handleUpdateReservation : handleReserve}>
                        {editReservation ? "Zaktualizuj rezerwację" : "Zarezerwuj"}
                    </button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <h3>Obecne Rezerwacje</h3>
                    <ul className="list-group">
                        {futureReservations.map((reservation) => (
                            <li key={reservation.id} className="list-group-item">
                                Ładowarka: {reservation.localization_id} <br />
                                Od: {new Date(reservation.start_date).toLocaleString()} <br />
                                Do: {new Date(reservation.end_date).toLocaleString()} <br />
                                <button className="btn btn-secondary mt-2" onClick={() => handleEditReservation(reservation)}>
                                    Edytuj
                                </button>
                                <button className="btn btn-danger mt-2" onClick={()=> handleDeleteReservation(reservation)}>
                                    Usuń
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    <h3>Poprzednie Rezerwacje</h3>
                    <ul className="list-group">
                        {pastReservations.map(reservation => (
                            <li key={reservation.id} className="list-group-item">
                                Ładowarka: {reservation.localization_id} <br />
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