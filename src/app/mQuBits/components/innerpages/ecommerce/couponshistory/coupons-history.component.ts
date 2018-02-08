/**
 * @author ahmed mahgoub <a.mahgoub@mqubits.com>
 */
import {
    Component,
    OnInit
  }from '@angular/core';
  import { FormControl, FormGroup, FormBuilder, Validators,} from '@angular/forms';
  import {Response} from '@angular/http';
  import { environment } from './../../../../../../environments/environment';
  import { CouponsService } from './../../../../services/coupons/coupons.service';
  
  @Component({
    selector: 'martmax-coupons-history',
    styleUrls: ['./coupons-history.component.css'],
    templateUrl: './coupons-history.component.html',
    providers: [CouponsService],
  })
  export class CouponsHistoryComponent implements OnInit {
    public coupons: any;
    
    constructor(
      public couponsService: CouponsService
    ) {    
    }
    public ngOnInit() {
        this.get_coupons();
    }
    public get_coupons()
    {
        let response=this.couponsService.list_pagination()
        .subscribe(
            x =>{
                this.coupons=x;
                this.display();
                console.log(x);
                },
            e => {
            console.log(e);
            },
            () => console.log('onCompleted'));
    }
    public display()
    {
        document.getElementById("livecoupon-title").innerHTML =this.coupons[0].discription;
        document.getElementById("livecoupon-code").innerHTML=this.coupons[0].code;
        this.coupon_timer();
    }
    public coupon_timer()
    {
        let countDownDate = new Date(this.coupons[0].end_date).getTime();
        let start_distance = countDownDate - (new Date(this.coupons[0].start_date).getTime());
        // Update the count down every 1 second
        let x = setInterval(function() {
        
          // Get todays date and time
          let now = new Date().getTime();
        
          // Find the distance between now an the count down date
          let distance = countDownDate - now;
          let progressbar_percntage=Math.round(((distance/start_distance)*100) * 100) / 100;
          let progressbar=document.getElementById("progress-id");
          progressbar.innerHTML=progressbar_percntage+"% completed";
          progressbar.style.width=String(progressbar_percntage)+"%";
          
          // Time calculations for days, hours, minutes and seconds
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
          // Display the result in the element with id="demo"
          document.getElementById("days").innerHTML =String(days);
          document.getElementById("hours").innerHTML =String(hours);
          document.getElementById("minutes").innerHTML =String(minutes);
          document.getElementById("seconds").innerHTML =String(seconds);
          // If the count down is finished, write some text 
          if (distance < 0) {
            clearInterval(x);
            document.getElementById("days").innerHTML ="0";
            document.getElementById("hours").innerHTML ="0";
            document.getElementById("minutes").innerHTML ="0";
            document.getElementById("seconds").innerHTML ="0";
          }
        }, 1000);
    }
}
//this.coupons[0]