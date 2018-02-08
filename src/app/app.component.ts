import { Component } from '@angular/core';

/**
 *  jQuery variables
 */
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'martmax-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  public ngOnInit() {

    /**
   * jQuery 
   */

    $(".menu-button").click(function () {
      $(".side-menu").toggle(300, function () {
        $(".sticky-header .navbar").toggleClass("show-nav")
      })
    });

    $(".side-menu").hide();
    $(".menu-button").click(function () {
      $(".side-menu").toggle(300, function () {
        $(".sticky-header .navbar").toggleClass("show-nav")
      })

    });
    $(".side-menu-sub .dropdown.top-level").click(function () {
      $(this).children("ul").toggleClass("hide");
    });
    $(".side-menu-sub .dropdown.top-level .dropdown-sub-menu .dropdown").click(function () {
      $(this).children(".dropdown-sub-menu").toggleClass("show");
    });


    $(".hot-search").hide();
    $(".small-dev li .fa-search").click(function () {
      $(".hot-search").show(200);
    });
    $("#searchForm span .fa-angle-left").click(function () {
      $(".hot-search").hide(200);
    });

    $(".mobile-search").hide();
    $(".small-dev .fa-search").click(function () {
      $(".mobile-search").toggle(400);
    });

    var scrollButton = $("#scroll-top");
    $(".close-menu").hide();
    if ($(window).width() < 992) {
      $(".close-menu").show();
    }


    $(window).scroll(function () {
      var scrollPos = $(window).scrollTop(),
        navbar = $('.navbar'),
        topHeader = $('.top-header');

      if (scrollPos > 150) {
        $(".sticky-header nav").addClass(" navbar-fixed-top");
        $('.sticky-header .navbar>.container .navbar-brand img').attr('src', './assets/images/martmax-small-logo.png');
      }
      else {
        $(".sticky-header nav").removeClass(" navbar-fixed-top");
        $('.sticky-header .navbar>.container .navbar-brand img').attr('src', './assets/images/martmax-logo.png');
      }

      if ($(window).width() < 768) {
        $(".static-menu").hide();
      }
      else {
        if (scrollPos > 400 && scrollPos < 2500) {
          $(".static-menu").show(1000);
        }
        else {
          $(".static-menu").hide();
        }
      }
    });

  }
}

