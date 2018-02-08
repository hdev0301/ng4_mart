import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandComponent } from './brand.component';

const routes: Routes = [
  {
    path: '',
    component: BrandComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);