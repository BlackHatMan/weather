import { styled, TextField, Typography } from '@mui/material';
import { useGetCoordCityQuery } from '../../store/RTK';
import SelectAPI from './SelectApi';
import { handlerCity, handlerAPI } from './CalendarContainer';

const Location = ({
  handlerCity,
  city,
  handlerAPI,
}: {
  handlerCity: handlerCity;
  city: string;
  handlerAPI: handlerAPI;
}) => {
  const { data } = useGetCoordCityQuery(city, { skip: city ? false : true });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const queryCity = e.currentTarget.value;
    if (e.key === 'Enter' && queryCity) {
      handlerCity(queryCity);
      localStorage.setItem('city', queryCity);
    }
  };

  return (
    <div>
      <StyledTextField
        InputProps={{
          onKeyDown: handleKeyPress,
        }}
        key={city}
        variant="standard"
        defaultValue={city}
        placeholder="Enter city"
        autoComplete="off"
      />
      <Typography textAlign="end" fontSize={18}>
        {data?.country}
      </Typography>

      <SelectAPI handlerAPI={handlerAPI} />
    </div>
  );
};

export default Location;

const StyledTextField = styled(TextField)({
  '& .MuiInput-input': {
    textAlign: 'end',
    fontSize: 32,
  },
});
