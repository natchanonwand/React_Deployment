import React, { useState, useEffect } from 'react';
import "./DashboardBox.css"

const DashboardBox = ({ Machine_ID, Direction }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3334/api/countrecords_counttray/Position/${Machine_ID}/${Direction}/`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 30 seconds
    const intervalId = setInterval(fetchData, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [Machine_ID, Direction]); // Include Machine_ID and Direction in the dependency array

  return (
    <div className="dashboard-box">
      {Machine_ID === 1 || Machine_ID === 2 ? null : (
        <h3>
          {Direction === 'in' ? 'Before' : 'After'}
        </h3>
      )}
      {data ? (
        <div>
          <p>{data.TTL}</p>
          <p style={{fontSize:'15px' , fontWeight:'bold' , color: 'black'}}>{data.Lot_id}</p>
        </div>
      ) : (
        <p>-</p>
      )}
    </div>
  );
};

export default DashboardBox;
