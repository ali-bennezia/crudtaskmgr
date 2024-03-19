import { Component, Input } from '@angular/core';
import { MediaData } from '../media-data';
import { MediaService } from 'src/app/media.service';
import { transition, trigger, style, animate } from '@angular/animations';

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
export class MediaDetailsComponent {
  @Input()
  media!: MediaData;

  constructor(public mService: MediaService) {}

  onBackgroundClick(e: Event) {
    console.log(this.media);

    this.mService.displayedMedia = null;
  }
}
