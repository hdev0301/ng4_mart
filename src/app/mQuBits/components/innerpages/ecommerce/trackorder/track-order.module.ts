/**
 * @author Hdev <hdev0301@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackOrderComponent } from './track-order.component';
import { routing } from './track-order.routing';

@NgModule({
    imports: [routing,CommonModule],
    declarations: [TrackOrderComponent]
})
export class TrackOrderModule { }