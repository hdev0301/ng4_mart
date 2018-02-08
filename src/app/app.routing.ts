/** 
*@author Hdev <hdev0301@gmail.com>
*/
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';

import { TopBrandsComponent } from './mQuBits/components/home/brands/topbrands/top-brands.component';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './mQuBits/components/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'auth',
    loadChildren: './mQuBits/components/innerpages/users/auth/auth.module#AuthModule'
  },

  {
    path: 'cart',
    loadChildren: './mQuBits/components/innerpages/ecommerce/cart/cart.module#CartModule'
  },

  {
    path: 'promotions/:label',
    loadChildren: './mQuBits/components/innerpages/ecommerce/promotions/promotions.module#PromotionsModule'
  },

  {
    path: 'users/profile',
    loadChildren: './mQuBits/components/innerpages/users/profile/profile.module#ProfileModule'
  },

  {
    path: 'brands/all',
    loadChildren: './mQuBits/components/innerpages/ecommerce/allbrands/all-brands.module#AllBrandsModule'
  },

  {
    path: 'sizechart',
    loadChildren: './mQuBits/components/innerpages/ecommerce/sizechart/sizechart.module#SizeChartModule'
  },

  {
    path: 'brands/:slug',
    loadChildren: './mQuBits/components/innerpages/ecommerce/brand/brand.module#BrandModule'
  },

  {
    path: 'products/:category/:title/:url',
    loadChildren: './mQuBits/components/innerpages/ecommerce/item/item.module#ItemModule'
  },

  {
    path: 'trackorder',
    loadChildren: './mQuBits/components/innerpages/ecommerce/trackorder/track-order.module#TrackOrderModule'
  },

  {
    path: 'checkout',
    loadChildren: './mQuBits/components/innerpages/ecommerce/checkout/checkout.module#CheckoutModule'
  },

  {
    path: 'products/buyforme',
    loadChildren: './mQuBits/components/innerpages/ecommerce/buy-for-me/buy-for-me.module#BuyForMeModule'
  },

  {
    path: '**', component: HomeComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
export const appRoutingProviders: any[] = [];