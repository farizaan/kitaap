import { ApiInstance } from '@/services/instance';
import { IBooksServicePayload } from '@/store/books/types';

export const getBooksService = (payload: IBooksServicePayload) => {
  const { search } = payload;

  return ApiInstance({
    method: 'get',
    url: `/api/books${search}`,
  });
};
