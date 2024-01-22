import { Component, Input } from '@angular/core';
import { DisplayFile, DisplayFileType } from '../file-drop/file-drop.component';

@Component({
  selector: 'app-file-drop-file',
  templateUrl: './file-drop-file.component.html',
  styleUrls: ['./file-drop-file.component.css'],
})
export class FileDropFileComponent {
  @Input()
  file!: DisplayFile;

  public displayFileTypeEnum: typeof DisplayFileType = DisplayFileType;
}
