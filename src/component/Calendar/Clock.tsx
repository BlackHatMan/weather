import { Box, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setDateTime] = useState(new Date());

  const matches = useMediaQuery('(max-width:800px)');

  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 10000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const fullDate = time.toLocaleDateString('en-Us', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box pb={3}>
      <Typography fontSize={matches ? '3rem' : '4rem'} lineHeight={1}>
        {hours}:{minutes}
      </Typography>
      <Typography fontSize={matches ? '1rem' : '1.5rem'}>{fullDate}</Typography>
    </Box>
  );
};

export default Clock;
