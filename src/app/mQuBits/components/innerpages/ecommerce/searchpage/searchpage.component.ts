/**
 * @author Hdev <hdev0301@gmail.com>
 */

import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from './../../../../models/product.model';
import { environment } from './../../../../../../environments/environment';
import { SearchService } from './../../../../services/products/search.service';
import { CartService } from './../../../../services/cart/cart.service';


@Component({
  selector: 'search-page',
  styleUrls: ['./searchpage.component.css'],
  templateUrl: './searchpage.component.html',
  providers: [SearchService,
    CartService
  ],
})
export class SearchPageComponent implements OnInit {
  public errors: any;
  public items: any;
  public page: any;

  constructor(
    public route: ActivatedRoute,
    public searchService: SearchService,
    public cartService: CartService

  ) {

  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.searchService.search({
        category: params['category'],
        keyword: params['keyword']
      }).subscribe(
        (data) => {
          this.items = data.items;
          this.page = data.page;
        },
        (errors) => {
          this.errors = errors;
        }
        );
    });
  }

  public Category(cat) {
    cat.preventDefault();

    let x = document.getElementById('category');
    if (x.className.indexOf('w3-show') === -1) {
      x.className += 'w3-show';
    } else {
      x.className = x.className.replace('w3-show', '');
    }
  }

  public Rating(rat) {
    rat.preventDefault();

    let x = document.getElementById('rating');
    if (x.className.indexOf('w3-show') === -1) {
      x.className += 'w3-show';
    } else {
      x.className = x.className.replace('w3-show', '');
      x.style.display = 'none';
    }
  }

  public Brands(bar) {
    bar.preventDefault();
    let x = document.getElementById('brands');
    if (x.className.indexOf('w3-show') === -1) {
      x.className += 'w3-show';
    } else {
      x.className = x.className.replace('w3-show', '');
    }
  }

  public Price(pri) {
    pri.preventDefault();

    let x = document.getElementById('price');
    if (x.className.indexOf('w3-show') === -1) {
      x.className += 'w3-show';
    } else {
      x.className = x.className.replace('w3-show', '');
    }
  }

  public Color(col) {
    col.preventDefault();

    let x = document.getElementById('color');
    if (x.className.indexOf('w3-show') === -1) {
      x.className += 'w3-show';
    } else {
      x.className = x.className.replace('w3-show', '');
    }
  }

    public addToCart(item: any) {
    this.cartService.announceItemAdded(item);
  }

  public isInCart(item: any): Boolean {
    return this.cartService.isInCart(item);
  }
  
}
