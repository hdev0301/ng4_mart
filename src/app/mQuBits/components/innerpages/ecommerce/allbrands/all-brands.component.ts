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
import { BrandsService } from './../../../../services/brands/brands.service';

@Component({
  selector: 'martmax-all-brands',
  styleUrls: ['./all-brands.component.css'],
  templateUrl: './all-brands.component.html',
  providers: [BrandsService],
})
export class AllBrandsComponent implements OnInit {
  public errors: any;
  public brands: any;
  public keys: any;

  constructor(
    public route: ActivatedRoute,
    public brandsService: BrandsService,
  ) {
  }

  public ngOnInit() {

    this.brandsService.getBrands()
      .subscribe(
      (data) => {
        if (data.length === 0) {
          return;
        }
        this.keys = Object.keys(data.brands);
        this.brands = data.brands;
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
