import { useEffect, useState } from 'react';

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import Navbar from '../components/Navbar';

import API from '../api';

function AuditPage() {

  const [logs, setLogs] =
    useState([]);

  const fetchLogs = async () => {

    try {

      const response =
        await API.get('audit-logs/');

      setLogs(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>

      <Navbar />

      <Box sx={{ padding: 4 }}>

        <Typography
          variant='h4'
          gutterBottom
        >
          Audit Logs
        </Typography>

        <TableContainer
          component={Paper}
        >

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  Record ID
                </TableCell>

                <TableCell>
                  Action
                </TableCell>

                <TableCell>
                  Changed By
                </TableCell>

                <TableCell>
                  Timestamp
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {logs.map((log, index) => (

                <TableRow key={index}>

                  <TableCell>
                    {log.record}
                  </TableCell>

                  <TableCell>
                    {log.action}
                  </TableCell>

                  <TableCell>
                    {log.changed_by}
                  </TableCell>

                  <TableCell>
                    {log.timestamp}
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Box>

    </div>
  );
}

export default AuditPage;