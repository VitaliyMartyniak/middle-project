import { Component } from '@angular/core';
import {FileHandle} from "../../directives/photo-dnd.directive";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-photo-dnd',
  templateUrl: './photo-dnd.component.html',
  styleUrls: ['./photo-dnd.component.scss']
})
export class PhotoDndComponent {
  file: FileHandle | null | undefined;

  constructor(private sanitizer: DomSanitizer) { }

  onFileDropped(file: FileHandle) {
    this.file = file;
  }

  fileBrowseHandler(event: any) {
    const file = event.target.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    this.file = { file, url };
  }

  deleteFile() {
    this.file = null;
  }

}
