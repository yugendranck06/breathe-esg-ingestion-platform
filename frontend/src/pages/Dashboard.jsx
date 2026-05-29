import { useEffect, useState } from 'react';

import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';

import Navbar from '../components/Navbar';
import UploadCard from '../components/UploadCard';

import API from '../api';

function Dashboard() {

  const [metrics, setMetrics] = useState({

    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    suspicious: 0,

  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchMetrics();

  }, []);

  const fetchMetrics = async () => {

    try {

      const response = await API.get(
        'dashboard-metrics/'
      );

      setMetrics(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (

      <Box
        sx={{

          height: '100vh',

          display: 'flex',

          justifyContent: 'center',

          alignItems: 'center',
        }}
      >

        <CircularProgress />

      </Box>
    );
  }

  return (

    <div>

      <Navbar />

      <Box sx={{ p: 4 }}>

        {/* Page Title */}

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          ESG Dashboard
        </Typography>

        {/* Metrics Cards */}

        <Box
          sx={{

            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit, minmax(220px, 1fr))',

            gap: 3,

            mt: 4,

            mb: 5,
          }}
        >

          {/* Total Records */}

          <Card
            sx={{
              background: '#1976d2',
              color: 'white',
            }}
          >

            <CardContent>

              <Typography variant="h6">
                Total Records
              </Typography>

              <Typography variant="h3">
                {metrics.total}
              </Typography>

            </CardContent>

          </Card>

          {/* Pending */}

          <Card
            sx={{
              background: '#ed6c02',
              color: 'white',
            }}
          >

            <CardContent>

              <Typography variant="h6">
                Pending
              </Typography>

              <Typography variant="h3">
                {metrics.pending}
              </Typography>

            </CardContent>

          </Card>

          {/* Approved */}

          <Card
            sx={{
              background: '#2e7d32',
              color: 'white',
            }}
          >

            <CardContent>

              <Typography variant="h6">
                Approved
              </Typography>

              <Typography variant="h3">
                {metrics.approved}
              </Typography>

            </CardContent>

          </Card>

          {/* Rejected */}

          <Card
            sx={{
              background: '#d32f2f',
              color: 'white',
            }}
          >

            <CardContent>

              <Typography variant="h6">
                Rejected
              </Typography>

              <Typography variant="h3">
                {metrics.rejected}
              </Typography>

            </CardContent>

          </Card>

          {/* Suspicious */}

          <Card
            sx={{
              background: '#6a1b9a',
              color: 'white',
            }}
          >

            <CardContent>

              <Typography variant="h6">
                Suspicious
              </Typography>

              <Typography variant="h3">
                {metrics.suspicious}
              </Typography>

            </CardContent>

          </Card>

        </Box>

        {/* Upload Sources */}

        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 3 }}
        >
          Data Sources
        </Typography>

        <Box
          sx={{

            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit, minmax(280px, 1fr))',

            gap: 3,
          }}
        >

          <UploadCard
            title="SAP Data"
            description="Fuel and procurement uploads from SAP exports"
          />

          <UploadCard
            title="Utility Data"
            description="Electricity usage and billing uploads"
          />

          <UploadCard
            title="Travel Data"
            description="Corporate travel and flight activity uploads"
          />

        </Box>

      </Box>

    </div>
  );
}

export default Dashboard;