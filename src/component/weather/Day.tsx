import { Box, styled, Typography } from '@mui/material';
import { weather } from '../../store/thunks';
import WeatherImage from '../WeatherImage';

export const StyledTypography = styled(Typography)({
  backgroundColor: 'rgba(21, 21, 22, 0.4)',
  textTransform: 'uppercase',
  margin: '0.7rem ',
  padding: '0.3rem 1rem',
  borderRadius: ' 1rem',
});

const Day: React.FC<weather> = ({ date, description, temp }) => {
  return (
    <Box>
      <StyledTypography>{date}</StyledTypography>
      <WeatherImage description={description} />
      <Typography className="temperature" fontSize="1.8rem">
        {temp}
      </Typography>
    </Box>
  );
};
export default Day;
