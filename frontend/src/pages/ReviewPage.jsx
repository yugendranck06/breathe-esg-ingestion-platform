import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import Navbar from '../components/Navbar';

import ReviewTable from '../components/ReviewTable';

import API from '../api';

function ReviewPage() {
  const [records, setRecords] =
    useState([]);

  const fetchRecords = async () => {
    try {
      const response =
        await API.get('records/');

      setRecords(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const approve = async (id) => {
    await API.post(
      `approve/${id}/`
    );

    fetchRecords();
  };

  const reject = async (id) => {
    await API.post(
      `reject/${id}/`
    );

    fetchRecords();
  };

  return (
    <div>
      <Navbar />

      <Box sx={{ padding: 4 }}>
        <Typography
          variant='h4'
          gutterBottom
        >
          Review ESG Records
        </Typography>

        <ReviewTable
          records={records}
          approve={approve}
          reject={reject}
        />
      </Box>
    </div>
  );
}

export default ReviewPage;