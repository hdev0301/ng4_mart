import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBrandsComponent } from './all-brands.component';
import { routing } from './all-brands.routing';

@NgModule({
    imports: [routing,CommonModule],
    declarations: [AllBrandsComponent]
})
export class AllBrandsModule { }