import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Education } from '@models/education.model';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  public title: string = 'Education';
  public user: User;
  public educationForm: FormGroup;

  constructor(private fb: FormBuilder, private us: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.us.userLoggedIn;
  }

  createEducation() {
    this.router.navigate(['/user/education']);
  }

  updateEducation(i: number, e: Education) {
    this.router.navigate(['/user/education', i]);
    console.log('update education:', i, e);
  }

  deleteEducation(i: number) {
    if (confirm('You are about to delete an education record. Are you sure?')) {
      this.user.education.splice(i, 1);
      this.us.updateUser(this.user).subscribe(
        () => console.log(`Education ${i} deleted`)
      );
    }
  }

}
