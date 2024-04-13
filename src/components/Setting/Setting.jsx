import Sidebar from '../Sidebar/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Setting = () => {
    const [businesses, setBusinesses] = useState([]);
    const [editingBusinessId, setEditingBusinessId] = useState(null);
    const [newBusinessName, setNewBusinessName] = useState('');
    const [stations, setStations] = useState({});
    const [editingStationId, setEditingStationId] = useState(null);
    const [newStationName, setNewStationName] = useState('');
    const [showAddStationInput, setShowAddStationInput] = useState(false);
    const [showAddBusinessInput, setShowAddBusinessInput] = useState(false);

    useEffect(() => {
        fetchBusinesses();
    }, []);

    const fetchBusinesses = async () => {
        try {
            const response = await axios.get('https://weak-red-pigeon-shoe.cyclic.app/api/business');
            setBusinesses(response.data);
        } catch (error) {
            console.error("Failed to fetch businesses:", error);
        }
    };

    const fetchStationsForBusiness = async (businessId) => {
        try {
            const response = await axios.get(`https://weak-red-pigeon-shoe.cyclic.app/api/station?business_id=${businessId}`);
            setStations(prevState => ({
                ...prevState,
                [businessId]: response.data.sort((a, b) => a.Machine_name.localeCompare(b.Machine_name))
            }));
        } catch (error) {
            console.error(`Failed to fetch stations for business ${businessId}:`, error);
        }
    };

    const handleEditClick = (businessId, currentName) => {
        if (editingBusinessId === businessId) {
            setEditingBusinessId(null);
        } else {
            setEditingBusinessId(businessId);
            setNewBusinessName(currentName);
            fetchStationsForBusiness(businessId);
        }
    };

    const handleUpdateBusiness = async (businessId) => {
        if (!newBusinessName.trim()) {
            alert("Business name cannot be empty.");
            return;
        }
        try {
            await axios.put(`https://weak-red-pigeon-shoe.cyclic.app/api/business/${businessId}`, {
                Business_name: newBusinessName,
            });
            setBusinesses(businesses.map(business => business.Business_id === businessId ? { ...business, Business_name: newBusinessName } : business));
            setEditingBusinessId(null);
        } catch (error) {
            console.error("Failed to update business:", error);
        }
    };

    const handleUpdateStation = async () => {
        if (!newStationName.trim()) {
            alert("Station name cannot be empty.");
            return;
        }
        try {
            await axios.put(`https://weak-red-pigeon-shoe.cyclic.app/api/station/${editingStationId}`, {
                Machine_name: newStationName,
            });
            fetchStationsForBusiness(editingBusinessId);
            setEditingStationId(null);
            setNewStationName('');
        } catch (error) {
            console.error("Failed to update station:", error);
        }
    };

    const handleEditStation = (stationId, stationName) => {
        setEditingStationId(stationId);
        setNewStationName(stationName);
    };

    const handleCloseEditStation = () => {
        setEditingStationId(null);
        setNewStationName('');
    };

    const handleAddStation = async () => {
        if (!newStationName.trim()) {
            alert("Station name cannot be empty.");
            return;
        }
        
        if (!editingBusinessId) {
            alert("Please select a business first.");
            return;
        }
    
        try {
            const response = await axios.post('https://weak-red-pigeon-shoe.cyclic.app/api/station', {
                Machine_name: newStationName,
                Business_id: editingBusinessId
            });
    
            const newStation = {
                Machine_ID: response.data.Machine_ID,
                Machine_name: newStationName
            };
    
            setStations(prevStations => ({
                ...prevStations,
                [editingBusinessId]: [...(prevStations[editingBusinessId] || []), newStation]
            }));
    
            setNewStationName('');
        } catch (error) {
            console.error("Failed to add station:", error);
            alert("Failed to add station. Please try again.");
        }
    };

    const handleAddBusiness = async () => {
        if (!newBusinessName.trim()) {
            alert("Business name cannot be empty.");
            return;
        }
    
        try {
            const response = await axios.post('https://weak-red-pigeon-shoe.cyclic.app/api/business', {
                Business_name: newBusinessName,
            });
    
            const newBusiness = response.data;
    
            setBusinesses(prevBusinesses => [...prevBusinesses, newBusiness]);
    
            setNewBusinessName('');
        } catch (error) {
            console.error("Failed to add business:", error);
            alert("Failed to add business. Please try again.");
        }
    };

    const handleDeleteStation = async (machineId) => {
        if (!window.confirm("Are you sure you want to delete this station?")) {
            return;
        }
    
        try {
            const response = await axios.delete(`https://weak-red-pigeon-shoe.cyclic.app/api/station/${machineId}`);
            if (response.status === 200) {
                alert("Station deleted successfully");
                // Remove the deleted station from the local state to update UI
                setStations(prevStations => {
                    const updatedStations = { ...prevStations };
                    updatedStations[editingBusinessId] = updatedStations[editingBusinessId].filter(station => station.Machine_ID !== machineId);
                    return updatedStations;
                });
                handleCloseEditStation(); // Close the edit mode
            }
        } catch (error) {
            console.error("Failed to delete station:", error);
            alert("Failed to delete station. Please try again.");
        }
    };
    

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Sidebar/>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                textAlign: 'center', 
                margin: '10px',
                padding: '10px', 
                width: '100%', 
                position: 'relative', 
                backgroundColor: '#fff', 
                boxShadow: '0px 0px 8px #ddd', 
                border: 'solid 1px #fff', 
                borderRadius: '10px',
                overflow: 'scroll'
            }}>
                <h2 style={{ fontSize: '40px', marginBottom: '20px', textShadow: '2px 2px 6px #4a4a4a' }}>Business List</h2>
                <div>
                    {businesses.map((business) => (
                        <div key={business.Business_id} style={{ margin: '10px', padding: '10px', boxShadow: '0px 0px 8px #ddd', border: 'solid 1px #ddd', borderRadius: '10px' }}>
                            <div onClick={() => handleEditClick(business.Business_id, business.Business_name)} style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', transition: '2s ease' }}>
                                <h3>{business.Business_name}</h3> <ArrowDropDownIcon />
                            </div>
                            {editingBusinessId === business.Business_id && (
                                <div>
                                    <div style={{ display: 'flex', height: '100%', alignContent: 'center', marginTop: '20px' }}>
                                        <span style={{ alignContent: 'center', marginLeft: '5px', marginRight: '5px' }}>
                                            <ModeEditIcon />
                                        </span>
                                        <span style={{ height: '43.2px', width: '10%', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>Edit name</span>
                                        <input
                                            type="text"
                                            value={newBusinessName}
                                            onChange={(e) => setNewBusinessName(e.target.value)}
                                            style={{ border: '1px solid black', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', borderRight: 'none', height: '43.2px', paddingLeft: '10px' }}
                                        />
                                        <button onClick={() => handleUpdateBusiness(business.Business_id)} style={{ width: '20%', border: '1px solid black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', cursor: 'pointer', backgroundColor: '#fff04d', fontWeight: 'bold', marginRight: '10px' }}>Update</button>
                                    </div>
                                    <div>
                                        {stations[business.Business_id] && stations[business.Business_id].map((station, index) => (
                                            <div key={station.Machine_ID} style={{ margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                                                <div style={{ display: 'flex', height: '100%', width: '80vw', border: '1px solid black', borderRadius: '10px' }}>
                                                    <span style={{ borderRight: '1px solid black', alignContent: 'center', width: '8%' }}>{index + 1}</span>
                                                    <span style={{ alignContent: 'center', justifyContent: 'center', width: '82%', paddingLeft: '5px' }}>{station.Machine_name}</span>
                                                    <button onClick={() => handleEditStation(station.Machine_ID, station.Machine_name)} style={{ height: '100%', width: '10%', display: 'flex', justifyContent: 'space-evenly', border: 'none', borderLeft: '1px solid black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', cursor: 'pointer', backgroundColor: '#7dbaca', fontWeight: 'bold' }}>
                                                        <span style={{ height: '100%', alignContent: 'center' }}>Edit</span>
                                                        <span style={{ height: '100%', alignContent: 'center' }}><ArrowDropDownIcon /></span>
                                                    </button>
                                                </div>
                                                {editingStationId === station.Machine_ID && (
                                                    <div style={{ display: 'flex', height: '100%', alignContent: 'center', width: '100%' }}>
                                                        <span style={{ alignContent: 'end', marginLeft: '5px', marginRight: '5px' }}>
                                                            <ModeEditIcon />
                                                        </span>
                                                        <span style={{ height: '43.2px', width: '10%', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>Edit</span>
                                                        <input
                                                            type="text"
                                                            value={newStationName}
                                                            onChange={(e) => setNewStationName(e.target.value)}
                                                            style={{ border: '1px solid black', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', borderRight: 'none', height: '100%', paddingLeft: '10px' }}
                                                        />
                                                        <button onClick={() => handleUpdateStation(station.Machine_ID)} style={{ height: '104%', width: '20%', border: '1px solid black', borderRight: 'none', cursor: 'pointer', backgroundColor: '#fff04d', fontWeight: 'bold' }}>Update</button>
                                                        <button onClick={() => handleDeleteStation(station.Machine_ID)} style={{ height: '104%', width: '20%', border: '1px solid black', borderRight: 'none', cursor: 'pointer', backgroundColor: '#e57373', fontWeight: 'bold' }}>Delete</button>
                                                        <button onClick={handleCloseEditStation} style={{ height: '104%', width: '20%', border: '1px solid black', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', cursor: 'pointer', backgroundColor: '#ff7a7a', fontWeight: 'bold', marginRight: '10px' }}>Cancel</button>
                                                    </div>
                                                
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', height: '30px', alignContent: 'center', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
                                        {showAddStationInput ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={newStationName}
                                                    onChange={(e) => setNewStationName(e.target.value)}
                                                    style={{ border: '1px solid black', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', borderRight: 'none', height: '100%', width: '40%', paddingLeft: '10px' }}
                                                />
                                                <button onClick={handleAddStation} style={{ height: '105%', width: '5%', border: '1px solid black', cursor: 'pointer', backgroundColor: '#5cdb6b', fontWeight: 'bold', borderRight: 'none' }}>Add</button>
                                                <button onClick={() => setShowAddStationInput(false)} style={{ height: '105%', width: '5%', border: '1px solid black', cursor: 'pointer', backgroundColor: '#ff7a7a', fontWeight: 'bold', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>Close</button>
                                            </>
                                        ) : (
                                            <button onClick={() => setShowAddStationInput(true)} style={{ width: '100%', border: '1px solid black', borderRadius: '10px', cursor: 'pointer', backgroundColor: '#5cdb6b', fontWeight: 'bold' }}>Add Station</button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {businesses.length === 0 && <p>No businesses found.</p>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5vh', width: '100%', marginTop: '3vh' }}>
                    {showAddBusinessInput ? (
                        <>
                            <input
                                type="text"
                                value={newBusinessName}
                                onChange={(e) => setNewBusinessName(e.target.value)}
                                style={{ border: '1px solid black', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', borderRight: 'none', height: '100%', width: '200px', paddingLeft: '10px' }}
                            />
                            <button onClick={handleAddBusiness} style={{ height: '104%', width: '80px', border: '1px solid black', cursor: 'pointer', borderRight: 'none', backgroundColor: '#79c8b8', fontWeight: 'bold' }}>Add</button>
                            <button onClick={() => setShowAddBusinessInput(false)} style={{ height: '104%', width: '80px', border: '1px solid black', cursor: 'pointer', backgroundColor: '#ff7a7a', fontWeight: 'bold', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>Close</button>
                        </>
                    ) : (
                        <button onClick={() => setShowAddBusinessInput(true)} style={{ height: '100%', width: '100%', border: '1px solid black', borderRadius: '10px', cursor: 'pointer', backgroundColor: '#79c8b8', fontWeight: 'bold' }}>Add Business</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Setting;
