import { Component, EventEmitter, Input, Output } from '@angular/core';
import TaskGroup from '../task-group';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.css'],
})
export class TaskGroupComponent {
  @Input()
  taskGroup!: TaskGroup;
  @Output()
  deleteAction: EventEmitter<void> = new EventEmitter();

  onClickDelete() {
    this.deleteAction.emit();
  }
}
