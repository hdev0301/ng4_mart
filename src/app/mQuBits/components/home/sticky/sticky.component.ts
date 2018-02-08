/**
 * @author Hdev <hdev0301@gmail.com>
 */

import { Component, OnInit, Input,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'martmax-sticky',
  styleUrls: ['./sticky.component.css'],
  templateUrl: './sticky.component.html',
  providers: [
  ]
})

export class StickyComponent implements OnInit {
  public errors: any;
  public url;
  public redirectBuyForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  public ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.redirectBuyForm = this.fb.group({
      url: ['', [Validators.required]]
    });
  }

  public onSubmit() {
       this.router.navigate(['products/buyforme']);
  }
}