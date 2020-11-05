import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EDUCATION_TYPE, EDUCATION_TYPE_CICLE, EDUCATION_TYPE_UNIVERSITY } from '@constants/education.constant';
import { Education } from '@models/education.model';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-education-crud',
  templateUrl: './education-crud.component.html',
  styleUrls: ['./education-crud.component.css']
})
export class EducationCrudComponent implements OnInit {

  public title: String;
  public user: User;
  public education: Education = {
    type: '',
    level: '',
    name: '',
    university: ''
  };
  public educationIndex: number;
  public educationForm: FormGroup;
  public buttonTag: string;
  public educationTypes: string[] = EDUCATION_TYPE;
  public universityLevels: string[] = EDUCATION_TYPE_UNIVERSITY;
  public cicleLevels: string[] = EDUCATION_TYPE_CICLE;

  constructor(private fb: FormBuilder, private us: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.educationIndex = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.educationIndex = Number.isNaN(this.educationIndex) ? null : this.educationIndex;
    this.user = this.us.userLoggedIn;
    if ((this.educationIndex != null) && (this.educationIndex >= 0) && (this.educationIndex < this.user.education.length)) {
      this.title = 'Edit education';
      this.buttonTag = 'Update education';
      this.education = this.user.education[this.educationIndex];
    }
    else {
      this.title = 'Create new education';
      this.buttonTag = 'Create education';
    }
    this.createForm();
  }

  createForm() {
    this.educationForm = this.fb.group({
      type: [this.education.type ? this.education.type : null, [Validators.required]],
      level: [{ value: (this.education.level ? this.education.level : null), disabled: !this.education.level }, [Validators.required]],
      name: [this.education.name ? this.education.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
      university: [this.education.university ? this.education.university : null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
      finishDate: [this.education.finishDate ? this.education.finishDate : null, [Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')]]
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
    const e: Education = {
      type: this.type.value,
      level: this.level.value,
      name: this.name.value,
      university: this.university.value,
      finishDate: this.finishDate.value
    }

    if (this.educationIndex != null) {
      this.user.education[this.educationIndex] = e;
    }
    else {
      this.user.education.push(e);
    }

    this.us.updateUser(this.user).subscribe(
      () => {
        if (this.educationIndex) console.log(`Education from user ${this.user.email} updated: `, this.user);
        else console.log(`Created new education from user ${this.user.email}: `, this.user);
        this.router.navigate(['/user/profile']);
      }
    );

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
