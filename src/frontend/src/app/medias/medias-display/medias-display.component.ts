import { Component, Input } from '@angular/core';
import { FileData } from '../file-data';

@Component({
  selector: 'app-medias-display',
  templateUrl: './medias-display.component.html',
  styleUrls: ['./medias-display.component.css'],
})
export class MediasDisplayComponent {
  @Input()
  medias!: FileData[];
}
