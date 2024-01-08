import Task from './task';

export default interface TaskGroup {
  title: string;
  tasks: Task[];
  files: File[];
}
