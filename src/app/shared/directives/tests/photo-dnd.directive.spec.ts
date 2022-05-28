import { PhotoDndDirective } from '../photo-dnd.directive';
import {TestBed} from "@angular/core/testing";
import {DragDropModule} from "@angular/cdk/drag-drop";

// @ts-ignore
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
const event: any = {
  preventDefault: () => {},
  stopPropagation: () => {},
  dataTransfer: {
    files: [file]
  }
};

let directive: PhotoDndDirective;

describe('PhotoDndDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DragDropModule
      ],
      providers: [
        PhotoDndDirective
      ]
    });

    directive = TestBed.inject(PhotoDndDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should call preventDefault and stopPropagation when onDragOver', () => {
    const method = spyOn(event, 'preventDefault');
    const method2 = spyOn(event, 'stopPropagation');
    directive.onDragOver(event);
    expect(method).toHaveBeenCalled();
    expect(method2).toHaveBeenCalled();
  });

  it('should call preventDefault and stopPropagation when onDragLeave', () => {
    const method = spyOn(event, 'preventDefault');
    const method2 = spyOn(event, 'stopPropagation');
    directive.onDragLeave(event);
    expect(method).toHaveBeenCalled();
    expect(method2).toHaveBeenCalled();
  });

  // don't recomment
  // it('should call preventDefault and stopPropagation when onDrop', () => {
  //   const method = spyOn(event, 'preventDefault');
  //   const method2 = spyOn(event, 'stopPropagation');
  //   directive.onDrop(event);
  //   expect(method).toHaveBeenCalled();
  //   expect(method2).toHaveBeenCalled();
  // });
});
