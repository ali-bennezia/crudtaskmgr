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

import { tap } from 'rxjs/operators';

interface TaskGroupData {
  g: TaskGroup;
  disabled: boolean;
}

@Component({
  selector: 'app-page-my-tasks',
  templateUrl: './page-my-tasks.component.html',
  styleUrls: ['./page-my-tasks.component.css'],
})
export class PageMyTasksComponent implements OnInit {
  public loading: boolean = false;

  groups: TaskGroupData[] = [];

  taskGroupCreation: boolean = false;
  taskGroupCreationLoading: boolean = false;
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
      description: ['', [Validators.minLength(0), Validators.maxLength(120)]],
      files: [[]],
    });
  }

  loadTasks() {
    this.http
      .get<TaskGroup[]>(`${config.backendUrl}/api/task/group/read`, {
        headers: { Authorization: `Bearer ${this.auth.getSession()?.token}` },
      })
      .subscribe({
        next: (data) => {
          this.groups = data.map((g) => {
            return { g: g, disabled: false };
          });
          console.log(this.groups);
        },
      });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  clearCreationForm() {
    this.taskGroupCreationForm.reset();
    if (this.fileDrop.length > 0) this.fileDrop.first.clearFiles();
  }

  onCreationFormCancel() {
    this.clearCreationForm();
    this.taskGroupCreation = false;
  }

  onCreationFormCreate() {
    let formData: FormData = new FormData();
    formData.append(
      'title',
      this.taskGroupCreationForm.get('title')?.value ?? ''
    );
    formData.append(
      'description',
      this.taskGroupCreationForm.get('description')?.value ?? ''
    );
    if (this.fileDrop.length > 0) {
      let fileDropComp: FileDropComponent = this.fileDrop.first;
      for (let i = 0; i < fileDropComp.files.length; ++i)
        formData.append('files', fileDropComp.files[i].file);
    }

    this.http
      .post<TaskGroup>(`${config.backendUrl}/api/task/group/create`, formData, {
        headers: { Authorization: `Bearer ${this.auth.getSession()?.token}` },
        observe: 'response',
      })
      .pipe(
        tap((r) => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (r) => {
          this.loadTasks();
        },
        error: (e) => {
          console.error(e);
        },
      });
    this.clearCreationForm();
    this.taskGroupCreation = false;
  }

  deleteTaskGroup(g: TaskGroupData) {
    let i = this.groups.indexOf(g);
    if (i == -1) return;

    g.disabled = true;
    this.http
      .delete(`${config.backendUrl}/api/task/group/delete/${g.g.id}`, {
        headers: { Authorization: `Bearer ${this.auth.getSession()?.token}` },
        observe: 'response',
      })
      .pipe(
        tap((d) => {
          g.disabled = false;
        })
      )
      .subscribe({
        next: (d) => {
          this.groups.splice(i, 1);
        },
        error: (e) => {},
      });
  }
}
