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
  @Input() url: SafeUrl = '';
  @Output() updateFile = new EventEmitter<string>();

  constructor(private sanitizer: DomSanitizer) { }

  onFileDropped(fileHandle: FileHandle): void {
    this.url = fileHandle.url;
    this.convertFileToBase64(fileHandle.file);
  }

  fileBrowseHandler(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];
    this.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    this.convertFileToBase64(file);
  }

  convertFileToBase64(file: Blob | undefined): void {
    let reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => {
      const base64File = reader.result as string;
      this.updateFile.emit(base64File);
    }
  }

  deleteFile(): void {
    this.url = '';
    this.updateFile.emit('');
  }

}
