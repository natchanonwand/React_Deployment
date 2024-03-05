import React, { useState, useEffect } from "react";
import './Dropdown.css'

const Dropdown = ({ setSelectedBusiness }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selected, setSelected] = useState(localStorage.getItem("selectedBusiness") || "");

  useEffect(() => {
    fetch("https://weak-red-pigeon-shoe.cyclic.app/api/business") 
      .then((response) => response.json())
      .then((data) => {
        setBusinesses(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSelectChange = (event) => {
    const selectedBusiness = event.target.value;
    setSelectedBusiness(selectedBusiness);
    setSelected(selectedBusiness);
    localStorage.setItem("selectedBusiness", selectedBusiness);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Implement blinking logic here if needed
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <form>
          <select value={selected} className={` DropBox ${selected ? 'static' : 'blinking'}`} onChange={handleSelectChange}>
            <option value="">Select Business</option>
            {businesses.map((business) => (
              <option key={business.Business_id} value={business.Business_id}>
                {business.Business_name}
              </option>
            ))}
          </select>
      </form>
    </div>
  );
};

export default Dropdown;
