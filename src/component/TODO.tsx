import { Typography } from '@mui/material';
import { DayOfWeek } from './weather/Day';

const TODO = () => {
  return (
    <div>
      <table style={{ maxWidth: '300px', width: '100%' }}>
        <tbody>
          <tr>
            <td>
              <DayOfWeek>08: 00</DayOfWeek>
            </td>
            <td>
              <Typography>Writing to do list</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <DayOfWeek>12: 00</DayOfWeek>
            </td>
            <td>
              <Typography>Drink vodka</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <DayOfWeek>21: 00</DayOfWeek>
            </td>
            <td>
              <Typography>Eat seledka</Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TODO;
