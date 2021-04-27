import urlSetter from "./url-setter";
import { Dispatch } from "redux";
import { Actions } from "redux/actions";
import { getNewTokenIfRequired } from "./authenticate";

const currentUserUrl = urlSetter('/v1/user/current');

export const validateUsername = async (
  username: string,
  accessToken: string,
  dispatch: Dispatch<Actions>
): Promise<boolean> => {
  const newAccessToken = await getNewTokenIfRequired(accessToken, dispatch);
  if (!newAccessToken) throw new Error("Could not check username");

  const res = await fetch(urlSetter(`/v1/auth/checkusername/${ username }`), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ newAccessToken }` 
    }
  });
  if (res.ok) {
    type AvailableResponse = { available: boolean };
    return (await res.json() as AvailableResponse).available;
  }
  // Could not contact server
  throw new Error("Could not check username.");
}

// Update account username. Successful response returns a new access token
export const setNewUsername = async (
  username: string,
  accessToken: string,
  dispatch: Dispatch<Actions>
): Promise<string | null> => {
  const newAccessToken = await getNewTokenIfRequired(accessToken, dispatch);
  if (!newAccessToken) return null;

  const res = await fetch(currentUserUrl, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ newAccessToken }`
    },
    body: JSON.stringify({
      username: username,
    })
  });
  return res.ok ? res.text() : null; 
}

// Get a user by username
export const getUser = async (username: string): Promise<{ username: string, moderator: boolean } | null> => {
  const res = await fetch(urlSetter(`/v1/user/username/${ username }`), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  // Validate
  if (res.ok) {
    return await res.json();
  }
  return null;
}

// Delete user account
export const deleteAccount = async (deleteClips: boolean, accessToken: string, dispatch: Dispatch<Actions>) => {
  const newAccessToken = await getNewTokenIfRequired(accessToken, dispatch);
  if (!newAccessToken) return false;

  const res = await fetch(currentUserUrl, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ newAccessToken }`
    },
    body: JSON.stringify({
      'deleteAccount': true,
      'deleteClips': deleteClips,
    })
  });
  return res.ok;
}

