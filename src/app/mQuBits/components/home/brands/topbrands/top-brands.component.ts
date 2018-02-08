/** 
*@author Hdev <hdev0301@gmail.com>
*/

import { Component } from '@angular/core';
import { BrandsService } from '../../../../services/brands/brands.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/retry';

/**
 *  jQuery variables
 */
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'martmax-top-brands',
  templateUrl: './top-brands.component.html',
  styleUrls: ['./top-brands.component.css'],
  providers: [BrandsService],
})
export class TopBrandsComponent {

  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    slidesPerView: 4,
    spaceBetween: 30
  };


  public top_brands: any;
  public errors: any;

  constructor(
    public brandsService: BrandsService,
    public route: ActivatedRoute,
  ) {
  }

  public ngOnInit() {
    /**
         * brandsservice 
         */
    this.brandsService.getBrands().retry(3).subscribe(
      (data) => {
        if (data.length === 0) {
          return;
        }
        this.top_brands = data.top;
      },
      (errors) => {
        this.errors = errors;
      }
    );
  }

  public setBrand(brand) {
    localStorage.setItem('currentBrand', JSON.stringify(brand));
  }
}
