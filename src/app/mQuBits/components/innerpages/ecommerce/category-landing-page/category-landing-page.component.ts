/**
 * @author Hdev <hdev0301@gmail.com>
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'category-landing-page',
  styleUrls: ['./category-landing-page.component.css'],
  templateUrl: './category-landing-page.component.html',
  providers: [
  ]
})

export class CategorylandingpageComponent{

  public keyword: any;
  public category: any;
  public pagination: any;

  constructor(
    public route: ActivatedRoute
  ) {
  }

  public ngOnInit() {
      this.route.params.subscribe(params=> {
        this.keyword = params['keyword'];
        this.category = params['category'];
        this.pagination = params['pagination'];
      });
  }

}
