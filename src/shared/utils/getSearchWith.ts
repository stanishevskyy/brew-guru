import { SeacrhParams } from '../types/SeacrhParams';

export const getSearchWith = (
  currentParams: URLSearchParams,
  paramsToUpdate: SeacrhParams,
) => {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
  });

  return newParams.toString();
};
