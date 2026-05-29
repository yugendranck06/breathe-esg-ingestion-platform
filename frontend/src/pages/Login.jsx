import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
  } from '@mui/material';
  
  import { useNavigate } from 'react-router-dom';
  
  function Login() {
    const navigate = useNavigate();
  
    const handleLogin = () => {
      navigate('/dashboard');
    };
  
    return (
      <Container maxWidth='sm'>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              width: '100%',
            }}
          >
            <Typography
              variant='h4'
              gutterBottom
            >
              Breathe ESG
            </Typography>
  
            <TextField
              fullWidth
              label='Username'
              margin='normal'
            />
  
            <TextField
              fullWidth
              type='password'
              label='Password'
              margin='normal'
            />
  
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }
  
  export default Login;