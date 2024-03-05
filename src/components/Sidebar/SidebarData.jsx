import React from "react";
import "./Sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon style={{ fontSize: '20px' }}/>,
        path: "/Home"
    },
    {
        title:"Dashboard",
        icon:<DashboardIcon style={{ fontSize: '20px' }}/>,
        path:"/Dashboard"
    },
    {
        title:"History",
        icon:<HistoryIcon style={{ fontSize: '20px' }}/>,
        path:"/History"
    }
];

export const SidebarData2 = [
    
    {
        title:"Logout",
        icon:<LogoutIcon style={{ fontSize: '20px' }}/>,
        path:"/Logout"
    }
];