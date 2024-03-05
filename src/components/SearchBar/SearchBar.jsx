import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import './SearchBar.css'

export const SearchBar = ({ setResults, selectedBusiness }) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        // Fetch data using selectedBusiness
        if (selectedBusiness) {
            // Fetch data using selectedBusiness
            fetch(`https://weak-red-pigeon-shoe.cyclic.app/api/business/countrecords_counttray/${selectedBusiness}`)
            .then((response) => response.json())
            .then((json) =>{
                const results = json.filter((Count) => {
                    return (
                        value &&
                        Count &&
                        Count.Lot_id &&
                        Count.Lot_id.toLowerCase().includes(value.toLowerCase())
                    );
                });
                setResults(results);
                console.log('lot_fetched', results)
            });
        } else {
            // If no business is selected, do not fetch data
            setResults([]);
            console.log("No Business has been selected")
        }
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    return(
        <div className="input-wrapper">
            <FaSearch id="search-icon"/>
            <input placeholder='Type to search Lot no.' 
            value={input} 
            onChange={(e)=> handleChange(e.target.value)}/>
        </div>
    );
};
