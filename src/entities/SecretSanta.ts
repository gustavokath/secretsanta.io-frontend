import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Participant from './Participant';

class SecretSanta {
  public name: string;

  public date: MaterialUiPickersDate;

  public participants: Participant[];

  constructor(name: string, date = new Date(), participants = []) {
    this.name = name;
    this.date = date;
    this.participants = participants;
  }
}

export default SecretSanta;
