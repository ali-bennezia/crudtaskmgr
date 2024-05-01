import { Injectable } from '@angular/core';
import { FileData } from './medias/file-data';
import { MediaData } from './medias/media-data';

import { Observable, Subject } from 'rxjs';

export interface MediaSelection {
  media: MediaData | null;
  index: number;
}

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private displayedMedia_: MediaData | null = null;
  private displaying_: boolean = false;
  private displayIndex_: number = -1;

  onMediaSelectedSource: Subject<MediaSelection> = new Subject();
  onMediaSelected$: Observable<MediaSelection> =
    this.onMediaSelectedSource.asObservable();

  onDisplayingChangeSource: Subject<boolean> = new Subject();
  onDisplayChange$: Observable<boolean> =
    this.onDisplayingChangeSource.asObservable();

  selectMedia(media: MediaData, index: number) {
    this.displayedMedia = media;
    this.displayIndex_ = index;
    this.onMediaSelectedSource.next({ media, index });
  }

  deselectMedia() {
    this.displayedMedia = null;
    this.displayIndex_ = -1;
    this.onMediaSelectedSource.next({ media: null, index: -1 });
  }

  set displayedMedia(val: MediaData | null) {
    if (val) {
      this.displayedMedia_ = val;
      this.displaying = true;
    } else {
      this.displayedMedia_ = val;
      this.displaying = false;
    }
  }
  get displayedMedia() {
    return this.displayedMedia_;
  }

  private set displaying(newVal: boolean) {
    this.displaying_ = newVal;
    this.onDisplayingChangeSource.next(newVal);
  }

  get displaying() {
    return this.displaying_;
  }

  constructor() {}
}
