import JwtDecode from 'jwt-decode';
import UrlSetter from 'api/url-setter';
import { Dispatch } from 'redux';
import { setAccessToken, Actions } from 'redux/actions';

const loginUrl = UrlSetter('/v1/auth/login');
const refreshUrl = UrlSetter('/v1/auth/refresh');
const logoutUrl = UrlSetter('/v1/auth/logout');

export interface CurrentUser {
  userId: number,
  username: string | null,
  moderator: boolean,
}

// Log the user in and retrieve the access and refresh token
export const login = async (idToken: string): Promise<string | null> => {
  const res = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      idToken: idToken,
    })
  });
  return res.ok ? await res.text() : null;
}

// Decode the JWT access token and get the current user
export const getCurrentUser = (accessToken: string | undefined): CurrentUser | null => {
  if (!accessToken) return null;
  try {
    return JwtDecode(accessToken);
  } catch (error) {
    return null;
  }
}

// Log the user out and clear the refresh token
export const logout = async () => {
  const res = await fetch(logoutUrl, {
    method: 'GET',
    credentials: 'include',
  });
  return res.ok;
}

// Check if token has expired, issue a new one if it has
export const getNewTokenIfRequired = async (accessToken: string | undefined, dispatch: Dispatch<Actions>): Promise<string | null> => {
  // Return current access token if it's still valid
  if (accessToken && tokenStillValid(accessToken)) return accessToken;
  // Token needs refreshing
  const newAccessToken = await issueNewAccessToken();
  newAccessToken && dispatch(setAccessToken(newAccessToken));
  return issueNewAccessToken();
}

// Check access token expiry. Return false if it needs refreshing
export const tokenStillValid = (accessToken: string): boolean => {
  try {
    const { exp } = JwtDecode(accessToken);
    return Date.now.valueOf() < exp * 1000;
  } catch (error) {
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
