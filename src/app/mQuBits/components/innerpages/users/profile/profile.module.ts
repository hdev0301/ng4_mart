import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MQRestifyPipe } from './../../../../../mQuBits/pipes/m-q-restify.pipe';

@NgModule({
    imports: [routing,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ProfileComponent,
        MQRestifyPipe
    ]
})
export class ProfileModule { }