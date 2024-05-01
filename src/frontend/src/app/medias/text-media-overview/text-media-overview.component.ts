import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-text-media-overview',
  templateUrl: './text-media-overview.component.html',
  styleUrls: ['./text-media-overview.component.css'],
})
export class TextMediaOverviewComponent implements OnInit, OnDestroy {
  @Input()
  url!: string;
  text: string = '';

  private subscription!: Subscription;

  constructor(private http: HttpClient, private aService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.http
      .get(this.url, {
        headers: {
          Range: 'bytes=0-300',
          Authorization: `Bearer ${this.aService.getSession()?.token}`,
        },
        responseType: 'text',
      })
      .subscribe((txt) => {
        this.text = txt;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
