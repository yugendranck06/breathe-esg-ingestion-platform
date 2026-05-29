// import {
//     Box,
//     Button,
//     MenuItem,
//     Select,
//     Typography,
//   } from '@mui/material';
  
//   import { useState } from 'react';
  
//   import Navbar from '../components/Navbar';
  
//   import API from '../api';
  
//   function UploadPage() {
//     const [file, setFile] = useState(null);
  
//     const [sourceType, setSourceType] =
//       useState('SAP');
  
//     const uploadFile = async () => {
//       const formData = new FormData();
  
//       formData.append('file', file);
  
//       formData.append(
//         'source_type',
//         sourceType
//       );
  
//       try {
//         await API.post(
//           'upload/',
//           formData
//         );
  
//         alert('Upload successful');
//       } catch (error) {
//         console.log(error);
  
//         alert('Upload failed');
//       }
//     };
  
//     return (
//       <div>
//         <Navbar />
  
//         <Box sx={{ padding: 4 }}>
//           <Typography
//             variant='h4'
//             gutterBottom
//           >
//             Upload ESG Data
//           </Typography>
  
//           <Select
//             value={sourceType}
//             onChange={(e) =>
//               setSourceType(
//                 e.target.value
//               )
//             }
//             sx={{ width: 300 }}
//           >
//             <MenuItem value='SAP'>
//               SAP
//             </MenuItem>
  
//             <MenuItem value='UTILITY'>
//               UTILITY
//             </MenuItem>
  
//             <MenuItem value='TRAVEL'>
//               TRAVEL
//             </MenuItem>
//           </Select>
  
//           <br />
//           <br />
  
//           <input
//             type='file'
//             onChange={(e) =>
//               setFile(
//                 e.target.files[0]
//               )
//             }
//           />
  
//           <br />
//           <br />
  
//           <Button
//             variant='contained'
//             onClick={uploadFile}
//           >
//             Upload
//           </Button>
//         </Box>
//       </div>
//     );
//   }
  
//   export default UploadPage;



// frontend/src/pages/UploadPage.jsx

import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';

import { useState } from 'react';

import Navbar from '../components/Navbar';

import API from '../api';

function UploadPage() {

  const [file, setFile] = useState(null);

  const [sourceType, setSourceType] =
    useState('SAP');

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [errorMessage, setErrorMessage] =
    useState('');

  const uploadFile = async () => {

    if (!file) {

      alert('Please select a file');

      return;
    }

    const formData = new FormData();

    formData.append(
      'file',
      file
    );

    formData.append(
      'source_type',
      sourceType
    );

    try {

      setLoading(true);

      setMessage('');

      setErrorMessage('');

      const response = await API.post(
        'upload/',
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        }
      );

      console.log(
        'Upload Response:',
        response.data
      );

      setMessage(

        `Upload Successful

Records Created:
${response.data.records_created}

Suspicious Records:
${response.data.suspicious_records}`

      );

    } catch (error) {

      console.log(
        'Upload Error:',
        error
      );

      setErrorMessage(

        error?.response?.data?.error ||

        'Upload failed'
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div>

      <Navbar />

      <Box sx={{ padding: 4 }}>

        <Typography
          variant='h4'
          gutterBottom
          fontWeight='bold'
        >
          Upload ESG Data
        </Typography>

        {/* Success Message */}

        {message && (

          <Alert
            severity='success'
            sx={{ mb: 3 }}
          >
            {message}
          </Alert>
        )}

        {/* Error Message */}

        {errorMessage && (

          <Alert
            severity='error'
            sx={{ mb: 3 }}
          >
            {errorMessage}
          </Alert>
        )}

        {/* Source Type */}

        <Typography
          variant='h6'
          sx={{ mb: 1 }}
        >
          Select Data Source
        </Typography>

        <Select
          value={sourceType}
          onChange={(e) =>
            setSourceType(
              e.target.value
            )
          }
          sx={{
            width: 300,
            mb: 3,
          }}
        >

          <MenuItem value='SAP'>
            SAP
          </MenuItem>

          <MenuItem value='UTILITY'>
            UTILITY
          </MenuItem>

          <MenuItem value='TRAVEL'>
            TRAVEL
          </MenuItem>

        </Select>

        <br />

        {/* File Input */}

        <input
          type='file'
          accept='.csv'
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <br />
        <br />

        {/* Upload Button */}

        <Button
          variant='contained'
          onClick={uploadFile}
          disabled={loading}
          sx={{
            px: 5,
            py: 1.2,
          }}
        >

          {loading ? (

            <CircularProgress
              size={24}
              color='inherit'
            />

          ) : (

            'Upload'
          )}

        </Button>

      </Box>

    </div>
  );
}

export default UploadPage;