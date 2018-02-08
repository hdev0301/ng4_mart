/**
 * @author Hdev <hdev0301@gmail.com>
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromotionsComponent } from './promotions.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PromotionsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);