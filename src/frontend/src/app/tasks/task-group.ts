import { FileData } from '../medias/file-data';
import Task from './task';

export default interface TaskGroup {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  files: FileData[];
}
