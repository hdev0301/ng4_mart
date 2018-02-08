/**
 * @author Hdev <hdev0301@gmail.com>
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'moLoop',  pure: false })
export class MOloop implements PipeTransform {
    transform(value: any, args?: any[]): any[] {
      
      if(value) {
        let keyArr: any[] = Object.keys(value),
            dataArr = [];
        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
        });
        return dataArr;
      }
    }
}