import { Component, Input } from '@angular/core';
import {
  DisplayFile,
  DisplayFileType,
  FileDropComponent,
} from '../file-drop/file-drop.component';

@Component({
  selector: 'app-file-drop-file',
  templateUrl: './file-drop-file.component.html',
  styleUrls: ['./file-drop-file.component.css'],
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
