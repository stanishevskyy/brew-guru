import { SeacrhParams } from '../types/SeacrhParams';

export const getSearchWith = (
  currentParams: URLSearchParams,
  paramsToUpdate: SeacrhParams,
) => {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    // очистка
    if (value === null || value === undefined || value === '') {
      newParams.delete(key);

      return;
    }

    // 🔥 масив (найважливіше)
    if (Array.isArray(value)) {
      newParams.delete(key);

      value.forEach(v => {
        newParams.append(key, v);
      });

      return;
    }

    // звичайне значення
    newParams.set(key, String(value));
  });

  return newParams.toString();
};
