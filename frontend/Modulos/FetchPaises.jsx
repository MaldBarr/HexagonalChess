import React, { useState, useEffect } from 'react';
import JSON from '../JSON/countries.json';

function fetchPaises() {
    const [paises, setPaises] = useState([]);
    useEffect(() => {
        setPaises(JSON);
    }, []);
    return (
        <>
            <select id="pais" required>
                <option value="" disabled selected>Seleccione un país</option>
                {paises.map((data,i) => (
                    <option value={i} key={i}>
                        {data.name}
                    </option>
                ))}
            </select>
        </>
    )
}

export default fetchPaises;