import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EDUCATION_TYPE, EDUCATION_TYPE_CICLE, EDUCATION_TYPE_UNIVERSITY } from '@constants/education.constant';
import { Education } from '@models/education.model';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as UserActions from '@store/user/user.action';
import { take } from 'rxjs/operators';
import { AppStore } from '@models/store.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-education-crud',
  templateUrl: './education-crud.component.html',
  styleUrls: ['./education-crud.component.css']
})
export class EducationCrudComponent implements OnInit {

  public title: String;
  // public user: User;
  public educations$: Observable<Education[]> = this.store$.select(UserSelectors.selectEducation);
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public education: Education = {
    type: null,
    level: null,
    name: '',
    university: ''
  };
  public educationIndex: number;
  public educationForm: FormGroup;
  public buttonTag: string;
  public educationTypes = Object.values(EDUCATION_TYPE);
  public universityLevels = Object.values(EDUCATION_TYPE_UNIVERSITY);
  public cicleLevels = Object.values(EDUCATION_TYPE_CICLE);

  constructor(private fb: FormBuilder, private us: UserService, private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<AppStore>) { }

  ngOnInit(): void {
    this.educationIndex = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.educationIndex = Number.isNaN(this.educationIndex) ? null : this.educationIndex;

    this.userLoggedIn$.subscribe(u => {
      if ((this.educationIndex != null) && (this.educationIndex >= 0) && (this.educationIndex < u.education.length)) {
        this.title = 'Edit education';
        this.buttonTag = 'Update education';
        this.education = u.education[this.educationIndex];
      }
      else {
        this.title = 'Create new education';
        this.buttonTag = 'Create education';
      }
      this.createForm(this.education);
    })
  }

  createForm(e: Education) {
    this.educationForm = this.fb.group({
      type: [e.type ? e.type : null, [Validators.required]],
      level: [{ value: (e.level ? e.level : null), disabled: !e.level }, [Validators.required]],
      name: [e.name ? e.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
      university: [e.university ? e.university : null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
      finishDate: [e.finishDate ? e.finishDate : null, [Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')]]
    }
    );

    this.type.valueChanges.subscribe(
      (value) => {
        this.education.level = null;
        this.educationForm.patchValue({
          level: ''
        });
        if (value != '') {
          this.level.enable({ emitEvent: false });
        } else {
          this.level.disable({ emitEvent: false });
        }
      }
    );

  }

  handleEducationForm() {
    const edu: Education = {
      type: this.type.value,
      level: this.level.value,
      name: this.name.value,
      university: this.university.value,
      finishDate: this.finishDate.value
    }

    this.userLoggedIn$.pipe(
      take(1)
    ).subscribe(u => {
      if (this.educationIndex != null) {
        this.store$.dispatch(UserActions.UserUpdateEducation({ user: u, oldEducation: this.education, newEducation: edu }));
      }
      else {
        this.store$.dispatch(UserActions.UserCreateEducation({ user: u, education: edu }));
      }
    });
    this.router.navigate(['/user/profile']);


    // if (this.educationIndex != null) {
    //   this.user.education[this.educationIndex] = e;
    // }
    // else {
    //   this.user.education.push(e);
    // }

    // this.us.updateUser(this.user).subscribe(
    //   () => {
    //     if (this.educationIndex) console.log(`Education from user ${this.user.email} updated: `, this.user);
    //     else console.log(`Created new education from user ${this.user.email}: `, this.user);
    //     this.router.navigate(['/user/profile']);
    //   }
    // );

  }

  get type() {
    return this.educationForm.get('type');
  }

  get level() {
    return this.educationForm.get('level');
  }

  get name() {
    return this.educationForm.get('name');
  }

  get university() {
    return this.educationForm.get('university');
  }

  get finishDate() {
    return this.educationForm.get('finishDate');
  }

}
