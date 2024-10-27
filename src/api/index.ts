const BASE_URL = '/api/v1/';

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
    return await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message) {
      throw new Error(error);
    }
  }
};

export const get = async <T>(endpoint: string) => await apiFetch<T>(endpoint, 'GET');
export const post = async <T>(endpoint: string, body: T) => await apiFetch(endpoint, 'POST', body);
export const put = async <T>(endpoint: string, body: T) => await apiFetch(endpoint, 'PUT', body);
export const remove = async <T>(endpoint: string, body?: T) => await apiFetch<T>(endpoint, 'DELETE', body);
