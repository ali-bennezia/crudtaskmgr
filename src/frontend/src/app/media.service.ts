import { Injectable } from '@angular/core';
import { FileData } from './medias/file-data';
import { MediaData } from './medias/media-data';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private displayedMedia_: MediaData | null = null;
  private displaying_: boolean = false;

  set displayedMedia(val: MediaData | null) {
    if (val) {
      this.displayedMedia_ = val;
      this.displaying_ = true;
    } else {
      this.displayedMedia_ = val;
      this.displaying_ = false;
    }
  }
  get displayedMedia() {
    return this.displayedMedia_;
  }

  get displaying() {
    return this.displaying_;
  }

  constructor() {}
}
