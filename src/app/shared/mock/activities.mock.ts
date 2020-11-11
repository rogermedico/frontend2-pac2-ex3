import { ACTIVITY_STATUS } from '@constants/activity-status.constant';
import { CATEGORY_TYPES } from '@constants/category-types.constant';
import { LANGUAGES } from '@constants/language.constant';
import { SUBCATEGORY_TYPES_BEACH, SUBCATEGORY_TYPES_CULTURE, SUBCATEGORY_TYPES_ENOTURISME } from '@constants/subcategory-types.constant';
import { Activity } from '@models/activity.model';

export const ACTIVITIES_MOCK_DATA: Activity[] = [
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