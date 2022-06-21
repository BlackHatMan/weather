import { TextField } from '@mui/material';
import { DayOfWeek } from './weather/Day';

const TODO = () => {
  const handlerToDO = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    localStorage.setItem(target.name, target.value);
  };
  return (
    <div>
      <table style={{ maxWidth: '350px', width: '100%' }}>
        <tbody>
          <tr>
            <td>
              <DayOfWeek>08: 00</DayOfWeek>
            </td>
            <td>
              <TextField
                variant="standard"
                autoComplete="off"
                placeholder="Add case"
                defaultValue={localStorage.getItem('morning')}
                onBlur={handlerToDO}
                name="morning"
              />
            </td>
          </tr>
          <tr>
            <td>
              <DayOfWeek>12: 00</DayOfWeek>
            </td>
            <td>
              <TextField
                variant="standard"
                autoComplete="off"
                placeholder="Add case"
                defaultValue={localStorage.getItem('afternoon')}
                onBlur={handlerToDO}
                name="afternoon"
              />
            </td>
          </tr>
          <tr>
            <td>
              <DayOfWeek>21: 00</DayOfWeek>
            </td>
            <td>
              <TextField
                variant="standard"
                autoComplete="off"
                placeholder="Add case"
                defaultValue={localStorage.getItem('evening')}
                onBlur={handlerToDO}
                name="evening"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TODO;
