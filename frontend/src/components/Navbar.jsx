import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <AppBar position='static'>

      <Toolbar>

        <Typography
          variant='h6'
          sx={{ flexGrow: 1 }}
        >
          Breathe ESG
        </Typography>

        <Button
          color='inherit'
          component={Link}
          to='/dashboard'
        >
          Dashboard
        </Button>

        <Button
          color='inherit'
          component={Link}
          to='/upload'
        >
          Upload
        </Button>

        <Button
          color='inherit'
          component={Link}
          to='/review'
        >
          Review
        </Button>

        <Button
          color='inherit'
          component={Link}
          to='/audit'
        >
          Audit
        </Button>

      </Toolbar>

    </AppBar>
  );
}

export default Navbar;