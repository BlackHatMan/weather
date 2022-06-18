import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setDateTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 20000);
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
    <div>
      <Typography fontSize={68} lineHeight={1}>
        {hours}:{minutes}
      </Typography>
      <Typography fontSize={24}>{fullDate}</Typography>
    </div>
  );
};

export default Clock;
