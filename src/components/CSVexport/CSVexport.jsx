import exportFromJSON from 'export-from-json';
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './CSVexport.css';

function CSV() {
    const [posts, setPosts] = useState([]);
    const { lotData } = useParams();

    const fetchAndExport = () => {
        let apiUrl = 'http://localhost:3334/api/countrecords_counttray';
        if (lotData) {
            apiUrl += `/${lotData}`;
        }

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const filteredData = data.map(({ Lot_id, Direction, Timestamp, Substrate, TTL, badmark, ASSY_input, NG, Good, Business_id, Judgement, Machine_name }) => ({
                    Lot_id,
                    Direction,
                    Timestamp,
                    Substrate,
                    TTL,
                    badmark,
                    ASSY_input,
                    NG,
                    Good,
                    Machine_name,
                    Judgement
                }));

                setPosts(filteredData);
                const fileName = `${lotData || 'export'}`;
                const exportType = exportFromJSON.types.csv;
                exportFromJSON({ data: filteredData, fileName, exportType });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%'
            }}
        >
            <button className='ExportButton' onClick={fetchAndExport}>
                {lotData ? "Export" : "Export All"}
            </button>
        </div>
    );
}

export default CSV;
