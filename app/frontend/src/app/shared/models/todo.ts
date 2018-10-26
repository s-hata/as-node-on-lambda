import { Record } from 'immutable';

const TodoRecord = Record({
  id: 0,
  title: '',
  completed: false
});

export class Todo
    extends TodoRecord {
  id: number;
  title: string;
  completed: boolean;

  constructor(props) {
    super(props);
  }
}
