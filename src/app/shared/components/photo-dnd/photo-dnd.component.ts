import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FileHandle} from "../../directives/photo-dnd.directive";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-photo-dnd',
  templateUrl: './photo-dnd.component.html',
  styleUrls: ['./photo-dnd.component.scss']
})
export class PhotoDndComponent {

  @Input() containerHeight: string = '';
  @Output() updateFile = new EventEmitter<string>();

  file: Blob | null | undefined;
  url: SafeUrl;

  constructor(private sanitizer: DomSanitizer) { }

  onFileDropped(fileHandle: FileHandle) {
    this.file = fileHandle.file;
    this.url = fileHandle.url;
    this.convertFileToBase64();
  }

  fileBrowseHandler(event: any) {
    this.file = event.target.files[0];
    this.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
    this.convertFileToBase64();
  }

  convertFileToBase64() {
    let reader = new FileReader();
    reader.readAsDataURL(this.file as Blob);
    reader.onloadend = () => {
      const base64File = reader.result as string;
      this.updateFile.emit(base64File);
    }
  }

  deleteFile() {
    this.file = null;
    this.url = '';
    this.updateFile.emit('');
  }

}
