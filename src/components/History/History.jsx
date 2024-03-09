import React, { useState, useRef, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import { SearchBar } from "../SearchBar/SearchBar.jsx";
import { SearchResultsList } from "../SearchBar/SearchResultsList.jsx";
import './History.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CSV from '../CSVexport/CSVexport';
import Dropdown from '../DropdownBiz/Dropdown.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

const History = () => {
  const [results, setResults] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
  });
  const [selectedBusiness, setSelectedBusiness] = useState(""); // State for selected Business_id
  console.log("BizH", selectedBusiness)
  // Initialize selectedBusiness state with value from Local Storage on component mount
  useEffect(() => {
    const storedSelectedBusiness = localStorage.getItem("selectedBusiness");
    if (storedSelectedBusiness) {
      setSelectedBusiness(storedSelectedBusiness);
    }
  }, []);

  const calendarRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setOpenDate(false);
    }
  };

  const fetchDataByDateRange = async () => {
      try {
          const formattedStartDate = date.startDate.toISOString().replace(/\.\d+Z/, '').replace('T', ' ');
          const formattedEndDate = date.endDate.toISOString().replace(/\.\d+Z/, '').replace('T', ' ');
          const response = await fetch(`https://weak-red-pigeon-shoe.cyclic.app/api/countrecords_counttray/${selectedBusiness}/datetime_range/${formattedStartDate}/${formattedEndDate}`);
          if (!response.ok) {
              throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setResults(data);
          console.log('Data fetched:', data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  const handleSearch = () => {
      fetchDataByDateRange();
      setOpenDate(false); // Close the calendar
  };

  const handleChange = (ranges) => {
      setDate(ranges.selection);
  };

  const handleClick = () => {
      setOpenDate(prev => !prev);
  };

  return (
      <div className='History'>
        <Sidebar/>
          <div className='wrapHis'>
                {/* Top bar components */}
                <div className="Bar">
                    <div style={{display:'flex', width:'20vw'}}>
                      <h1 className='centered-H'>History</h1>
                      <Dropdown setSelectedBusiness={setSelectedBusiness} /> {/* Pass setSelectedBusiness to Dropdown */}
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end', width:'45vw'}}>
                      <div className='Export'>
                        <CSV/>
                      </div>
                      <div className="container" ref={calendarRef}>
                          <button onClick={handleClick} className={`calendar ${openDate ? 'open' : ''}`}>
                              <EditCalendarIcon className='icon'/>
                              <span className="date-range-text">
                                  {`${format(date.startDate, 'dd/MMM/yyyy')} - ${format(date.endDate, 'dd/MMM/yyyy')} `}
                              </span>
                          </button>
                          {openDate && (<DateRangePicker
                              className='dateRange'
                              ranges={[date]}
                              onChange={handleChange}
                              maxDate={new Date()}
                          />)}
                          <button onClick={handleSearch} className='SearchButton'>Search</button> {/* Add Search button */}
                      </div>
                      <div className="SearchbarH">
                          {/* Pass setResults and selectedBusiness to SearchBar */}
                          <SearchBar setResults={setResults} selectedBusiness={selectedBusiness} />
                      </div>
                    </div>
                </div>
                {/* End of top bar */}
                {/* Search results component */}
                <div className='List-bar'>
                    <SearchResultsList results={results}/>
                </div>
                {/* End of search results */}
          </div>
          
      </div>
  );
};

export default History;
