import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Language } from '@models/language.model';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  public title: string = 'Languages';
  public user: User;
  public educationForm: FormGroup;

  constructor(private fb: FormBuilder, private us: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.us.userLoggedIn;
  }

  createLanguage() {
    this.router.navigate(['/user/language']);
  }

  updateLanguage(i: number, lang: Language) {
    this.router.navigate(['/user/language', i]);
    console.log('update education:', i, lang);
  }

  deleteLanguage(i: number) {
    if (confirm('You are about to delete a language record. Are you sure?')) {
      this.user.languages.splice(i, 1);
      this.us.updateUser(this.user).subscribe(
        () => console.log(`Language ${i} deleted`)
      );
    }
  }

}


