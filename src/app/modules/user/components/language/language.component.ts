import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Language } from '@models/language.model';
import { AppStore } from '@models/store.model';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as UserActions from '@store/user/user.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  public title: string = 'Languages';
  public user: User;
  public languages$: Observable<Language[]> = this.store$.select(UserSelectors.selectLanguages);
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public educationForm: FormGroup;

  constructor(private fb: FormBuilder, private us: UserService, private router: Router, private store$: Store<AppStore>) { }

  ngOnInit(): void {
    // this.languages$.pipe(
    //   take(1)
    // ).subscribe(user => this.createForm(user));
  }

  createLanguage() {
    this.router.navigate(['/user/language']);
  }

  updateLanguage(i: number) {
    this.router.navigate(['/user/language', i]);
  }

  deleteLanguage(language: Language) {
    if (confirm('You are about to delete a language record. Are you sure?')) {
      this.userLoggedIn$.pipe(
        take(1)
      ).subscribe(u => {
        this.store$.dispatch(UserActions.UserDeleteLanguage({ user: u, language: language }))
      })

      // this.user.languages.splice(i, 1);
      // this.us.updateUser(this.user).subscribe(
      //   () => console.log(`Language ${i} deleted`)
      // );
    }
  }

}


