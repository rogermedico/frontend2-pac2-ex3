import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '@models/user.model';
import { Activity } from '@models/activity.model';
import { USER_TYPES } from '@constants/user-types.constant';
import { CATEGORY_TYPES } from '@constants/category-types.constant';
import { SUBCATEGORY_TYPES_BEACH, SUBCATEGORY_TYPES_CULTURE, SUBCATEGORY_TYPES_ENOTURISME } from '@constants/subcategory-types.constant';
import { LANGUAGES, LANGUAGE_LEVELS } from '@constants/language.constant';
import { ACTIVITY_STATUS } from '@constants/activity-status.constant';
import { EDUCATION_TYPE, EDUCATION_TYPE_CICLE, EDUCATION_TYPE_UNIVERSITY } from '@constants/education.constant';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const users: User[] = [
      {
        id: 1,
        name: "roger",
        surname: "medico",
        type: USER_TYPES.tourist,
        email: "rmedico@uoc.edu",
        password: "12341234",
        loggedIn: false,
        education: [{
          type: EDUCATION_TYPE.uni,
          level: EDUCATION_TYPE_UNIVERSITY.grau,
          name: 'Grau en Enginyeria Informàtica',
          university: 'UOC',
          finishDate: '07/10/2010'
        },
        {
          type: EDUCATION_TYPE.fp,
          level: EDUCATION_TYPE_CICLE.gs,
          name: 'Psicologia del renaixement',
          university: 'Institut Joan Guinjoan',
          finishDate: '09/08/2004'
        }],
        languages: [{
          name: LANGUAGES.ca,
          level: LANGUAGE_LEVELS.c2
        },
        {
          name: LANGUAGES.en,
          level: LANGUAGE_LEVELS.b2,
          finishDate: '01/02/0003'
        }]
      },
      {
        id: 2,
        name: "Activitats UOC",
        type: USER_TYPES.company,
        email: "company@uoc.edu",
        password: "12341234",
        loggedIn: false,
        education: [],
        languages: [{
          name: LANGUAGES.fr,
          level: LANGUAGE_LEVELS.a1,
          finishDate: '04/04/2044',
        }]
      },
      {
        id: 3,
        name: "Enoturisme Priorat",
        type: USER_TYPES.company,
        email: "enoturisme@priorat.cat",
        password: "12341234",
        loggedIn: false,
        education: [
          {
            type: EDUCATION_TYPE.fp,
            level: EDUCATION_TYPE_CICLE.gs,
            name: 'El ví i les seves propietats',
            university: 'Institut enologic del priorat',
            finishDate: '09/08/1992'
          }
        ],
        languages: [{
          name: LANGUAGES.ca,
          level: LANGUAGE_LEVELS.a2,
          finishDate: '04/04/2044',
        }]
      },
      {
        id: 4,
        name: "joan",
        surname: "pere",
        type: USER_TYPES.tourist,
        email: "joan@uoc.edu",
        password: "12341234",
        loggedIn: false,
        education: [{
          type: EDUCATION_TYPE.uni,
          level: EDUCATION_TYPE_UNIVERSITY.grau,
          name: 'Grau en Turisme',
          university: 'Universitat Rovira i Virgili',
          finishDate: '07/10/2010'
        }],
        languages: [{
          name: LANGUAGES.es,
          level: LANGUAGE_LEVELS.c1
        },
        {
          name: LANGUAGES.en,
          level: LANGUAGE_LEVELS.b2,
          finishDate: '01/02/0003'
        }]
      }
    ];

    const activities: Activity[] = [
      {
        id: 1,
        name: 'Visita al museu del vi',
        category: CATEGORY_TYPES.enoturisme,
        subcategory: SUBCATEGORY_TYPES_ENOTURISME.museu,
        description: 'Visita a un museu del vi i tast de vins al final.',
        language: LANGUAGES.ca,
        date: '12/12/2022',
        price: 135,
        miniumCapacity: 13,
        maxCapacity: 50,
        state: ACTIVITY_STATUS.available,
        owner: 3,
        participatingUsers: []
      },
      {
        id: 2,
        name: 'Seminari d\'art renaixentista',
        category: CATEGORY_TYPES.cultura,
        subcategory: SUBCATEGORY_TYPES_CULTURE.museu,
        language: LANGUAGES.en,
        price: 12,
        miniumCapacity: 3,
        maxCapacity: 15,
        state: ACTIVITY_STATUS.cancelled,
        owner: 2,
        participatingUsers: []
      },
      {
        id: 3,
        name: 'Passar el dia a la platja',
        category: CATEGORY_TYPES.platges,
        subcategory: SUBCATEGORY_TYPES_BEACH.excursio,
        description: 'Els alumnes que vulguin poden venir a passar el dia a la platja.',
        language: LANGUAGES.ca,
        date: '12/08/2022',
        price: 3,
        miniumCapacity: 1,
        maxCapacity: 1,
        state: ACTIVITY_STATUS.available,
        owner: 2,
        participatingUsers: [1]
      }
    ]

    return { users, activities };
  }

  genId(users: any): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
