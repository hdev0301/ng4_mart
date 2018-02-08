/** 
*@author Hdev <hdev0301@gmail.com>
*/

import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { Response } from '@angular/http';
import { environment } from './../../../../../environments/environment';
import { SubscribeService } from './../../../services/subscribe/subscribe.service';

@Component({
  selector: 'martmax-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [SubscribeService],
})
export class FooterComponent {
  public errors: any;
  public gender: any;

  constructor(
    public subscribeService: SubscribeService
  ) {

  }

  public ngOnInit() {

  }

  public goTop() {
    let scrollToTop = window.setInterval(function () {
      let pos = window.pageYOffset;
      let toTop = document.getElementById('scroll-top');
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
