import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MediaData } from '../media-data';
import { transition, trigger, style, animate } from '@angular/animations';

import { MediaService } from 'src/app/media.service';
import { AuthService } from 'src/app/auth.service';

import config from './../../../backend.json';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.css'],
  animations: [
    trigger('enterLeave', [
      transition(':enter', [
        style({
          opacity: 0,
          visibility: 'hidden',
        }),
        animate(
          '100ms ease-in',
          style({
            opacity: 1,
            visibility: 'visible',
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          visibility: 'visible',
        }),
        animate(
          '100ms ease-out',
          style({
            opacity: 0,
            visibility: 'hidden',
          })
        ),
      ]),
    ]),
  ],
})
export class MediaDetailsComponent implements OnInit, OnDestroy {
  @Input()
  media!: MediaData;

  private onDisplayingChangeSubscription?: Subscription;

  constructor(public mService: MediaService, public aService: AuthService) {}

  closeMediaDetails() {
    this.mService.displayedMedia = null;
  }

  onClosed() {}

  onOpened() {}

  getMediaFileUrl() {
    let segments = this.media!.file.url.split('/');
    return `${config.backendUrl}/files/${segments[segments.length - 1]}`;
  }

  getMediaDownloadUrl() {
    let segments = this.media!.file.url.split('/');
    return `${config.backendUrl}/downloads/${segments[segments.length - 1]}`;
  }

  onBackgroundClick(e: Event) {
    let el: HTMLElement = e.target as HTMLElement;
    if (el.className.includes('media-details')) {
      this.closeMediaDetails();
    }
  }

  ngOnInit(): void {
    this.onDisplayingChangeSubscription =
      this.mService.onDisplayChange$.subscribe((v) => {
        if (v) {
          this.onOpened();
        } else {
          this.onClosed();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.onDisplayingChangeSubscription) {
      this.onDisplayingChangeSubscription.unsubscribe();
      this.onDisplayingChangeSubscription = undefined;
    }
  }
}
