/**
 * @author Hdev <hdev0301@gmail.com>
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemComponent } from './item.component';

const routes: Routes = [
  {
    path: '',
    component: ItemComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);