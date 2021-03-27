import axios, { AxiosResponse } from 'axios';
import processUrl from './processUrl';

/**
 * @function sendGet => GET request handler.
 * @param url  => REST API endpoint.
 * @param isExternal => Is request outside of project domain?
 */
export const sendGet = (url: string, isExternal: boolean): Promise<AxiosResponse<any>> => {
  if (!isExternal) {
    return axios.get(processUrl(url, isExternal));
  } else {
    return axios.get(processUrl(url, isExternal));
  }
};