import { DatePipe } from '../date.pipe';
import {TestBed} from "@angular/core/testing";

describe('DatePipe', () => {
  let pipe: DatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ DatePipe ]
    });

    pipe = TestBed.inject(DatePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return sign for 2 seconds', () => {
    const twoSecDate = new Date().getTime() - 2000;
    expect(pipe.transform(twoSecDate)).toBe('Just now');
  });

  it('should return sign for singular value', () => {
    const oneMinDate = new Date().getTime() - 60000;
    expect(pipe.transform(oneMinDate)).toBe('1 minute ago');
  });

  it('should return sign for plural value', () => {
    const oneMinDate = new Date().getTime() - 7200000;
    expect(pipe.transform(oneMinDate)).toBe('2 hours ago');
  });

  it('should return sign for 1 day', () => {
    const oneMinDate = new Date().getTime() - 86400000;
    expect(pipe.transform(oneMinDate)).toBe('1 day ago');
  });

  it('should return sign for concrete month', () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const oneMonthDate = new Date().getTime() - 2592000000;
    let oneMonthDateFormat = new Date(oneMonthDate);
    expect(pipe.transform(oneMonthDate)).toBe(`${oneMonthDateFormat.getDate()} ${monthNames[oneMonthDateFormat.getMonth()]} ${oneMonthDateFormat.getFullYear()}`);
  });
});
