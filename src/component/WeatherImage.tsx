import { Box } from '@mui/material';
import { path } from '../utilities/path';

const WeatherImage: React.FC<weatherImage> = ({ description, height = 85 }) => {
  let source = '';
  if (description === 'Clouds') source = path.cloud;
  else if (description === 'Rain') source = path.rain;
  else if (description === 'Clear') source = path.sun;
  else if (description === 'Snow') source = path.snow;

  return (
    <Box
      component="img"
      sx={{
        height: {
          xl: height,
          lg: height,
          md: height,
          sm: height,
          xs: height / 2,
        },
        margin: {
          xl: '1rem 0.2rem',
          md: 0,
        },
      }}
      alt="image description"
      src={source}
    />
  );
};
export default WeatherImage;

interface weatherImage {
  description: string;
  width?: number;
  height?: number;
}
