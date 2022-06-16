import { Box, Typography } from '@mui/material';

const LocationComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography color="white" fontSize={28}>
        GOMEL
      </Typography>
      <Typography color="white" fontSize={18}>
        and BY
      </Typography>
    </Box>
  );
};

export default LocationComponent;
