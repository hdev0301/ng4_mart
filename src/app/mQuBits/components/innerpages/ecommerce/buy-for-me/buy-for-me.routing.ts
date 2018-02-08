/**
 * @author Hdev <hdev0301@gmail.com>
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyForMeComponent } from './buy-for-me.component';

const routes: Routes = [
  {
    path: '',
    component: BuyForMeComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);