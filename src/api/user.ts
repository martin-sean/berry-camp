import urlSetter from "./url-setter";
import { Dispatch } from "redux";
import { setAccessToken } from "redux/actions";

const currentUserUrl = urlSetter('/v1/user/current');

export const validateUsername = async (username: string, accessToken: string) => {
  const res = await fetch(urlSetter(`/v1/auth/checkusername/${ username }`), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ accessToken }` 
    }
  });
  if (res.ok) {
    type AvailableResponse = { available: boolean };
    return (await res.json() as AvailableResponse).available;
  }
  // Could not contact server
  throw new Error("Could not check username.");
}

// Update account username
export const setNewUsername = async (username: string, accessToken: string, dispatch: Dispatch<any>) => {
  const res = await fetch(currentUserUrl, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ accessToken }`
    },
    body: JSON.stringify({
      username: username,
    })
  });
  
  // Set the new access token
  if (res.ok) {
    const newAccessToken = await res.text();
    dispatch(setAccessToken(newAccessToken));
  }
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
export const deleteAccount = async (deleteClips: boolean, accessToken: string) => {
  const res = await fetch(currentUserUrl, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ accessToken }`
    },
    body: JSON.stringify({
      'deleteAccount': true,
      'deleteClips': deleteClips,
    })
  });
  return res.ok;
}

