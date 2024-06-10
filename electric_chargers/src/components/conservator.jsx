// src/Conservator.jsx
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function Conservator() {
    const [chargers, setChargers] = useState([
        {
            display_name: "Ładowarka 1",
            street: "Ulicka",
            city: "Bedzin",
            postal_code: "42-500",
            gps_lat: "50.06143",
            gps_long: "19.93658",
            isActive: true,
            description: "Fajna ładowarka",
            res_start_date: new Date(),
            res_end_date: new Date(new Date().getTime() + 86400000)
        },
        {
            display_name: "Ładowarka 2",
            street: "Ulicka",
            city: "Bedzin",
            postal_code: "42-500",
            gps_lat: "50.06143",
            gps_long: "19.93658",
            isActive: false,
            description: "Druga fajna ładowarka",
            res_start_date: new Date(),
            res_end_date: new Date(new Date().getTime() + 86400000)
        }
    ]);

    const updateCharger = (index, field, value) => {
        const newChargers = [...chargers];
        newChargers[index][field] = value;
        setChargers(newChargers);
    };

    const saveChargers = () => {
        console.log("Saved chargers:", chargers);
    };

    return (
        <div className="container mt-4">
            <div className="table-responsive">
                <table className="table table-bordered table-striped" style={{ tableLayout: 'auto' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>Nazwa</th>
                            <th>Ulica</th>
                            <th>Miasto</th>
                            <th>Kod pocztowy</th>
                            <th>Szerokość geograficzna</th>
                            <th>Długość geograficzna</th>
                            <th>Aktywny</th>
                            <th>Opis</th>
                            <th>Początkowa data rezerwacji</th>
                            <th>Końcowa data rezerwacji</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chargers.map((charger, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={charger.display_name}
                                        onChange={(e) => updateCharger(index, 'display_name', e.target.value)}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={charger.street}
                                        onChange={(e) => updateCharger(index, 'street', e.target.value)}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={charger.city}
                                        onChange={(e) => updateCharger(index, 'city', e.target.value)}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={charger.postal_code}
                                        onChange={(e) => updateCharger(index, 'postal_code', e.target.value)}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={charger.gps_lat}
                                        onChange={(e) => updateCharger(index, 'gps_lat', e.target.value)}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={charger.gps_long}
                                        onChange={(e) => updateCharger(index, 'gps_long', e.target.value)}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        value={charger.isActive}
                                        onChange={(e) => updateCharger(index, 'isActive', e.target.value === 'true')}
                                    >
                                        <option value="true">Tak</option>
                                        <option value="false">Nie</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={charger.description}
                                        onChange={(e) => updateCharger(index, 'description', e.target.value)}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={charger.res_start_date instanceof Date ? charger.res_start_date.toISOString().substring(0, 16) : ''}
                                        onChange={(e) => updateCharger(index, 'res_start_date', new Date(e.target.value))}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={charger.res_end_date instanceof Date ? charger.res_end_date.toISOString().substring(0, 16) : ''}
                                        onChange={(e) => updateCharger(index, 'res_end_date', new Date(e.target.value))}
                                        readOnly
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-primary w-50" onClick={saveChargers}>Zapisz ładowarki</button>
                <button className="btn btn-danger w-50 ml-2" style={{ marginLeft: '10px' }} onClick={() => window.history.back()}>Anuluj</button>
            </div>
        </div>
    );
}

export default Conservator;
