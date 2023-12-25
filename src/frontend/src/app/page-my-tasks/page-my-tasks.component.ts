import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-my-tasks',
  templateUrl: './page-my-tasks.component.html',
  styleUrls: ['./page-my-tasks.component.css'],
})
export class PageMyTasksComponent implements OnInit {
  public loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
