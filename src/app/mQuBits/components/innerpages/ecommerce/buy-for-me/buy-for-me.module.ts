/**
 *@author Hdev <hdev0301@gmail.com>
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './buy-for-me.routing';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { BuyForMeComponent } from './buy-for-me.component';

@NgModule({
    imports: [
        routing,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [BuyForMeComponent]
})
export class BuyForMeModule { }