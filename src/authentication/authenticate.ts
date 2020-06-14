import JwtDecode from 'jwt-decode';
import UrlSetter from 'api/url-setter';
import { Dispatch } from 'redux';
import { setAccessToken, SetAccessTokenAction } from 'redux/actions';

const loginUrl = UrlSetter('/v1/auth/login');
const refreshUrl = UrlSetter('/v1/auth/refresh');
const logoutUrl = UrlSetter('/v1/auth/logout');

export interface CurrentUser {
  userId: number;
  username: string | null;
  moderator: boolean;
}

// Log the user in and retrieve the access and refresh token
export const login = async (idToken: string, setAccessToken: (accessToken: string) => void) => {
  fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idToken: idToken,
    })
  }).then((res: any) => {
    // Check if response is ok
    if (res.ok) {
      return res.text();
    }
  }).then((accessToken: string) => {
    // Check if access token text exists in response
    if (accessToken) {
      setAccessToken(accessToken);
    }
  });
}

// Decode the JWT access token and get the current user
export const getCurrentUser = (accessToken: string | null): CurrentUser | null => {
  if (!accessToken) return null;
  try {
    return JwtDecode(accessToken);
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Log the user out and clear the refresh token
export const logout = async () => {
  fetch(logoutUrl, {
    method: 'GET',
  });
}

// Check if token has expired, issue a new one if it has
export const getNewTokenIfRequired = async (accessToken: string | null, dispatch: Dispatch<any>): Promise<string | null> => {
  // Return current access token if it's still valid
  if (accessToken && tokenStillValid(accessToken)) return accessToken;
  // Token needs refreshing
  const newAccessToken = await issueNewAccessToken();
  // Check if refresh was successful
  if (!newAccessToken) return null;
  // Set the new accessToken
  dispatch<SetAccessTokenAction>(setAccessToken(newAccessToken));
  return newAccessToken;
}

// Check access token expiry. Return false if it needs refreshing
export const tokenStillValid = (accessToken: string): boolean => {
  try {
    const { exp } = JwtDecode(accessToken);
    return Date.now.valueOf() < exp * 1000;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Return a new access token or null if the user is not authenticated
export const issueNewAccessToken = async (): Promise<string | null> => {
  const res = await fetch(refreshUrl, {
    method: 'post',
    credentials: 'include',
  });
  return res.ok ? await res.text() : null;
}
