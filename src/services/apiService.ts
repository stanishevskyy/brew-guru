export const wait = () => {
  return new Promise(resolve => setTimeout(resolve, 300));
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
}

const refreshAccessToken = async (
  refreshToken: string,
): Promise<TokenResponse> => {
  const response = await fetch('/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return response.json();
};

export const request = async <T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> => {
  let token = localStorage.getItem('accessToken');
  const options: RequestInit = { method };

  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json; charset=utf-8',
    };
  }

  try {
    let response = await fetch(url, options);

    if (response.status === 401) {
      const refreshToken: string | null = localStorage.getItem('refreshToken');

      try {
        const newTokens = await refreshAccessToken(refreshToken as string);

        token = newTokens.accessToken;

        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };

        response = await fetch(url, options);
      } catch {
        throw new Error('Unauthorized – please login again');
      }
    }

    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
};
