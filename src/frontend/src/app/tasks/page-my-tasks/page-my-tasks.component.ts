import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import TaskGroup from '../task-group';
import { AuthService } from 'src/app/auth.service';
import config from './../../../backend.json';

@Component({
  selector: 'app-page-my-tasks',
  templateUrl: './page-my-tasks.component.html',
  styleUrls: ['./page-my-tasks.component.css'],
})
export class PageMyTasksComponent implements OnInit {
  public loading: boolean = false;

  groups: TaskGroup[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {}

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
}
