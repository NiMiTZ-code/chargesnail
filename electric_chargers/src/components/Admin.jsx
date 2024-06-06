import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';


function Admin({ chargers, removeCharger, updateCharger, addCharger, saveChargers }) {
    const handleInputChange = (index, field, value) => {
        updateCharger(index, field, value);
    };

    return (
        <div className="container mt-4">
            <div className="table-responsive">
                <table className="table table-bordered table-striped" style={{ tableLayout: 'auto' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th></th>
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
                                    <button className="btn btn-danger btn-sm" onClick={() => removeCharger(index)}>X</button>
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={charger.display_name} 
                                        onChange={(e) => handleInputChange(index, 'display_name', e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={charger.street} 
                                        onChange={(e) => handleInputChange(index, 'street', e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={charger.city} 
                                        onChange={(e) => handleInputChange(index, 'city', e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={charger.postal_code} 
                                        onChange={(e) => handleInputChange(index, 'postal_code', e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={charger.gps_lat} 
                                        onChange={(e) => handleInputChange(index, 'gps_lat', e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={charger.gps_long} 
                                        onChange={(e) => handleInputChange(index, 'gps_long', e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <select 
                                        className="form-control" 
                                        value={charger.isActive} 
                                        onChange={(e) => handleInputChange(index, 'isActive', e.target.value === 'true')}
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
                                        onChange={(e) => handleInputChange(index, 'description', e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="datetime-local" 
                                        className="form-control" 
                                        value={charger.res_start_date instanceof Date ? charger.res_start_date.toISOString().substring(0, 16) : ''} 
                                        onChange={(e) => handleInputChange(index, 'res_start_date', new Date(e.target.value))} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="datetime-local" 
                                        className="form-control" 
                                        value={charger.res_end_date instanceof Date ? charger.res_end_date.toISOString().substring(0, 16) : ''} 
                                        onChange={(e) => handleInputChange(index, 'res_end_date', new Date(e.target.value))} 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-primary mt-3 w-50" onClick={addCharger}>Dodaj ładowarkę</button>
            <button className="btn btn-primary mt-3 w-50" onClick={saveChargers}>Zapisz ładowarki</button>
        </div>
    );
}
export default Admin;