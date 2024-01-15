import { Component } from '@angular/core';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.css'],
})
export class FileDropComponent {
  files: { file: File; url: string }[] = [];
  addFile(file: File) {
    this.files.push({ file: file, url: URL.createObjectURL(file) }); // TODO: see for removeObjectURL
  }
  addFiles(files: File[]) {
    files.forEach((f) => this.addFile(f));
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log('drop');

    if (event.dataTransfer!.items) {
      for (let i = 0; i < event.dataTransfer!.items.length; ++i) {
        this.addFile(event.dataTransfer!.items[i].getAsFile()!);
      }
    } else {
      for (let i = 0; i < event.dataTransfer!.files.length; ++i) {
        this.addFile(event.dataTransfer!.files.item(i)!);
      }
    }
  }
}
