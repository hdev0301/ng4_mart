import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllBrandsComponent } from './all-brands.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AllBrandsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);