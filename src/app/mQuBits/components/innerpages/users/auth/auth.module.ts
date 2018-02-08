import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { routing } from './auth.routing';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
@NgModule({
    imports: [
        routing,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AuthComponent,
    ]
})
export class AuthModule { }