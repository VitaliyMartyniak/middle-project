import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FileHandle} from "../../directives/photo-dnd.directive";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-photo-dnd',
  templateUrl: './photo-dnd.component.html',
  styleUrls: ['./photo-dnd.component.scss']
})
export class PhotoDndComponent {

  @Input() containerHeight: string = '';
  @Output() updateFile = new EventEmitter<FileHandle | null>();

  file: FileHandle | null | undefined;

  constructor(private sanitizer: DomSanitizer) { }

  onFileDropped(file: FileHandle) {
    this.file = file;
    this.updateFile.emit(this.file);
  }

  fileBrowseHandler(event: any) {
    const file = event.target.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    this.file = { file, url };
    this.updateFile.emit(this.file);
  }

  deleteFile() {
    this.file = null;
    this.updateFile.emit(this.file);
  }

}
