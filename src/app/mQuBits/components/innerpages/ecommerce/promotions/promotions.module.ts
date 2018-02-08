import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions.component';
import { routing } from './promotions.routing';

@NgModule({
    imports: [routing,CommonModule],
    declarations: [PromotionsComponent]
})
export class PromotionsModule { }