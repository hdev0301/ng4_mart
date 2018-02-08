import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SizechartComponent } from './sizechart.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SizechartComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);