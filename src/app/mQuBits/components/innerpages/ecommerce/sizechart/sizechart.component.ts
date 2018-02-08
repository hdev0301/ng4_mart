/**
 * @author Hdev <hdev0301@gmail.com>
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'tools-size-chart',
  styleUrls: ['./sizechart.component.css'],
  templateUrl: './sizechart.component.html',
  providers: []
})
export class SizechartComponent implements OnInit {
  public errors: any;

  constructor(
    public route: ActivatedRoute
  ) {
  }

  public ngOnInit() {
      //
  }
}
