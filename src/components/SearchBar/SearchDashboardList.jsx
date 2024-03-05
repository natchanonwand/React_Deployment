import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SearchDash.css'

export const SearchDashboardList = ({ results }) => {
  const navigate = useNavigate();
  const [lot_Data, setLot_Data] = useState(null);
  const [isVisible, setIsVisible] = useState(true); // State to manage visibility

  useEffect(() => {
    console.log("lot_Data:", lot_Data);
  }, [lot_Data]);

  const handleResultClick = (Lot_id) => {
    // Handle click action, for example, navigate to a specific route
    navigate(`/Dashboard/${Lot_id}`);
    setLot_Data(Lot_id);
    setIsVisible(false); // Hide the component after click

  };

  if (!isVisible) return null; // Hide the component if isVisible is false

  return (
    <div className="DashList">
      {results.map((result) => (
        <div 
          className="textinDash" 
          key={result.Lot_id} 
          onClick={() => handleResultClick(result.Lot_id)}>
          <div>{result.Lot_id}</div>
        </div>
      ))}
    </div>
  );
};
