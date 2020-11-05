import { EDUCATION_TYPE, EDUCATION_TYPE_UNIVERSITY, EDUCATION_TYPE_CICLE } from '@constants/education.constant';

export interface Education {
  type: typeof EDUCATION_TYPE[number];
  level: (typeof EDUCATION_TYPE_UNIVERSITY[number] | typeof EDUCATION_TYPE_CICLE[number]);
  name: string;
  university: string;
  finishDate?: string;
}
