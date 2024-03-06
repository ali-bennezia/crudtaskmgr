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
  VIDEO,
  ARCHIVE,
  TEXT,
  OTHER,
}

function getFileArrayBufferDisplayType(
  fileName: string,
  buffer: ArrayBuffer
): {
  displayType: DisplayFileType;
  mimeType: string;
} {
  let displayType: DisplayFileType = DisplayFileType.OTHER;
  let type: any = null;

  try {
    type = fileTypeChecker.detectFile(buffer);
    if (type == undefined) {
      if (fileName.endsWith('.txt')) displayType = DisplayFileType.TEXT;
    } else {
      if (type.mimeType.startsWith('image'))
        displayType = DisplayFileType.IMAGE;
      else if (type.mimeType.startsWith('video'))
        displayType = DisplayFileType.VIDEO;
      else if (
        type!.mimeType.match(/^application\/x-(rar-)?compressed$/i)!.length > 0
      )
        displayType = DisplayFileType.ARCHIVE;
    }
  } catch {
    if (fileName.endsWith('.txt')) {
      displayType = DisplayFileType.TEXT;
    }
  }
  return {
    displayType: displayType,
    mimeType:
      type?.mimeType ??
      (displayType == DisplayFileType.TEXT
        ? 'text/plain'
        : 'application/octet-stream'),
  };
}

function getFileDisplayType(
  file: File,
  buffer: ArrayBuffer
): { displayType: DisplayFileType; mimeType: string } {
  let displayType: DisplayFileType = DisplayFileType.OTHER;
  let type: any = null;

  try {
    type = fileTypeChecker.detectFile(buffer);
    if (type == undefined) {
      if (file.name.endsWith('.txt')) displayType = DisplayFileType.TEXT;
    } else {
      if (type.mimeType.startsWith('image'))
        displayType = DisplayFileType.IMAGE;
      else if (type.mimeType.startsWith('video'))
        displayType = DisplayFileType.VIDEO;
      else if (
        type!.mimeType.match(/^application\/x-(rar-)?compressed$/i)!.length > 0
      )
        displayType = DisplayFileType.ARCHIVE;
    }
  } catch {
    if (file.name.endsWith('.txt')) {
      displayType = DisplayFileType.TEXT;
    }
  }
  return {
    displayType: displayType,
    mimeType:
      type?.mimeType ??
      (displayType == DisplayFileType.TEXT
        ? 'text/plain'
        : 'application/octet-stream'),
  };
}

export { getFileArrayBufferDisplayType, getFileDisplayType };

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.css'],
})
export class FileDropComponent {
  @ViewChild('fileInput', { static: true })
  fileInput!: ElementRef<HTMLInputElement>;

  clearFileCache() {
    this.fileInput.nativeElement.files = null;
    this.fileInput.nativeElement.value = '';
  }

  files: DisplayFile[] = [];
  removeFile(index: number) {
    const [removedFile] = this.files.splice(index, 1);
    if (removedFile.displayType == DisplayFileType.IMAGE) {
      URL.revokeObjectURL(removedFile.url);
    }
    this.clearFileCache();
  }
  clearFiles() {
    const length = this.files.length;
    for (let i = 0; i < length; ++i) {
      this.removeFile(0);
    }
    this.clearFileCache();
  }
  async addFile(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const { displayType, mimeType } = getFileDisplayType(
        file,
        reader.result as ArrayBuffer
      );
      this.files.push({
        file: file,
        url:
          displayType == DisplayFileType.IMAGE ? URL.createObjectURL(file) : '',
        type: mimeType,
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
    this.clearFileCache();
  }
  onChange(event: Event) {
    if (this.fileInput.nativeElement.files!?.length > 0) {
      this.addFileList(this.fileInput.nativeElement.files!);
    }
    this.clearFileCache();
  }
}
