import { AppStore } from '../app/store';
import { setUser } from '../slices/authSlice';

const BASE_URL = '/api/v1/';

let store: AppStore | undefined;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

const apiFetch = async <T>(
  endpoint: string,
  method: string,
  body?: T,
  contentType?: string
): Promise<T | T[] | string | undefined | Blob> => {
  const headers = new Headers({
    'Content-Type': contentType ?? 'application/json',
    Accept: contentType ?? 'application/json'
  });

  const request = new Request(`${BASE_URL}${endpoint}`, {
    method: method,
    headers: headers,
    body: body !== null ? JSON.stringify(body) : null
  });

  try {
    const res = await fetch(request, { credentials: 'include' });

    if (!res.ok) {
      if (res.status === 401) {
        // if session expires remove user
        localStorage.removeItem('user');
        store && store.dispatch(setUser(null));
      }
      try {
        const errRes = (await res.json()) as { message: string };
        throw new Error(errRes.message);
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
    return await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message) {
      throw new Error(error.message as string);
    }
  }
};

export const get = async <T>(endpoint: string) => await apiFetch<T>(endpoint, 'GET');
export const post = async <T>(endpoint: string, body: T) => await apiFetch(endpoint, 'POST', body);
export const put = async <T>(endpoint: string, body: T) => await apiFetch(endpoint, 'PUT', body);
export const remove = async <T>(endpoint: string, body?: T) => await apiFetch<T>(endpoint, 'DELETE', body);
