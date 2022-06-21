import { Box } from '@mui/material';
import { getPathWeatherImg } from '../../utilities/path';

const WeatherImage: React.FC<weatherImage> = ({ description, height = 85 }) => {
  const source = getPathWeatherImg(description);

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
