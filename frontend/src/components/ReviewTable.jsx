import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
  } from '@mui/material';
  
  function ReviewTable({
    records,
    approve,
    reject,
  }) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
  
              <TableCell>Scope</TableCell>
  
              <TableCell>Value</TableCell>
  
              <TableCell>Status</TableCell>
  
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  {record.category}
                </TableCell>
  
                <TableCell>
                  {record.scope}
                </TableCell>
  
                <TableCell>
                  {record.normalized_value}
                </TableCell>
  
                <TableCell>
                  {record.status}
                </TableCell>
  
                <TableCell>
                  <Button
                    variant='contained'
                    color='success'
                    onClick={() =>
                      approve(record.id)
                    }
                    sx={{ mr: 1 }}
                  >
                    Approve
                  </Button>
  
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() =>
                      reject(record.id)
                    }
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  export default ReviewTable;