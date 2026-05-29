import { Card, CardContent, Typography } from '@mui/material';

function UploadCard({ title, description }) {
  return (
    <Card sx={{ width: 300 }}>
      <CardContent>
        <Typography variant='h5'>
          {title}
        </Typography>

        <Typography variant='body1'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UploadCard;