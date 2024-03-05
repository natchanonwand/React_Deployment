// App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; // Adjust the path as necessary
import Login from './components/Login/Login'; // Adjust the path as necessary
import HomeComponent from './components/HomeComponent'; // Adjust the path as necessary
import DashboardComponent from './components/Dashboard/DashboardComponent';
import History from './components/History/History';
import Logout from './components/Login/Logout.jsx';
import {SearchDetails} from './components/SearchBar/SearchDetails'
import Tracking from './components/Dashboard/Tracking';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/Home" element={<HomeComponent />} />
            <Route path="/Dashboard" element={<DashboardComponent />} />
            <Route path="/History" element={<History />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path='/SearchDetails/:lotData'element={<SearchDetails />}/>
            <Route path='/Dashboard/:lot_Data/*'element={<Tracking />}/>
          </Route>
          {/* Redirect to login if no other routes match */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
