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
  selector: 'why-us',
  styleUrls: ['./whyus.component.css'],
  templateUrl: './whyus.component.html',
  providers: [],
})
export class WhyUsComponent implements OnInit {
  public errors: any;

  constructor(
    public route: ActivatedRoute,
  ) {

  }

  public ngOnInit() {

  }

}
