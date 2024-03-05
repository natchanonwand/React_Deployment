import React, { useState } from 'react';
import Login from './components/Login/Login';
import App from './App';

function Main() {
  const [authenticated, setAuthenticated] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setAuthenticated(true);
    console.log('LoginStatus', authenticated)
  };

  return (
    <div className="Main">
      {authenticated ? <App /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default Main;
