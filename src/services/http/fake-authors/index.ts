import { authors } from '../../../db';
import { Author } from '../../../types/author';
import { DEFAULT_HTTP_RESPONSE } from '../constants';
import { HTTP_RESPONSE } from '../types';

export const getAll = (): Promise<HTTP_RESPONSE<Author[]>> => {
  return Promise.resolve({ ...DEFAULT_HTTP_RESPONSE, data: authors });
};
