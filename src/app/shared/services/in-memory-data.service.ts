import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '@models/user.model';
import { Activity } from '@models/activity.model';
import { USER_TYPES } from '@constants/user-types.constant';

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
          type: 'Títol universitari',
          level: 'Grau',
          name: 'Grau en Enginyeria Informàtica',
          university: 'UOC',
          finishDate: '07/10/2010'
        },
        {
          type: 'Cicle formatiu',
          level: 'Grau superior',
          name: 'Psicologia del renaixement',
          university: 'Institut Joan Guinjoan',
          finishDate: '09/08/2004'
        }],
        languages: [{
          name: 'Català',
          level: 'C2'
        },
        {
          name: 'Anglès',
          level: 'B2',
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
          name: 'Francès',
          level: 'A1',
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
            type: 'Cicle formatiu',
            level: 'Grau superior',
            name: 'El ví i les seves propietats',
            university: 'Institut enologic del priorat',
            finishDate: '09/08/1992'
          }
        ],
        languages: [{
          name: 'Català',
          level: 'A2',
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
          type: 'Títol universitari',
          level: 'Grau',
          name: 'Grau en Turisme',
          university: 'Universitat Rovira i Virgili',
          finishDate: '07/10/2010'
        }],
        languages: [{
          name: 'Castellà',
          level: 'C1'
        },
        {
          name: 'Anglès',
          level: 'B2',
          finishDate: '01/02/0003'
        }]
      }
    ];

    const activities: Activity[] = [
      {
        id: 1,
        name: 'Visita al museu del vi',
        category: 'Enoturisme',
        subcategory: 'Museu del ví',
        description: 'Visita a un museu del vi i tast de vins al final.',
        language: 'Català',
        date: '12/12/2022',
        price: 135,
        miniumCapacity: 13,
        maxCapacity: 50,
        state: 'Available',
        owner: 3,
        participatingUsers: []
      },
      {
        id: 2,
        name: 'Seminari d\'art renaixentista',
        category: 'Cultura i patrimoni',
        subcategory: 'Museu',
        language: 'Anglès',
        price: 12,
        miniumCapacity: 3,
        maxCapacity: 15,
        state: 'Cancelled',
        owner: 2,
        participatingUsers: []
      },
      {
        id: 3,
        name: 'Passar el dia a la platja',
        category: 'Platges',
        subcategory: 'Excursió',
        description: 'Els alumnes que vulguin poden venir a passar el dia a la platja.',
        language: 'Català',
        date: '12/08/2022',
        price: 3,
        miniumCapacity: 1,
        maxCapacity: 1,
        state: 'Available',
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
