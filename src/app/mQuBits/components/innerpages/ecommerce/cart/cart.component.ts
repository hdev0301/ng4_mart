/**
 * @author Hdev <hdev0301@gmail.com>
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../../environments/environment';
import { CartService } from './../../../../services/cart/cart.service';

@Component({
  selector: 'cart',
  styleUrls: ['./cart.component.css'],
  templateUrl: './cart.component.html',
  providers: [
    CartService
  ],
})
export class CartComponent implements OnInit {
  public errors: any;
  public items: any;
  public sum: number;
  public totalItems: number;

  constructor(
    public route: ActivatedRoute,
    public cartService: CartService
  ) {

  }

  public ngOnInit() {
    this.sum = this.cartService.sumTotal();
    this.items = this.cartService.get();
    console.log(this.items);
    this.totalItems = this.cartService.cartTotalItem();
  }

  public removeFromCart(item: any) {
    this.cartService.remove(item);
    this.items = this.cartService.get();
    this.sum = this.cartService.sumTotal();
  }

}
