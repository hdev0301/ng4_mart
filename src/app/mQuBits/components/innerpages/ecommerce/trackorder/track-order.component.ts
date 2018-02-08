/**
 * @author Hdev <hdev0301@gmail.com>
 */
import {
  Component,
  OnInit,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'martmax-track-order',
  styleUrls: ['./track-order.component.css'],
  templateUrl: './track-order.component.html',
  providers: [

  ]
})

export class TrackOrderComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
  ) {

  }

  public ngOnInit() {

  }

}
