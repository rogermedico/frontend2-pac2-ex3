import { CATEGORY_TYPES } from '@constants/category-types.constant';
import { SUBCATEGORY_TYPES_CULTURE, SUBCATEGORY_TYPES_ENOTURISME, SUBCATEGORY_TYPES_BEACH } from '@constants/subcategory-types.constant';
import { LANGUAGES } from '@constants/language.constant';
import { ACTIVITY_STATUS } from '@constants/activity-status.constant';

export interface Activity {
  id?: number;
  name: string;
  category: typeof CATEGORY_TYPES[number];
  subcategory: typeof SUBCATEGORY_TYPES_CULTURE[number] | typeof SUBCATEGORY_TYPES_ENOTURISME[number] | typeof SUBCATEGORY_TYPES_BEACH[number];
  description?: string;
  language: typeof LANGUAGES[number];
  date?: string;
  price: number;
  miniumCapacity: number;
  maxCapacity: number;
  state: typeof ACTIVITY_STATUS[number];
  owner: number;
  participatingUsers: number[];
}
