/** 
*@author Hdev <hdev0301@gmail.com>
*/

import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';

/**
 *  jQuery variables
 */
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'martmax-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})


export class BannerComponent {
  public recentBanner: any;
  public errors: any;

  public ngOnInit() {

    /**
     * hide banner
     */
    $(".hide-banner").click(function () {
      $(".banner img").hide();
      $(".hide-banner").hide();
    });

  }
}
