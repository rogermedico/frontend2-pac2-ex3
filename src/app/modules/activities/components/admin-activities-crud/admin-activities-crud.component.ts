import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CATEGORY_TYPES } from '@constants/category-types.constant';
import { LANGUAGES } from '@constants/language.constant';
import { SUBCATEGORY_TYPES_BEACH, SUBCATEGORY_TYPES_CULTURE, SUBCATEGORY_TYPES_ENOTURISME } from '@constants/subcategory-types.constant';
import { Activity } from '@models/activity.model';
import { User } from '@models/user.model';
import { ActivitiesService } from '@services/activities.service';
import { UserService } from '@services/user.service';
import { maxCapacityValidator } from '@validators/max-capacity.validator';

@Component({
  selector: 'app-admin-activities-crud',
  templateUrl: './admin-activities-crud.component.html',
  styleUrls: ['./admin-activities-crud.component.css']
})
export class AdminActivitiesCrudComponent implements OnInit {


  public title: String;
  public userLoggedIn: User;
  public activity: Activity = {
    name: null,
    category: null,
    subcategory: null,
    language: null,
    price: null,
    miniumCapacity: null,
    maxCapacity: null,
    state: null,
    owner: null,
    participatingUsers: []
  };
  public activityIndex: number;
  public activityForm: FormGroup;
  public buttonTag: string;
  public categoryTypes: string[] = CATEGORY_TYPES;
  public subcategoryCulture: string[] = SUBCATEGORY_TYPES_CULTURE;
  public subcategoryEnoturisme: string[] = SUBCATEGORY_TYPES_ENOTURISME;
  public subcategoryBeach: string[] = SUBCATEGORY_TYPES_BEACH;
  public languages: string[] = LANGUAGES;

  constructor(private fb: FormBuilder, private us: UserService, private as: ActivitiesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activityIndex = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.activityIndex = Number.isNaN(this.activityIndex) ? null : this.activityIndex;
    this.userLoggedIn = this.us.userLoggedIn;
    if (this.activityIndex != null) {
      this.activity = this.as.activities.find((ac) => ac.id === this.activityIndex);
      this.title = 'Edit activity';
      this.buttonTag = 'Update activity';
    }
    else {
      this.title = 'Create new activity';
      this.buttonTag = 'Create activity';
    }
    this.createForm();
  }

  createForm() {
    console.log(this.activity);
    this.activityForm = this.fb.group({
      name: [this.activity.name ? this.activity.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
      category: [this.activity.category ? this.activity.category : null, [Validators.required]],
      subcategory: [{ value: (this.activity.subcategory ? this.activity.subcategory : null), disabled: !this.activity.category }, [Validators.required]],
      description: [this.activity.description ? this.activity.description : null],
      language: [this.activity.language ? this.activity.language : null, [Validators.required]],
      date: [this.activity.date ? this.activity.date : null, [Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')]],
      price: [this.activity.price ? this.activity.price : null, [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      miniumCapacity: [this.activity.miniumCapacity ? this.activity.miniumCapacity : null, [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      maxCapacity: [this.activity.maxCapacity ? this.activity.maxCapacity : null, [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      state: [this.activity.state ? this.activity.state : null, [Validators.required]]
    },
      {
        validators: maxCapacityValidator
      }
    );

    this.category.valueChanges.subscribe(
      (value) => {
        // this.activity.subcategory = null;
        this.activityForm.patchValue({
          subcategory: ''
        });
        if (value != '') {
          this.subcategory.enable({ emitEvent: false });
        } else {
          this.subcategory.disable({ emitEvent: false });
        }
      }
    );

  }

  handleActivityForm() {
    console.log()
    const activity: Activity = {
      name: this.name.value,
      category: this.category.value,
      subcategory: this.subcategory.value,
      description: this.description.value,
      language: this.language.value,
      date: this.date.value,
      price: this.price.value,
      miniumCapacity: this.miniumCapacity.value,
      maxCapacity: this.maxCapacity.value,
      state: this.state.value,
      owner: this.userLoggedIn.id,
      participatingUsers: this.state.value != 'Cancelled' ? this.activity.participatingUsers : []
    };

    if (this.activityIndex != null) {
      activity.id = this.activityIndex;
      this.as.updateActivity(activity).subscribe(
        () => console.log(`Activity ${this.activityIndex} from user ${this.userLoggedIn.email} updated.`)
      )
    }
    else {
      this.as.createActivity(activity).subscribe(
        () => {
          this.as.getActivities().subscribe();
          console.log(`Created new activity from user ${this.userLoggedIn.email}`);
        }
      );
    }

    this.router.navigate(['/activities/admin']);

  }

  get name() {
    return this.activityForm.get('name');
  }

  get category() {
    return this.activityForm.get('category');
  }

  get subcategory() {
    return this.activityForm.get('subcategory');
  }

  get description() {
    return this.activityForm.get('description');
  }

  get language() {
    return this.activityForm.get('language');
  }

  get date() {
    return this.activityForm.get('date');
  }

  get price() {
    return this.activityForm.get('price');
  }

  get miniumCapacity() {
    return this.activityForm.get('miniumCapacity');
  }

  get maxCapacity() {
    return this.activityForm.get('maxCapacity');
  }

  get state() {
    return this.activityForm.get('state');
  }

}
