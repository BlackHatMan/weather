import { Box } from '@mui/material';
import { path } from '../utilities/path';

const WeatherImage: React.FC<weatherImage> = ({ description, width = 110, height = 90 }) => {
  let source = '';
  if (description === 'Clouds') source = path.cloud;
  else if (description === 'Rain') source = path.rain;
  else if (description === 'Clear') source = path.sun;
  else if (description === 'Snow') source = path.snow;

  return (
    <Box
      component="img"
      sx={{
        height,
        maxWidth: width,
        margin: '1rem 0.2rem',
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
