import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CSV from '../CSVexport/CSVexport';
import './SearchDetails.css'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Sidebar from '../Sidebar/Sidebar.jsx';

export const SearchDetails = () => {
    const { lotData } = useParams();
    const [details, setDetails] = useState(null);
    const [axisData, setAxisData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchCountRecordsCountTray = () => {
            fetch(`http://localhost:3334/api/countrecords_counttray/${lotData}`)
                .then(response => response.json())
                .then(data => {
                    setDetails(data); 
                    console.log("FetchedYourSoul:", data); 
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        };
    
        const fetchCountRecords = () => {
            fetch(`http://localhost:3334/api/countrecords/${lotData}`)
                .then(response => response.json())
                .then(data => {
                    setAxisData(data); 
                    console.log("FetchedAxisData:", data); 
                })
                .catch(error => {
                    console.error("Error fetching Axis data:", error);
                });
        };
    
        fetchCountRecordsCountTray(); // Fetch data initially
        fetchCountRecords(); // Fetch data initially
    
        const intervalId = setInterval(() => {
            fetchCountRecordsCountTray();
            fetchCountRecords();
        }, 60000); // Fetch data every 60 seconds 
    
        return () => {
            clearInterval(intervalId); // Clean up the interval on component unmount
        };
    }, [lotData]);
    

    const totalPages = Math.ceil(details?.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDetails = details?.slice(indexOfFirstItem, indexOfLastItem);
    const currentAxis = axisData?.slice(indexOfFirstItem, indexOfLastItem); 

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


return (
    <div className='Details'>
        <Sidebar/>
        <div className="wrapDetail">
                <div className="Barr">
                            <h1 className='centered-Details'>{lotData}</h1>
                            <div className='Export'>
                                <CSV/>
                            </div>
                        </div>
                        <div className='List-details'>
                
                            {/* Left Column*/}
                            <div className="left-column">
                                <h2>AXIS Data</h2>
                                {currentAxis && currentAxis.map((axisItem, index) => (
                                <div key={index} className="detail-item">
                                    <div style={{ display: 'flex', justifyContent: 'space-between',height:'13%', margin: '2px'}}>
                                        <h3>Process:</h3><div style={{display:'flex'}}><h3 style={{marginRight:'20px'}}>{axisItem.Machine_name}</h3>  <h3>{axisItem.Direction}</h3></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: ' #e6e6e6',height:'13%', margin: '2px' }}>
                                        <p>Good: </p><p>{axisItem.Good !== null ? axisItem.Good : 0}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between',height:'13%', margin: '2px'}}>
                                        <p>Substrate:</p><p>{axisItem.Substrate !== null ? axisItem.Substrate : 0}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: ' #e6e6e6',height:'13%', margin: '2px'}}>
                                        <p>TTL:</p><p>{axisItem.TTL !== null ? axisItem.TTL : 0}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between',height:'13%', margin: '2px'}}>
                                        <p>Badmark:</p><p>{axisItem.badmark !== null ? axisItem.badmark : 0}</p> {/* Conditionally render '0' if detail.badmark is null */}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' , backgroundColor: ' #e6e6e6',height:'13%', margin: '2px'}}>
                                        <p>ASSY Input: </p><p>{axisItem.ASSY_input !== null ? axisItem.ASSY_input : 0}</p> {/* Conditionally render '0' if detail.ASSY_input is null */}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between',height:'13%' , margin: '2px'}}>
                                        <p>NG:</p><p>{axisItem.NG !== null ? axisItem.NG : 0}</p>{/* Conditionally render '0' if detail.NG is null */}
                                    </div>
                                </div>
                                    ))}
                            </div>

                            {/* Middle Column - Blank */}
                            <div className="details-column">
                                <h2>Actual Count</h2>
                                {currentDetails && currentDetails.map((detail, index) => (
                                <div key={index} className="detail-item">
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' ,height:'13%', margin: '2px'}}>
                                        <h3>{detail.Timestamp}</h3>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: ' #e6e6e6',height:'13%' , margin: '2px'}}>
                                        <p>{detail.Good !== null ? detail.Good : 0}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end',height:'13%', margin: '2px'}}>
                                        <p>{detail.Substrate !== null ? detail.Substrate : 0}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: ' #e6e6e6',height:'13%', margin: '2px'}}>
                                        <p>{detail.TTL !== null ? detail.TTL : 0}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end',height:'13%', margin: '2px'}}>
                                        <p>{detail.badmark !== null ? detail.badmark : 0}</p> {/* Conditionally render '0' if detail.badmark is null */}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: ' #e6e6e6',height:'13%', margin: '2px'}}>
                                        <p>{detail.ASSY_input !== null ? detail.ASSY_input : 0}</p> {/* Conditionally render '0' if detail.ASSY_input is null */}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end',height:'13%' , margin: '2px'}}>
                                        <p>{detail.NG !== null ? detail.NG : 0}</p>{/* Conditionally render '0' if detail.NG is null */}
                                    </div>
                                </div>
                                ))}
                            </div>

                            {/* Right Column - Blank */}
                            <div className="judgement-column">
                                <h2>Status</h2>
                                {currentDetails && currentDetails.map((detail, index) =>(
                                    <div
                                    style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '31%',
                                    background:`${detail.Judgement === 'Correct' ? '#c3f9c4' : '#ff9ebb'}`,
                                    border: `1px solid ${detail.Judgement === 'Correct' ? '#549900' : '#9c263d'}`,
                                    borderRadius: '10px',
                                    margin: '2px'
                                    }}
                                >
                                    <p 
                                        style={{ 
                                            fontSize:'20px',
                                            fontWeight: 'bold', 
                                            color: detail.Judgement === 'Correct' ? '#549900' : '#9c263d' 
                                            }}>
                                    {detail.Judgement !== null ? detail.Judgement : "Data incomplete"}
                                    </p>
                                </div>
                                ))}
                            </div>
                            
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="paginat">
                                {/* Pagination buttons */}
                                {totalPages > 1 && (
                                <div className="paginat">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <ArrowCircleLeftIcon 
                                            style={{ 
                                                fontSize: '30px',
                                                justifyContent: "center",
                                                color: currentPage === 1 ? "#333" : "white" 
                                            }}
                                        />
                                    </button>
                                    <span>{currentPage}</span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ArrowCircleRightIcon
                                            style={{ 
                                                fontSize: '30px',
                                                justifyContent: "center",
                                                color: currentPage === totalPages ? "#333" : "white"
                                            }}
                                        />
                                    </button>
                                </div>
                            )}
                            </div>
                        )}
        </div>
        
    </div>
);
}

