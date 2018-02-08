/**
 * @author Hdev <hdev0301@gmail.com>
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackOrderComponent } from './track-order.component';

const routes: Routes = [
  {
    path: '',
    component: TrackOrderComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);