/**
 * @author Hdev <hdev0301@gmail.com>
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { routing } from './item.routing';

@NgModule({
    imports: [routing, CommonModule],
    declarations: [ItemComponent]
})
export class ItemModule { }