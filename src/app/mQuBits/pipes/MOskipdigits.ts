import { Pipe, PipeTransform, WrappedValue } from '@angular/core';

@Pipe({ name: 'MOskipDigits'})
export class MOskipDigitsPipe implements PipeTransform {
	transform(value){
		return value.replace(/\d+/g, '').replace("-","");
	}
}
