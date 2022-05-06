import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDndComponent } from './photo-dnd.component';
import {FileHandle} from "../../directives/photo-dnd.directive";

describe('PhotoDndComponent', () => {
  let component: PhotoDndComponent;
  let fixture: ComponentFixture<PhotoDndComponent>;

  const file: File = {
    arrayBuffer(): Promise<ArrayBuffer> {
      // @ts-ignore
      return Promise.resolve(undefined);
    },
    lastModified: 0,
    name: "",
    size: 0,
    slice(start: number | undefined, end: number | undefined, contentType: string | undefined): Blob {
      // @ts-ignore
      return undefined;
    },
    stream(): ReadableStream {
      // @ts-ignore
      return undefined;
    },
    text(): Promise<string> {
      return Promise.resolve("");
    },
    type: "",
    webkitRelativePath: ""
  }

  // @ts-ignore
  const event: Event = {
    AT_TARGET: 0,
    BUBBLING_PHASE: 0,
    CAPTURING_PHASE: 0,
    NONE: 0,
    bubbles: false,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    composedPath(): EventTarget[] {
      return [];
    },
    currentTarget: null,
    defaultPrevented: false,
    eventPhase: 0,
    initEvent(type: string, bubbles: boolean | undefined, cancelable: boolean | undefined): void {
    },
    isTrusted: false,
    returnValue: false,
    srcElement: null,
    target: null,
    timeStamp: 0,
    type: "",
    preventDefault(): void {
    },
    stopImmediatePropagation(): void {
    },
    stopPropagation(): void {
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoDndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoDndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  //
  // it('should convertFileToBase64 when onFileDropped', () => {
  //   const fileHandle: FileHandle = {
  //     file: file,
  //     url: "SafeUrl"
  //   }
  //   const method = spyOn(component, 'convertFileToBase64');
  //   component.onFileDropped(fileHandle);
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(fileHandle.file);
  //   expect(component.url).toBe(fileHandle.url);
  // });
  //
  // it('should emit updateFile when deleteFile', () => {
  //   const method = spyOn(component.updateFile, 'emit');
  //   component.deleteFile();
  //   expect(method).toHaveBeenCalled();
  // });
});
