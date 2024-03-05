import { NavLink, Route, Routes } from "react-router-dom";
import React, { useState } from 'react';
import "./Sidebar.css";
import "./SidebarList.css";
import { SidebarData, SidebarData2 } from "./SidebarData.jsx";
import HomeComponent from "../HomeComponent.jsx";
import History from "../History/History.jsx";
import DashboardComponent from "../Dashboard/DashboardComponent.jsx";
import Logout from "../Login/Logout.jsx"; 
import { SearchDetails }  from "../SearchBar/SearchDetails.jsx"
import Tracking from "../Dashboard/Tracking.jsx";

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
        setIsMenuOpen(!isMenuOpen)
    };

    const handleItemClick = (key) => {
        setActiveItem(key);
    };

    return( 
    <>
        <div>  {/* className={`MainContent ${isOpen ? 'shifted' : ''}`} */}
            <Routes>
                {/* <Route index element={<HomeComponent />} /> */}
                <Route path="/Home" index element={<HomeComponent />} />
                <Route path="/Dashboard" element={<DashboardComponent />} />
                <Route path="/History" element={<History />} />
                <Route path="/Logout" element={<Logout />} />
                <Route path='/SearchDetails/:lotData'element={<SearchDetails />}/>
                <Route path='/Dashboard/:lot_Data'element={<Tracking />}/>

            </Routes>
        </div>
        <div className={`Sidebar ${isOpen ? 'closed' : 'open'}`}>
            <button className="close-btn" onClick={toggleSidebar}>
                {isMenuOpen ? '☰' : '☰'} {/* Toggle button icon */}
            </button>
            <div className="SidebarList">
                <div className="Title"><p>Counting</p><p>Record</p></div>
                <ul> {/* Wrap the first list in a <ul> element */}
                    {SidebarData.map((val, key) => {
                        return (
                            <li key={key}>
                                <NavLink
                                    to={val.path}
                                    className={['row', activeItem === key ? 'active' : null].join(' ')}
                                    onClick={() => handleItemClick(key)}
                                >
                                    <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
                <div className="BottomTabs">
                    <ul> {/* Wrap the second list in a <ul> element */}
                        {SidebarData2.map((val, key) => {
                            return (
                                <li key={key}>
                                    <NavLink to={val.path} className={({ isactive }) => ["rowBottom", isactive ? "active" : null].join("")}>
                                        <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar;
