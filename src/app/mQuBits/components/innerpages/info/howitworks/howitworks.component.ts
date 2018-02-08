/**
 * @author Hdev <hdev0301@gmail.com>
 */
import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../../environments/environment';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'how-it-works',
  styleUrls: ['./howitworks.component.css'],
  templateUrl: './howitworks.component.html',
  providers: [],
})

export class HowItWorksComponent {
  public errors: any;

  constructor(
    public route: ActivatedRoute,
  ) {

  }

  /**
   *  how it works tabs
   */
  public howitworks(event, sec) {
    event.preventDefault();
    let i;
    let tabcontent;
    let tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(sec).style.display = 'block';
    event.currentTarget.className += ' active';
  }

}

