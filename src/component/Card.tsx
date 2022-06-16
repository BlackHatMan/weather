import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import Image from './Image';
import './card.css';

const Card = () => {
  const { weather } = useAppSelector((state) => state.weather);
  const date = new Date(1655802000).toLocaleDateString('en-US', {
    weekday: 'long',
  });
  console.log('🚀 ~ file: Card.tsx ~ line 9 ~ Card ~ date', date);
  return (
    <div className="card">
      {weather.map((el) => {
        return (
          <Box key={el.temp}>
            <Typography>{el.date}</Typography>
            <Typography>{el.description}</Typography>
            <Typography>{el.temp}</Typography>
            <Image description={el.description} />
          </Box>
        );
      })}
    </div>
  );
};

export default Card;
