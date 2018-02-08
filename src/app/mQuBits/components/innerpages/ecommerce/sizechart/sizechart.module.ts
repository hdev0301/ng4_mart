import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizechartComponent } from './sizechart.component';
import { routing } from './sizechart.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [routing,
        CommonModule,
        FormsModule,
        ReactiveFormsModule],
    declarations: [
        SizechartComponent,
    ]
})
export class SizeChartModule { }