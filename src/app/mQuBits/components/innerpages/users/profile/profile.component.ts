/**
 * @author Hdev <hdev0301@gmail.com>
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { genders } from './../../../../models/user.model';
import { User } from './../../../../models/user.model';
import { environment } from './../../../../../../environments/environment';
import { ProfileService } from './../../../../services/users/profile.service';

@Component({
  selector: 'profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html',
  providers: [ProfileService],
})
export class ProfileComponent implements OnInit {
  public user: User;
  public errors: any;

  constructor(
    public route: ActivatedRoute,
    public profileService: ProfileService
  ) {

  }

  public ngOnInit() {
    let id = parseInt(localStorage.getItem('currentUser'), 10);
    this.profileService.show(id).subscribe(
      (data) => {
        this.user = data;
      },
      (errors) => {
        this.errors = errors;
      }
    );
  }

}
