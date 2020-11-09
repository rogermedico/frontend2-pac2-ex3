import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Education } from '@models/education.model';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as UserActions from '@store/user/user.action';
import { AppStore } from '@models/store.model';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  public title: string = 'Education';
  public user: User;
  public educations$: Observable<Education[]> = this.store$.select(UserSelectors.selectEducation);
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public educationForm: FormGroup;

  constructor(private fb: FormBuilder, private us: UserService, private router: Router, private store$: Store<AppStore>) { }

  ngOnInit(): void {
    // this.user = this.us.userLoggedIn;
  }

  createEducation() {
    this.router.navigate(['/user/education']);
  }

  updateEducation(i: number, e: Education) {
    this.router.navigate(['/user/education', i]);
    // console.log('update education:', i, e);
  }

  deleteEducation(education: Education) {
    if (confirm('You are about to delete an education record. Are you sure?')) {
      this.userLoggedIn$.pipe(
        take(1)
      ).subscribe(u => {
        this.store$.dispatch(UserActions.UserDeleteEducation({ user: u, education: education }))
      })




      // this.user.education.splice(i, 1);
      // this.us.updateUser(this.user).subscribe(
      //   () => console.log(`Education ${i} deleted`)
      // );
    }
  }

}
