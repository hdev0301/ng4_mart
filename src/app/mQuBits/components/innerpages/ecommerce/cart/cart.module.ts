import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { routing } from './cart.routing';

@NgModule({
    imports: [routing,CommonModule],
    declarations: [CartComponent]
})
export class CartModule { }