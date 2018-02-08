/**
 * @author Hdev <hdev0301@gmail.com>
 */
import {
  Component,
  OnInit,
  Input,
  Attribute,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from './../../../../models/product.model';
import { environment } from './../../../../../../environments/environment';
import { SearchService } from './../../../../services/products/search.service';

@Component({
  selector: 'catalog',
  styleUrls: ['./catalog.component.css'],
  templateUrl: './catalog.component.html',
  providers: [
    SearchService,
  ]
})

export class CatalogComponent implements OnInit {
  public items: any;
  public page: any;
  public errors: any;
  @Input() public category: String;
  @Input() public keyword: String;
  @Input() public pagination: Number;

  constructor(
    public route: ActivatedRoute,
    public searchService: SearchService,
  ) {
  }

  public ngOnInit() {
    this.searchService.search({
      keyword: this.keyword,
      category: this.category,
      pagination: this.pagination
    }).subscribe(
      (data) => {
        this.items = data.items;
        this.page = data.page;
      },
      (errors) => {
        this.errors = errors;
      }
      );
  }

}

