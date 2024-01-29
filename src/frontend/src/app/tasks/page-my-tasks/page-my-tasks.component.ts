import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import TaskGroup from '../task-group';
import { AuthService } from 'src/app/auth.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import config from './../../../backend.json';
import { FileDropComponent } from 'src/app/file-drop/file-drop.component';

@Component({
  selector: 'app-page-my-tasks',
  templateUrl: './page-my-tasks.component.html',
  styleUrls: ['./page-my-tasks.component.css'],
})
export class PageMyTasksComponent implements OnInit {
  public loading: boolean = false;

  groups: TaskGroup[] = [];

  taskGroupCreation: boolean = false;

  taskGroupCreationForm!: FormGroup;

  @ViewChildren(FileDropComponent)
  fileDrop!: QueryList<FileDropComponent>;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private builder: FormBuilder
  ) {
    this.taskGroupCreationForm = builder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      files: [[]],
    });
  }

  ngOnInit(): void {
    this.http
      .get<TaskGroup[]>(`${config.backendUrl}/api/task/group/read`, {
        headers: { Authorization: `Bearer ${this.auth.getSession()?.token}` },
      })
      .subscribe({
        next: (data) => {
          this.groups = data;
        },
      });
  }

  clearCreationForm() {
    this.taskGroupCreationForm.reset();
    if (this.fileDrop.length > 0) this.fileDrop.first.clearFiles();
  }

  onCreationFormCancel() {
    this.clearCreationForm();
    this.taskGroupCreation = false;
  }

  onCreationFormCreate() {}
}
