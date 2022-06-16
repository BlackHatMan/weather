import { Box } from '@mui/material';
import { path } from '../utilities/path';

const Image = ({ description }: { description: string }) => {
  let source = '';
  if (description === 'Clouds') source = path.cloud;
  else if (description === 'Rain') source = path.rain;
  else if (description === 'Clear') source = path.sun;
  else if (description === 'Snow') source = path.snow;

  return (
    <Box
      component="img"
      sx={{
        height: 100,
        width: 150,
      }}
      alt="image description"
      src={source}
    />
  );
};
export default Image;
