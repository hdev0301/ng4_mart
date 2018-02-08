import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { routing } from './checkout.routing';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

@NgModule({
    imports: [
        routing,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [CheckoutComponent]
})
export class CheckoutModule { }