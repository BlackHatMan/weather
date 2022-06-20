import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { API } from '../store/types';

const SelectAPI: React.FC<{ handlerAPI: (api: API) => void }> = ({ handlerAPI }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value as API;
    handlerAPI(data);
  };
  return (
    <div>
      <TextField
        select
        defaultValue="openWeather"
        onChange={handleChange}
        fullWidth
        variant="standard"
        label="select API"
      >
        <MenuItem value="openWeather">openWeatherAPI</MenuItem>
        <MenuItem value="stormGlass">stormGlassAPI</MenuItem>
      </TextField>
    </div>
  );
};

export default SelectAPI;
