import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './brand.component';
import { routing } from './brand.routing';

@NgModule({
    imports: [routing,CommonModule],
    declarations: [BrandComponent]
})
export class BrandModule { }