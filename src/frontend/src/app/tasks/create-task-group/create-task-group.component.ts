import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-task-group',
  templateUrl: './create-task-group.component.html',
  styleUrls: ['./create-task-group.component.css'],
})
export class CreateTaskGroupComponent {
  @Output()
  onInteract: EventEmitter<Event> = new EventEmitter<Event>();
  @Input()
  disabled!: boolean;
  onClick(e: Event) {
    this.onInteract.next(e);
  }
}
