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

@Component({
  selector: 'martmax-brand',
  styleUrls: ['./brand.component.css'],
  templateUrl: './brand.component.html',
  providers: [],
})
export class BrandComponent implements OnInit {
  public errors: any;
  public brand: any;

  constructor(
    public route: ActivatedRoute
  ) {
  }

  public ngOnInit() {
    let jsonBrand = localStorage.getItem('currentBrand');
    this.brand = JSON.parse(jsonBrand);
  }
}
