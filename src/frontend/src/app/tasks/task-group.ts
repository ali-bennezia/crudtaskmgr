import Task from './task';

export default interface TaskGroup {
  id: string;
  title: string;
  tasks: Task[];
  files: File[];
}
