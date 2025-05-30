import { EndpointError } from './errors/Endpoints';
// Treasure Hunt
export const API_ENDPOINT_TREASURE_HUNT = '/api/TreasureHunt';
export const API_ENDPOINT_DETAILS_TREASURE_HUNT = '/api/TreasureHunt/detail/{TreasureHuntId}';


export const prepare = (
  endpoint: string,
  params: { [key: string]: string | number } = {},
  query: { [key: string]: string | number | boolean | string[] | undefined | null } = {},
) => {
  let preparedEndpoint = endpoint;
  Object.keys(params).forEach((param) => {
    const paramPlaceholder = `{${param}}`;
    if (preparedEndpoint.includes(paramPlaceholder)) {
      let paramValue = params[param];
      if (typeof paramValue === 'number') {
        paramValue = paramValue.toString();
      }
      preparedEndpoint = preparedEndpoint.replace(paramPlaceholder, paramValue);
    } else {
      throw new EndpointError('Invalid parameter.');
    }
  });
  let preparedQueryString = '?';
  const queryKeys = Object.keys(query);
  queryKeys.forEach((queryKey, index) => {
    if (index !== 0) {
      preparedQueryString += '&';
    }
    const queryValue = query[queryKey];
    if (Array.isArray(queryValue)) {
      queryValue.forEach((queryValueItem, itemIndex) => {
        if (itemIndex !== 0) {
          preparedQueryString += '&';
        }
        preparedQueryString += `${queryKey}[]=${queryValueItem}`;
      });
    } else {
      if (queryValue !== undefined && queryValue !== null) {
        preparedQueryString += `${queryKey}=${queryValue}`;
      }
    }
  });
  return encodeURI(preparedEndpoint + (queryKeys.length === 0 ? '' : preparedQueryString));
};
