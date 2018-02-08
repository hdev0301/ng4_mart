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
  selector: 'become-premium',
  styleUrls: ['./becomepremium.component.css'],
  templateUrl: './becomepremium.component.html',
  providers: [],
})
export class BecomePremiumComponent implements OnInit {
  public errors: any;

  constructor(
    public route: ActivatedRoute,
  ) {

  }

  public ngOnInit() {
  }

}
