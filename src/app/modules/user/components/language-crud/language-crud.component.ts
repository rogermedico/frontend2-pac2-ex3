import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LANGUAGES, LANGUAGE_LEVELS } from '@constants/language.constant';
import { Language } from '@models/language.model';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-language-crud',
  templateUrl: './language-crud.component.html',
  styleUrls: ['./language-crud.component.css']
})
export class LanguageCrudComponent implements OnInit {

  public title: String;
  public user: User;
  public language: Language = {
    name: '',
    level: '',
    finishDate: ''
  };
  public languageIndex: number;
  public languageForm: FormGroup;
  public buttonTag: string;
  public languageNames: string[] = LANGUAGES;
  public languageLevels: string[] = LANGUAGE_LEVELS;

  constructor(private fb: FormBuilder, private us: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.languageIndex = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.languageIndex = Number.isNaN(this.languageIndex) ? null : this.languageIndex;

    this.user = this.us.userLoggedIn;
    if ((this.languageIndex != null) && (this.languageIndex >= 0) && (this.languageIndex < this.user.languages.length)) {
      this.title = 'Edit language';
      this.buttonTag = 'Update language';
      this.language = this.user.languages[this.languageIndex];
    }
    else {
      this.title = 'Create new language';
      this.buttonTag = 'Create language';
    }
    this.createForm();
  }

  createForm() {
    this.languageForm = this.fb.group({
      name: [this.language.name ? this.language.name : null, [Validators.required]],
      level: [this.language.level ? this.language.level : null, [Validators.required]],
      finishDate: [this.language.finishDate ? this.language.finishDate : null, [Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')]]
    });
  }

  handleLanguageForm() {
    const lang: Language = {
      name: this.name.value,
      level: this.level.value,
      finishDate: this.finishDate.value
    }

    if (this.languageIndex != null) {
      this.user.languages[this.languageIndex] = lang;
    }
    else {
      this.user.languages.push(lang);
    }

    this.us.updateUser(this.user).subscribe(
      () => {
        if (this.languageIndex) console.log(`Languages from user ${this.user.email} updated: `, this.user);
        else console.log(`Created new language from user ${this.user.email}: `, this.user);
        this.router.navigate(['/user/profile']);
      }
    );

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
