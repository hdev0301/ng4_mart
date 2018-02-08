import { Pipe, PipeTransform, WrappedValue } from '@angular/core';

@Pipe({ name: 'mQRestify' })
export class MQRestifyPipe implements PipeTransform {
  public transform(value: any): any {
    if (!value) {
      return value;
    }
    return value.replace(/(^")|("$)/g, '');
  }
}



