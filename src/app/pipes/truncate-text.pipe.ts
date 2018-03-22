import {Pipe} from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe {
  transform(value: string, stringLength: string, trailValue: string) : string {

    let limit = parseInt(stringLength, 10) || 10;

    let trail = trailValue || '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}