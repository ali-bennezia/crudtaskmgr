import { Component, Input } from '@angular/core';
import {
  DisplayFile,
  DisplayFileType,
  FileDropComponent,
} from '../file-drop/file-drop.component';

import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-file-drop-file',
  templateUrl: './file-drop-file.component.html',
  styleUrls: ['./file-drop-file.component.css'],
  animations: [
    trigger('enterLeave', [
      transition(':enter', [
        style({
          scale: 0.5,
          opacity: 0,
        }),
        animate(
          '100ms ease-in',
          style({
            scale: 1,
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({
          scale: 1,
          opacity: 1,
        }),
        animate(
          '100ms ease-out',
          style({
            scale: 0.5,
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class FileDropFileComponent {
  @Input()
  file!: DisplayFile;
  @Input()
  index!: number;
  @Input()
  parent!: FileDropComponent;

  public displayFileTypeEnum: typeof DisplayFileType = DisplayFileType;

  public removeFile() {
    this.parent.removeFile(this.index);
  }
}
