import React, { useState, useEffect, useCallback } from 'react';
import "./DashboardBox.css"

const TrackingBox = ({ Machine_ID, Direction, lot_Data }) => {
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3334/api/countrecords_counttray/Position/${Machine_ID}/${Direction}/${lot_Data}`);
      const jsonData = await response.json();
      setData(jsonData);
      console.log('path', lot_Data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [Machine_ID, Direction, lot_Data]); // Include all dependencies in the dependency array

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [fetchData]); // Include fetchData in the dependency array

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
        </div>
      ) : (
        <p>-</p>
      )}
    </div>
  );
};

export default TrackingBox;
