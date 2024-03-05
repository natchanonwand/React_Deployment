import { FaSearch } from "react-icons/fa";
import { useState } from 'react'
import './SearchBar.css'

export const SearchDashboard = ({ setResults , selectedBusiness }) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        if (selectedBusiness) {
            fetch(`https://weak-red-pigeon-shoe.cyclic.app/api/business/countrecords_counttray/${selectedBusiness}`)
            .then((response) => response.json())
            .then((json) =>{
                const filteredResults = json.filter((Count) => {
                    return (
                        value &&
                        Count &&
                        Count.Lot_id &&
                        Count.Lot_id.toLowerCase().includes(value.toLowerCase())
                    );
                });

                // Compute unique results based on filteredResults
                const uniqueResults = filteredResults.reduce((accumulator, result) => {
                    if (!accumulator[result.Lot_id]) {
                        accumulator[result.Lot_id] = true;
                        accumulator.uniqueResults.push(result);
                    }
                    return accumulator;
                }, { uniqueResults: [] });

                setResults(uniqueResults.uniqueResults); // Update results state with unique results
                console.log(uniqueResults.uniqueResults)
            })
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

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon"/>
            <input
                placeholder='Type to search Lot no.'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};
