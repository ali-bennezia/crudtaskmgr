import { Component, Input } from '@angular/core';
import { FileData } from '../file-data';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.css'],
})
export class MediaDetailsComponent {
  @Input()
  media!: FileData;
}
