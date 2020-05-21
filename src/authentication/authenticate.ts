import JwtDecode from 'jwt-decode';

const loginUrl = '/v1/auth/login';
const refreshUrl = '/v1/auth/refresh';
const logoutUrl = '/v1/auth/logout';

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

// Log the user out and clear the refresh token
export const logout = async () => {
  fetch(logoutUrl, {
    method: 'GET',
  });
}

// Return false if access token has expired
export const checkTokenExpiry = async (accessToken: string) => {
  try {
    const { exp } = JwtDecode(accessToken);
    return Date.now.valueOf() < exp * 1000;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Get a new access token and set it
export const getNewAccessToken = async (setAccessToken: (accessToken: string) => void) => {
  fetch(refreshUrl, { 
    method: 'post',
    credentials: 'include',
  }).then(async (res: any) => {
    const accessToken = await res.text();
    setAccessToken(accessToken);
  });
}
