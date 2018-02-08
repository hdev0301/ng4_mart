/**
 * @author Hdev <hdev0301@gmail.com>
 */

import {
  Component,
  OnInit,
  Input,
  Attribute,
  ElementRef,
  OnChanges
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../../environments/environment';
import { ScrapService } from './../../../../services/products/scrap.service';
import { CartService } from './../../../../services/cart/cart.service';
import { NgProgressService } from "ng2-progressbar";

/**
 *  jQuery variables
 */
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'martmax-buy-for-me',
  styleUrls: ['./buy-for-me.component.css'],
  templateUrl: './buy-for-me.component.html',
  providers: [
    ScrapService,
    CartService
  ]
})
export class BuyForMeComponent implements OnInit, OnChanges {
  public colors: any;
  public sizes: any;
  public item: any;
  public errors: any;
  public url;
  public urlxs;
  public itemFormErrors: any;

  /**
   * Form Controls
   */
  public scrapForm: FormGroup;
  public scrapFormxs: FormGroup;
  public itemForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public scrapService: ScrapService,
    private fb: FormBuilder,
    public cartService: CartService,
    public progress: NgProgressService
  ) {
  }

  public ngOnInit() {
    this.createForm();
    this.createItemForm();
  }

  public createForm() {
    this.scrapForm = this.fb.group({
      url: ['', [Validators.required]]
    });

    this.scrapForm.valueChanges.subscribe((data) => (this.ngOnChanges()));

    this.ngOnChanges();
  }

  public createItemForm() {
    this.itemForm = this.fb.group({
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      size: ['', []],
      color: ['', []],
      category: ['', []],
      comment: ['', []],
      currency: ['', []]
    });
  }

  public ngOnChanges() {
    if (!this.scrapForm.value.url) {
      return;
    }
    this.progress.start();
    this.scrapService.find({
      url: this.scrapForm.value.url
    }).subscribe(
      (data) => {
        $(".ways").hide(500);
        this.item = data;
        this.colors = [];
        Object.keys(this.item.colors).map((key) => {
          this.colors.push(key)
        });
        this.sizes = [];
        Object.keys(this.item.sizes).map((key) => {
          this.sizes.push(key)
        });
        this.progress.done();
        this.itemForm.patchValue({
          price: this.item.price,
          currency: this.item.currency,
          quantity: this.item.quantity,
          category: this.item.category,
          size: this.item.size
        });
      },
      (errors) => {
        this.errors = errors;
      }
      );
  }

  public onSubmit() {
    this.cartService.announceItemAdded(this.item);
  }

}
