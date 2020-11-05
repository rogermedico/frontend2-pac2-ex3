import { LANGUAGES, LANGUAGE_LEVELS } from '@constants/language.constant';

export interface Language {
  name: typeof LANGUAGES[number];
  level: typeof LANGUAGE_LEVELS[number];
  finishDate?: string;
}
