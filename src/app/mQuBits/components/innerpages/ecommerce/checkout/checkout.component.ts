/**
 * @author Hdev <hdev0301@gmail.com>
 */
import {
  Component,
  OnInit,
  Input,
  Attribute,
  ElementRef,
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from './../../../../models/product.model';
import { environment } from './../../../../../../environments/environment';
import { GeoIPService } from './../../../../services/geoip/geoip.service';
import { ProfileService } from './../../../../services/users/profile.service';
import { CartService } from './../../../../services/cart/cart.service';
import { CheckoutService } from './../../../../services/checkout/checkout.service';

@Component({
  selector: 'checkout',
  styleUrls: ['./checkout.component.css'],
  templateUrl: './checkout.component.html',
  providers: [
    GeoIPService,
    ProfileService,
    CartService,
    CheckoutService
  ]
})

export class CheckoutComponent implements OnInit {
  public items: any;
  public page: any;
  public errors: any;
  public user: any;
  public total: any;
  public result: any;

  /**
   * Form Controls
   */
  public checkoutForm: FormGroup;
  public formErrors: any = {};

  constructor(
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private geoipService: GeoIPService,
    private profileService: ProfileService,
    private cartService: CartService,
    private checkoutService: CheckoutService
  ) {
  }

  public ngOnInit() {
    this.createForm();
    this.populateForm();
  }

  public createForm() {
    this.checkoutForm = this.fb.group({
      billing: this.fb.group({
        method: ['', Validators.compose([])],
        coupon: ['', Validators.compose([])],
        creditCard: this.fb.group({
          pan: ['', Validators.compose([])],
          pin: ['', Validators.compose([])],
          expiryMonth: ['', Validators.compose([])],
          expiryYear: ['', Validators.compose([])],
          cardHolderName: ['']
        }),
        wallet: this.fb.group({
          mobile: ['', Validators.compose([])],
        }),
        cash: this.fb.group({
          firstName: ['', Validators.compose([Validators.minLength(6)])],
          lastName: ['', Validators.compose([Validators.minLength(6)])],
          email: ['', Validators.compose([])],
          mobile: ['', Validators.compose([])],
          apartment: ['', Validators.compose([])],
          floor: ['', Validators.compose([])],
          building: ['', Validators.compose([])],
          street: ['', Validators.compose([])],
          district: ['', Validators.compose([])],
          city: ['', Validators.compose([])],
          postalCode: ['', Validators.compose([])],
          state: ['', Validators.compose([])],
          country: ['', Validators.compose([])]
        })
      }),
      shipping: this.fb.group({
        method: ['', Validators.compose([])],
        firstName: ['', Validators.compose([Validators.minLength(6)])],
        lastName: ['', Validators.compose([Validators.minLength(6)])],
        email: ['', Validators.compose([])],
        mobile: ['', Validators.compose([])],
        apartment: ['', Validators.compose([])],
        floor: ['', Validators.compose([])],
        building: ['', Validators.compose([])],
        street: ['', Validators.compose([])],
        district: ['', Validators.compose([])],
        city: ['', Validators.compose([])],
        postalCode: ['', Validators.compose([])],
        state: ['', Validators.compose([])],
        country: ['', Validators.compose([])]
      }),
      products: this.fb.group({

      })
    });

    this.checkoutForm.valueChanges.subscribe((data) => (this.onValueChanged(data)));

    this.onValueChanged();
  }

  public onValueChanged(data?: any) {
    if (!this.checkoutForm) {
      return;
    }
    for (let key in this.formErrors) {
      if (!this.formErrors[key]) {
        continue;
      }
      this.formErrors[key] = '';
    }
  }

  public formatPayLoad(formValue: any) {
    let ret = {};

    ret['user_id'] = parseInt(localStorage.getItem('currentUser'), 10);
    ret['amount'] = this.cartService.sumTotal();
    ret['currency'] = 'EGP'; // @todo: fix on server

    let tempArr = [];

    for ( let index in this.items ) {
      if (!this.items[index]['price']) {
        continue;
      }
      let item = this.items[index];
      let tempObj = {
        quantity: item['quantity'] ? item['quantity'] : 1,
        url: item['url']
      };

      tempArr.push(tempObj);
    }
    ret['products'] = tempArr;

    ret['shipping_data'] = {};
    ret['shipping_data']['method'] = formValue.shipping.method;
    ret['shipping_data']['first_name'] = formValue.shipping.firstName;
    ret['shipping_data']['last_name'] = formValue.shipping.lastName;
    ret['shipping_data']['email'] = formValue.shipping.email;
    ret['shipping_data']['phone_number'] = formValue.shipping.mobile;
    ret['shipping_data']['apartment'] = formValue.shipping.apartment;
    ret['shipping_data']['floor'] = formValue.shipping.floor;
    ret['shipping_data']['building'] = formValue.shipping.building;
    ret['shipping_data']['street'] = formValue.shipping.street;
    ret['shipping_data']['district'] = formValue.shipping.district;
    ret['shipping_data']['city'] = formValue.shipping.city;
    ret['shipping_data']['state'] = formValue.shipping.state;
    ret['shipping_data']['country'] = formValue.shipping.country;
    ret['shipping_data']['postal_code'] = formValue.shipping.postalCode;

    ret['billing_data'] = {};
    ret['billing_data']['first_name'] = formValue.billing.cash.firstName;
    ret['billing_data']['last_name'] = formValue.billing.cash.lastName;
    ret['billing_data']['email'] = formValue.billing.cash.email;
    ret['billing_data']['phone_number'] = formValue.billing.cash.mobile;
    ret['billing_data']['apartment'] = formValue.billing.cash.apartment;
    ret['billing_data']['floor'] = formValue.billing.cash.floor;
    ret['billing_data']['building'] = formValue.billing.cash.building;
    ret['billing_data']['street'] = formValue.billing.cash.street;
    ret['billing_data']['district'] = formValue.billing.cash.district;
    ret['billing_data']['city'] = formValue.billing.cash.city;
    ret['billing_data']['state'] = formValue.billing.cash.state;
    ret['billing_data']['country'] = formValue.billing.cash.country;
    ret['billing_data']['postal_code'] = formValue.billing.cash.postalCode;
    ret['billing_data']['method'] = formValue.billing.method;

    ret['credit_card'] = {};
    ret['credit_card']['pan'] = formValue.billing.creditCard.pan;
    ret['credit_card']['pin'] = formValue.billing.creditCard.pin;
    ret['credit_card']['expiry_month'] = formValue.billing.creditCard.expiryMonth;
    ret['credit_card']['expiry_year'] = formValue.billing.creditCard.expiryYear;
    ret['credit_card']['cardholder_name'] = formValue.billing.creditCard.cardHolderName;

    return ret;
  }

  public onSubmit() {
    let jsonObj = this.formatPayLoad(this.checkoutForm.value);
    this.checkoutService.checkout(jsonObj).subscribe(
      (data) => {
        this.result = data.data_message;
      },
      (errors) => {
        this.formErrors = errors;
      }
    );
  }

  public populateForm() {
    this.populateCustomer();
    this.populateProducts();
  }

  public populateCustomer() {
    let id = parseInt(localStorage.getItem('currentUser'), 10);
    this.profileService.show(id).subscribe(
      (data) => {
        if (!data) {
          return;
        }
        this.user = data;
        console.log(data.shipping);
        this.checkoutForm.patchValue({
          billing: {
            wallet: {
              mobile: data.mobile
            },
            cash: {
              email: data.email,
              mobile: data.mobile,
              firstName: data.first_name,
              lastName: data.last_name,
              district: data.district,
              city: data.city,
              state: data.state,
              country: data.country,
              apartment: data.apartment,
              floor: data.floor,
              building: data.building,
              street: data.street,
              postalCode: data.postal_code
            }
          },
          shipping: {
            email: data.shipping.email ? data.shipping.email : data.email,
            mobile: data.shipping.mobile ? data.shipping.mobile : data.mobile,
            firstName: data.shipping.first_name ? data.shipping.first_name : data.first_name,
            lastName: data.shipping.last_name ? data.shipping.last_name : data.last_name,
            district: data.shipping.district ? data.shipping.district : data.district,
            city: data.shipping.city ? data.shipping.city : data.city,
            state: data.shipping.state ? data.shipping.state : data.state,
            country: data.shipping.country ? data.shipping.country : data.country,
            apartment: data.shipping.apartment ? data.shipping.apartment : data.apartment,
            floor: data.shipping.floor ? data.shipping.floor : data.floor,
            building: data.shipping.building ? data.shipping.building : data.building,
            street: data.shipping.street ? data.shipping.street : data.street,
            postalCode: data.shipping.postal_code ? data.shipping.postal_code : data.postal_code
          },
        });
      },
      (errors) => {
        this.errors = errors;
      }
    );
  }

  public populateProducts() {
    this.items = this.cartService.get();
    this.total = this.cartService.sumTotal();
  }
}
