/**
 * @author Hdev  <hdev0301@gmail.com>
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


/**
 * services
 */
import { OAuthService } from './mQuBits/services/oauth/oauth.service';
import { Handler } from './mQuBits/services/handler';

/**
 * martmax components  
 */

/**
 * front-page
 */
import { HomeComponent } from './mQuBits/components/home.component';
import { RootComponent } from './root/root.component';
import { HeaderComponent } from './mQuBits/components/home/header/header.component';
import { FooterComponent } from './mQuBits/components/home/footer/footer.component';
import { BannerComponent } from './mQuBits/components/home/banner/banner.component';
import { StickyComponent } from './mQuBits/components/home/sticky/sticky.component';
import { TopCategoryComponent } from './mQuBits/components/home/topcategory/top-category.component';
import { TopBrandsComponent } from './mQuBits/components/home/brands/topbrands/top-brands.component';
import { TopDealsComponent } from './mQuBits/components/home/topdeals/top-deals.component';

/**
 * inner pages
 */
import { SubCategoryComponent } from './mQuBits/components/home/subcategory/sub-category.component';
import { CategorylandingpageComponent } from './mQuBits/components/innerpages/ecommerce/category-landing-page/category-landing-page.component';
import { CatalogComponent } from './mQuBits/components/innerpages/ecommerce/catalog/catalog.component';
import { CouponsHistoryComponent } from './mQuBits/components/innerpages/ecommerce/couponshistory/coupons-history.component';
import { SearchPageComponent } from './mQuBits/components/innerpages/ecommerce/searchpage/searchpage.component';
import { BecomePremiumComponent } from './mQuBits/components/innerpages/info/becomepremium/becomepremium.component';
import { HowItWorksComponent } from './mQuBits/components/innerpages/info/howitworks/howitworks.component';
import { WhyUsComponent } from './mQuBits/components/innerpages/info/whyus/whyus.component';

/**
 * pipes 
 */
import { MOloop } from './mQuBits/pipes/mo-loop.pipe';
import { MOskipDigitsPipe } from './mQuBits/pipes/MOskipdigits';

/**
 * third libraries
 */
import { SwiperModule } from 'angular2-useful-swiper';
import { NgProgressModule } from 'ng2-progressbar';

@NgModule({
  declarations: [
    /**
     * Home page
     */
    AppComponent,
    HomeComponent,
    RootComponent,
    HeaderComponent,
    BannerComponent,
    StickyComponent,
    TopCategoryComponent,
    TopBrandsComponent,
    TopDealsComponent,
    SubCategoryComponent,
    FooterComponent,
    /**
     * inner pages
     */
    CategorylandingpageComponent,
    CatalogComponent,
    CouponsHistoryComponent,
    SearchPageComponent,
    BecomePremiumComponent,
    HowItWorksComponent,
    WhyUsComponent,

    /**
     * pipes
     */
    MOloop,
    MOskipDigitsPipe,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgProgressModule
  ],

  providers: [
    OAuthService,
    Handler,
    appRoutingProviders
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
