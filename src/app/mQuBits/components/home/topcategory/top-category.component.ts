/** 
*@author Hdev <hdev0301@gmail.com>
*/

import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories/top-category/top-categories.service';
import 'rxjs/add/operator/retry';
import { MOloop } from './../../../pipes/mo-loop.pipe';
import { Router, ActivatedRoute } from '@angular/router';

/**
 *  jQuery variables
 */
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'martmax-main-category',
  templateUrl: './top-category.component.html',
  styleUrls: ['./top-category.component.css'],
  providers: [CategoriesService],
})

export class TopCategoryComponent implements OnInit {


  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay: 1500,
    loop: true,
  };

  public data: any;
  public errors: any;
  public banners: any;
  public categories: any;
  public coupon: any;
  public slides: any;
  public a: any;
  public b: any;
  public c: any;

  constructor(public topCategory: CategoriesService) {
  }

  public ngOnInit() {

    $(".main-cat").mouseenter(function () {
      $(this).children(".sub-category").addClass(" open");
    }).mouseleave(function () {
      $(this).children(".sub-category").removeClass(" open");
    });

    /**
     * top category service 
     */
    this.topCategory.getTopCategoryData().retry(3).subscribe(
      (data) => {
        if (data.length === 0) {
          return;
        }
        this.data = data;
        this.banners = this.data.topbanners;
        this.categories = this.data.Categories[0].children;
        this.coupon = this.data.coupon;
        this.slides = this.data.topbanners.Slider;
        this.a = this.data.topbanners.A[0];
        this.b = this.data.topbanners.B[0];
        this.c = this.data.topbanners.C[0];
      },
      (errors) => {
        this.errors = errors;
      }
    );
  }

  public copyToClipboard() {
    $('#btn').click(function () {
      $(this).addClass('clicked');
      $(this).html('saved <i class="fa fa-check-square-o" aria-hidden="true"></i>');
    });
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('#code').text()).select();
    document.execCommand("copy");
    $temp.remove();
  }
}
