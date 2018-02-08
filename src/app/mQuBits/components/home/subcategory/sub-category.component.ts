/** 
*@author Hdev <hdev0301@gmail.com>
*/

import { Component, OnInit } from '@angular/core';
import { BannersService } from '../../../services/categories/banners/banners.service';
import 'rxjs/add/operator/retry';
import { MOloop } from './../../../pipes/mo-loop.pipe';
/**
 *  jQuery variables
 */
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'martmax-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css'],
  providers: [BannersService],
})
export class SubCategoryComponent {

  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    freeMode: true,
    autoplay: 2000,
    loop: true,
  };

  public errors: any;
  public categories: any;

  constructor(public bannersService: BannersService) {
  }

  public ngOnInit() {
    /**
     * sub category service  'banners'
     */
    this.bannersService.listingBannersByCategory().retry(3).subscribe(
      (data) => {
        if (data.length === 0) {
          return;
        }
        this.categories = data.categories;
      },
      (errors) => {
        this.errors = errors;
      }
    );
  }

  public getLink(link: any) {
    document.location.href = '#' + link;
  }
}
