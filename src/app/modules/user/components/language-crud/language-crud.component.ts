import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LANGUAGES, LANGUAGE_LEVELS } from '@constants/language.constant';
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
  selector: 'app-language-crud',
  templateUrl: './language-crud.component.html',
  styleUrls: ['./language-crud.component.css']
})
export class LanguageCrudComponent implements OnInit {

  public title: String;
  // public user: User;
  public languages$: Observable<Language[]> = this.store$.select(UserSelectors.selectLanguages);
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public language: Language = {
    name: null,
    level: null,
    finishDate: ''
  };
  public languageIndex: number;
  public languageForm: FormGroup;
  public buttonTag: string;
  public languageNames = Object.values(LANGUAGES);
  public languageLevels = Object.values(LANGUAGE_LEVELS);

  constructor(private fb: FormBuilder, private us: UserService, private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<AppStore>) { }

  ngOnInit(): void {
    this.languageIndex = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.languageIndex = Number.isNaN(this.languageIndex) ? null : this.languageIndex;

    this.userLoggedIn$.subscribe(u => {


      if ((this.languageIndex != null) && (this.languageIndex >= 0) && (this.languageIndex < u.languages.length)) {
        this.title = 'Edit language';
        this.buttonTag = 'Update language';
        this.language = u.languages[this.languageIndex];
      }
      else {
        this.title = 'Create new language';
        this.buttonTag = 'Create language';

      }
      this.createForm(this.language);

    });

    // this.user = this.us.userLoggedIn;
    // if ((this.languageIndex != null) && (this.languageIndex >= 0) && (this.languageIndex < this.user.languages.length)) {
    //   this.title = 'Edit language';
    //   this.buttonTag = 'Update language';
    //   this.language = this.user.languages[this.languageIndex];
    // }
    // else {
    //   this.title = 'Create new language';
    //   this.buttonTag = 'Create language';
    // }
    // this.createForm();
  }

  createForm(lang: Language) {
    this.languageForm = this.fb.group({
      name: [lang.name ? lang.name : null, [Validators.required]],
      level: [lang.level ? lang.level : null, [Validators.required]],
      finishDate: [lang.finishDate ? lang.finishDate : null, [Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')]]
    });
  }

  handleLanguageForm() {
    const lang: Language = {
      name: this.name.value,
      level: this.level.value,
      finishDate: this.finishDate.value
    }

    this.userLoggedIn$.pipe(
      take(1)
    ).subscribe(u => {
      if (this.languageIndex != null) {
        this.store$.dispatch(UserActions.UserUpdateLanguage({ user: u, oldLanguage: this.language, newLanguage: lang }));
      }
      else {
        this.store$.dispatch(UserActions.UserCreateLanguage({ user: u, language: lang }));
      }
    });
    this.router.navigate(['/user/profile']);

    // if (this.languageIndex != null) {
    //   this.user.languages[this.languageIndex] = lang;
    // }
    // else {
    //   this.user.languages.push(lang);
    // }

    // this.us.updateUser(this.user).subscribe(
    //   () => {
    //     if (this.languageIndex) console.log(`Languages from user ${this.user.email} updated: `, this.user);
    //     else console.log(`Created new language from user ${this.user.email}: `, this.user);
    //     this.router.navigate(['/user/profile']);
    //   }
    // );

  }

  get name() {
    return this.languageForm.get('name');
  }

  get level() {
    return this.languageForm.get('level');
  }

  get finishDate() {
    return this.languageForm.get('finishDate');
  }

}
