import {
  Directive,
  HostListener,
  Output,
  EventEmitter
} from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File,
  url: SafeUrl
}

@Directive({
  selector: "[appPhotoDnd]"
})
export class PhotoDndDirective {
  @Output() fileDropped: EventEmitter<FileHandle> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    const file = evt.dataTransfer!.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    this.fileDropped.emit({ file, url });
  }
}







// import {
//   Directive,
//   Output,
//   Input,
//   EventEmitter,
//   HostBinding,
//   HostListener
// } from '@angular/core';
//
// @Directive({
//   selector: '[appPhotoDnd]'
// })
// export class PhotoDndDirective {
//   @HostBinding('class.fileover') fileOver: boolean | undefined;
//   @Output() fileDropped = new EventEmitter<any>();
//
//   // Dragover listener
//   @HostListener('dragover', ['$event']) onDragOver(evt: { preventDefault: () => void; stopPropagation: () => void; }) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     this.fileOver = true;
//   }
//
//   // Dragleave listener
//   @HostListener('dragleave', ['$event']) public onDragLeave(evt: { preventDefault: () => void; stopPropagation: () => void; }) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     this.fileOver = false;
//   }
//
//   // Drop listener
//   @HostListener('drop', ['$event']) public ondrop(evt: { preventDefault: () => void; stopPropagation: () => void; dataTransfer: { files: any; }; }) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     this.fileOver = false;
//     let files = evt.dataTransfer.files;
//     if (files.length > 0) {
//       this.fileDropped.emit(files);
//     }
//   }
// }
