import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import config from './../../../backend.json';
import {
  DisplayFileType,
  getFileArrayBufferDisplayType,
} from 'src/app/file-drop/file-drop.component';
import { FileData } from '../file-data';
import { MediaService, MediaSelection } from 'src/app/media.service';
import { Subscription } from 'rxjs';
import { MediaData } from '../media-data';

function stringToEnumDispayFileType(type: string) {
  switch (type) {
    case 'image':
      return DisplayFileType.IMAGE;
    case 'video':
      return DisplayFileType.VIDEO;
    case 'text':
      return DisplayFileType.TEXT;
    case 'archive':
      return DisplayFileType.ARCHIVE;
    default:
      return DisplayFileType.OTHER;
  }
}

@Component({
  selector: 'app-media-display',
  templateUrl: './media-display.component.html',
  styleUrls: ['./media-display.component.css'],
})
export class MediaDisplayComponent implements OnInit, OnDestroy {
  @Input()
  media!: FileData;
  @Input()
  index!: number;

  displayType: DisplayFileType = DisplayFileType.OTHER;
  loading: boolean = true;
  error: boolean = false;
  selected: boolean = false;

  displayFileTypes: typeof DisplayFileType = DisplayFileType;

  dataUrl: string | null = null;

  constructor(
    private http: HttpClient,
    private aService: AuthService,
    private mService: MediaService
  ) {}

  handleFile(name: string, buff: ArrayBuffer) {
    let fileType = getFileArrayBufferDisplayType(name, buff);
    this.displayType = fileType.displayType;
    if (this.displayType == DisplayFileType.IMAGE)
      this.dataUrl = URL.createObjectURL(new Blob([buff]));
    this.loading = false;
  }

  handleError(e: HttpErrorResponse) {
    this.loading = false;
    this.error = true;
    console.error(e);
  }

  selectionSubscription!: Subscription;
  ngOnInit(): void {
    this.selectionSubscription = this.mService.onMediaSelected$.subscribe(
      (d) => {
        this.selected = d.index === this.index;
      }
    );

    if (this.media.type == 'image') {
      let fileIdentifier = this.media.url.split('/')[1];
      this.http
        .get(`${config.backendUrl}/files/${fileIdentifier}`, {
          responseType: 'arraybuffer',
          headers: {
            Authorization: `Bearer ${this.aService.getSession()?.token}`,
          },
        })
        .subscribe({
          next: (buff) => {
            this.handleFile(fileIdentifier, buff);
          },
          error: (e) => {
            this.handleError(e);
          },
        });
    } else {
      this.displayType = stringToEnumDispayFileType(this.media.type);
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.selectionSubscription.unsubscribe();
    if (this.dataUrl) URL.revokeObjectURL(this.dataUrl);
  }

  onClick(e: Event) {
    let newSelection: MediaData = {
      file: this.media,
      dataUrl: this.dataUrl,
    };
    this.mService.selectMedia(newSelection, this.index);
  }
}
