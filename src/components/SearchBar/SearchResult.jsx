import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [lotData, setLotData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("lotData:", lotData);
    console.log("showDetails:", showDetails);
  }, [lotData, showDetails]);

  const handleResultClick = () => {
    fetch(`https://weak-red-pigeon-shoe.cyclic.app/api/countrecords_counttray/${result.Lot_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        setLotData(data);
        setShowDetails((prevShowDetails) => !prevShowDetails);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
    navigate(`/SearchDetails/${result.Lot_id}`);
  };

  return (
    <div className="search-result">
      <div className="textinthebox" onClick={handleResultClick} >
        <div>{result.Lot_id}</div> 
        <div>{result.Timestamp}</div>
      </div>
      
    </div>
  );
};
