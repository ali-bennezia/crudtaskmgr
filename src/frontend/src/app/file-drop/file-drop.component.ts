import { Component, ElementRef, ViewChild } from '@angular/core';
import fileTypeChecker from 'file-type-checker';

export interface DisplayFile {
  file: File;
  url: string;
  type: string;
  displayType: DisplayFileType;
  size: number;
}

export enum DisplayFileType {
  IMAGE,
  ARCHIVE,
  TEXT,
  OTHER,
}

function getFileDisplayType(file: File, type: any): DisplayFileType {
  if (type == undefined) {
    if (file.name.endsWith('.txt')) return DisplayFileType.TEXT;
  } else {
    if (type.mimeType.startsWith('image')) return DisplayFileType.IMAGE;
    else if (
      type!.mimeType.match(/^application\/x-(rar-)?compressed$/i)!.length > 0
    )
      return DisplayFileType.ARCHIVE;
  }
  return DisplayFileType.OTHER;
}

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.css'],
})
export class FileDropComponent {
  @ViewChild('fileInput', { static: true })
  fileInput!: ElementRef<HTMLInputElement>;

  files: DisplayFile[] = [];
  removeFile(index: number) {
    const [removedFile] = this.files.splice(index, 1);
    if (removedFile.displayType == DisplayFileType.IMAGE) {
      URL.revokeObjectURL(removedFile.url);
    }
  }
  clearFiles() {
    for (let i = 0; i < this.files.length; ++i) {
      this.removeFile(0);
    }
  }
  async addFile(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const type = fileTypeChecker.detectFile(reader.result as ArrayBuffer);
      const displayType = getFileDisplayType(file, type);
      this.files.push({
        file: file,
        url:
          displayType == DisplayFileType.IMAGE ? URL.createObjectURL(file) : '',
        type: type!.mimeType,
        displayType: displayType,
        size: file.size,
      });
    };

    reader.readAsArrayBuffer(file);
  }
  addFiles(files: File[]) {
    files.forEach((f) => this.addFile(f));
  }
  addFileList(files: FileList) {
    for (let i = 0; i < files.length; ++i) {
      this.addFile(files.item(i)!);
    }
  }
  addItemList(items: DataTransferItemList) {
    for (let i = 0; i < items.length; ++i) {
      this.addFile(items[i].getAsFile()!);
    }
  }
  onDrop(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer!.items) {
      this.addItemList(event.dataTransfer!.items);
    } else {
      this.addFileList(event.dataTransfer!.files);
    }
  }
  onChange(event: Event) {
    if (this.fileInput.nativeElement.files!?.length > 0) {
      this.addFileList(this.fileInput.nativeElement.files!);
    }
  }
}
