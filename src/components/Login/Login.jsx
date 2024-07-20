import React, { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import galaxyImage from '../../assets/galaxy.jpg';

// Create a theme instance.
const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#ffffff' 
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jsonData = { email, password };

    try {
      const response = await fetch("http://localhost:3334/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      if (result.status === 'ok') {
        console.log('LoginStatus', result.status);
        localStorage.setItem('token', result.token);
        
        navigate('/Home'); // Navigate to home page upon successful login
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline /> {/* Ensures consistent baseline styles */}
      <Container 
        component="main" 
        maxWidth="s" 
        sx={{ 
          bgcolor: '#ffffff', 
          borderRadius: 1, 
          boxShadow: 1, 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${galaxyImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center',
            width: '50vw',
            border: '1px solid #ddd',
            borderRadius: '50px',
            backdropFilter: 'blur(5px)',
          }}
        >
          
          <AccountCircleIcon sx={{ mt: 5, color: 'primary.main', height: '5vw', width: '5vw' }}/>
         
          <Typography 
          component="h1" 
          variant="h5" 
          sx={{
            fontSize:'5vw',
            fontFamily: 'sans-serif', 
            fontWeight: 'bold'
            }}>
            Login
          </Typography>
          <Box component="form" 
          onSubmit={handleSubmit} 
          noValidate
          sx={{ 
            mt: 1 ,
            display: 'flex',
            flexDirection: 'column',
            width: '40vw',
            }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '&:hover': {
                  boxShadow: '0 0 10px rgb(181,181,181)',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '&:hover': {
                  boxShadow: '0 0 10px rgb(181,181,181)',
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: '100%',
                mt: 3, 
                mb: 5, 
                bgcolor: 'primary.main', 
                color: 'white', 
                '&:hover': {
                  bgcolor: 'primary.dark', 
                  boxShadow: '0 0 10px rgb(176, 234, 255)', 
                },
                padding: '10px 20px', 
                fontSize: '16px', 
                borderRadius: '50px', 
                
              }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
