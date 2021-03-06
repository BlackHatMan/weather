import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { API } from '../../store/types';

const SelectAPI: React.FC<{ handlerAPI: (api: API) => void }> = ({ handlerAPI }) => {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    handlerAPI(target.value as API);
  };
  return (
    <div>
      <TextField
        select
        defaultValue="openWeather"
        onChange={handleChange}
        fullWidth
        variant="standard"
        label="select api"
        sx={{
          margin: '2rem 0',
        }}
      >
        <MenuItem value="openWeather">openWeather</MenuItem>
        <MenuItem value="stormGlass">stormGlass</MenuItem>
      </TextField>
    </div>
  );
};

export default SelectAPI;
