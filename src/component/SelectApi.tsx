import { MenuItem, TextField } from '@mui/material';
import React from 'react';

const SelectAPI = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <TextField
        select
        value={age}
        onChange={handleChange}
        fullWidth
        variant="standard"
        label="Choice API"
      >
        <MenuItem value="openWeather">openWeather</MenuItem>
        <MenuItem value="stormglass">stormglass</MenuItem>
      </TextField>
    </div>
  );
};

export default SelectAPI;
