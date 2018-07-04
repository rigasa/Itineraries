import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceUrl'
})
export class ReplaceUrlPipe implements PipeTransform {

  transform(input: string, from: string, to: string): any {

    input = input || '';
    from = from || '';
    to = to || '';
    return input.replace(new RegExp(from, 'g'), to);
  }

}
