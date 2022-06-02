import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(articleDate: number): string | undefined {
    const currentDate = new Date().getTime();
    const month = 2592000000;
    if (currentDate - +articleDate < month) {
      const seconds = Math.floor((+new Date() - +new Date(articleDate)) / 1000);
      if (seconds < 29)
        return 'Just now';
      const intervals: { [key: string]: number } = {
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return `${counter} ${i} ago`; // singular (1 day ago)
          } else {
            return `${counter} ${i}s ago`; // plural (2 days ago)
          }
      }
    } else {
      let articleDateFormat = new Date(articleDate);
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      return `${articleDateFormat.getDate()} ${monthNames[articleDateFormat.getMonth()]} ${articleDateFormat.getFullYear()}`;
    }
    return undefined
  }

}
