/**
 * @author Hdev <hdev0301@gmail.com>
 */
import {
  Component,
  OnInit,
  Input,
  Attribute,
  ElementRef,
  EventEmitter,
  Output,
  AfterViewInit,
  AfterContentInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../../environments/environment';
import { SearchService } from './../../../../services/products/search.service';
import { CartService } from './../../../../services/cart/cart.service';
import { ScrapService } from './../../../../services/products/scrap.service';
import { Coupon } from './../../../../models/coupon.model';
/**
 *  jQuery variables
 */
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'single-item',
  styleUrls: ['./item.component.css'],
  templateUrl: './item.component.html',
  providers: [
    SearchService,
    CartService,
    ScrapService
  ]
})

export class ItemComponent implements OnInit, AfterViewInit, AfterContentInit {
  config: Object = {
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 10,
    slidesPerView: 5,
    slidesPerColumn: 1,
    autoplay: 2500,
    loop: true
  };
  public items: any;
  public item: any;
  public page: any;
  public errors: any;
  public counter: number = 1;
  public colors: any;
  public colorsImages: any;
  public sizes: any;
  public color: any;
  public value: any;
  public small: any;
  public more: any;
  public features: any;
  public maxPrice: number;
  public displayColor: boolean;
  public displaySize: boolean;
  public displayPriceRange: boolean;
  public originalPrice: number;
  public offerPrice: number;
  public originalPriceClass: string;
  public lowestPrice: number;
  public mapIteratorLoaded: boolean;
  public selectedColor: string;
  public selectedSize: string;
  public mQLargestImage: string;
  public zoomedImageSrc: string;

  @Input() public category: String;
  @Input() public keyword: String;
  @Input() public pagination: Number;

  @ViewChild('usefulSwiper') usefulSwiper: any;

  constructor(
    public route: ActivatedRoute,
    public searchService: SearchService,
    public cartService: CartService,
    public scrapService: ScrapService
  ) {
    this.selectedColor = null;
    this.selectedSize = null;
    this.mQLargestImage = null;
    this.zoomedImageSrc = null;
  }

  public ngOnInit() {
    /**
     * jQuery 
     */

    /* carsoual  */
    $(".owl-carousel").owlCarousel({
      margin: 0,
      nav: true,
      items: 5
    });

  }

  public ngAfterViewInit() {
    //
  }

  public ngAfterContentInit() {
    window.setTimeout(() => { this.loadProduct(); });
  }

  public loadProduct() {
    this.mapIteratorLoaded = false;
    this.route.params.subscribe(params => {
      let url = params['url'];
      this.scrapService.find({
        url: url
      }).subscribe(
        (data) => {
          this.item = data;
          this.maxPrice = this.getMaxPrice(this.item);
          this.colors = [];
          this.small = [];
          this.colorsImages = [];
          Object.keys(this.item.colors).map((key) => {
            this.colors.push(key);
            this.colorsImages.push(this.item.colors[key]);
            this.small.push(this.item.colors[key]);
          });
          this.sizes = [];
          Object.keys(this.item.sizes).map((key) => {
            this.sizes.push(key);
          });
          this.features = [];
          Object.keys(this.item.features).map((key) => {
            this.features.push(this.item.features[key]);
          });
          this.mQLargestImage = this.item.images.large.url;
          this.zoomedImageSrc = this.item.images.large.url;
        },
        (error) => { },
        () => { this.mapIteratorLoaded = true; }
        );
    });
  }

  public getMaxPrice(item: any) {
    let maxPrice = 0;
    this.originalPrice = item.price;
    this.offerPrice = (item.offer_price) ? item.offer_price.new : null;

    if (this.offerPrice && this.offerPrice < this.originalPrice) {
      this.originalPriceClass = 'mq-cross-original-price';
    } else {
      this.originalPriceClass = 'hidden';
    }

    this.lowestPrice = (item.lowest_price) ? item.lowest_price.new : Number.MAX_VALUE;
    let numVariations = 0;

    for (let size in item.variations.items) {
      if (!item.variations.items[size]) {
        continue;
      }
      for (let color in item.variations.items[size]) {
        if (!item.variations.items[size][color]) {
          continue;
        }
        let details = item.variations.items[size][color];
        if (details.offer_price &&
          details.offer_price.amount &&
          details.offer_price.amount > maxPrice) {
          maxPrice = details.offer_price.amount;
        } else if (details.online_price &&
          details.online_price.amount &&
          details.online_price.amount > maxPrice) {
          maxPrice = details.online_price.amount;
        }

        /**
         * Determine Lowest Price
         */
        if (details.offer_price &&
          details.offer_price.amount &&
          details.offer_price.amount < this.lowestPrice
        ) {
          this.lowestPrice = details.offer_price.amount;
        } else if (details.online_price &&
          details.online_price.amount &&
          details.online_price.amount < this.lowestPrice
        ) {
          this.lowestPrice = details.online_price.amount;
        }

        ++numVariations;
      }
    }
    this.displayPriceRange = false;
    if (numVariations > 0 && maxPrice > this.lowestPrice) {
      this.displayPriceRange = true;
    }
    return maxPrice;
  }

  public increment() {
    if (this.counter < 5) {
      this.counter += 1;
    }
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

  public changeColor(e, newVal) {
    this.selectedColor = newVal;
    this.setActiveClass('mq-active-color');
    e.target.className += ' mq-active-color';

    this.setActiveClass('mq-inactive-size');
    for (let size in this.item.variations.items) {
      if (!this.item.variations.items[size]) {
        continue;
      }
      let eleBtnSizeInactive = document.querySelector('button[value="' + size + '"]');
      if (this.item.variations.items[size][newVal]) {
        eleBtnSizeInactive.removeAttribute('disabled');
        let tempDetails = this.item.variations.items[size][newVal];
        this.small = [];
        if (tempDetails.images && tempDetails.images.more && tempDetails.images.more.large) {
          for (let index in tempDetails.images.more.large) {
            this.small.push(tempDetails.images.more.large[index]);
          }
        }
        if (this.usefulSwiper) {
          this.usefulSwiper.swiper.removeAllSlides();
          for (let i in this.small) {
            this.usefulSwiper.appendSlide('<img src="' + this.small[i] + '" class="img-responsive center-block margin-padding-zero" />');
          }
        }

        this.mQLargestImage = tempDetails.images.large.url;
        this.zoomedImageSrc = tempDetails.images.large.url;
      } else {
        eleBtnSizeInactive.setAttribute('disabled', '');
        eleBtnSizeInactive.className += ' mq-inactive-size';
      }
    }
    this.getPrice();
  }

  public changeSize(e, newVal) {
    this.selectedSize = newVal;
    this.setActiveClass('mq-active-size');
    e.target.className += ' mq-active-size';

    this.setActiveClass('mq-inactive-color');
    let tempArrAvailColors = [];
    for (let color in this.item.variations.items[newVal]) {
      if (!this.item.variations.items[newVal][color]) {
        continue;
      }
      let mqDetailsSelected = this.item.variations.items[newVal][color];
      tempArrAvailColors.push(mqDetailsSelected.color);
    }
    for (let iColor in this.colors) {
      if (tempArrAvailColors.find((tempo) => { return tempo === this.colors[iColor]; })) { continue; }
      let mqElementSelectedColorAvail = document.querySelector('img[alt="' + this.colors[iColor] + '"]');
      if (mqElementSelectedColorAvail) {
        mqElementSelectedColorAvail.className += ' mq-inactive-color';
      }
    }
    this.getPrice();
  }

  public setActiveClass(className) {
    let arrElements = document.getElementsByClassName(className);
    for (let ele in arrElements) {
      if (!arrElements[ele] || !arrElements[ele].className) { continue; }
      arrElements[ele].className = arrElements[ele].className.replace(className, '');
    }
  }

  public getPrice() {
    let arrColorsActive = document.getElementsByClassName('mq-active-color');
    let arrSizesActive = document.getElementsByClassName('mq-active-size');
    if (arrColorsActive.length > 0 && arrSizesActive.length > 0) {
      let selColorVal = arrColorsActive[0].getAttribute('alt');
      let selSizeVal = arrSizesActive[0].getAttribute('value');
      this.selectedColor = selColorVal;
      this.selectedSize = selSizeVal;
      if (this.item.variations.items[selSizeVal][selColorVal]) {
        let tempDetails = this.item.variations.items[selSizeVal][selColorVal];
        this.displayPriceRange = false;

        /**
         * Determine Lowest Price
         */
        if (tempDetails.offer_price &&
          tempDetails.offer_price.amount
        ) {
          this.offerPrice = tempDetails.offer_price.amount;
        }

        if (tempDetails.online_price &&
          tempDetails.online_price.amount
        ) {
          this.originalPrice = tempDetails.online_price.amount;
        }
      }
    } else {
      this.displayPriceRange = true;
    }
  }

  public addToCart(item: any) {
    this.cartService.announceItemAdded(item);
  }

  public isInCart(item: any): Boolean {
    return this.cartService.isInCart(item);
  }
}
