import urlSetter from 'api/url-setter';
import { Dispatch } from 'redux';
import { getNewTokenIfRequired } from 'api/authenticate';

export interface ClipData {
  chapterId: string,
  sideNo: string,
  checkpointNo: string,
  roomNo: string,
  name: string | undefined,
  description: string | undefined,
  videoId: string,
  startTime: number,
  endTime: number,
  tags: string[],
}

// Create a new clip, return a promise containing a boolean indicating whether successful
export const createNewClip = async (clipData: ClipData, accessToken: string | null, dispatch: Dispatch<any>): Promise<boolean> => {
  // Refresh access token if required
  const newAccessToken = await getNewTokenIfRequired(accessToken, dispatch);
  if (!newAccessToken) return false;
  // Fetch the response
  const res = await fetch(urlSetter('/v1/clip'), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ accessToken }`
    },
    body: JSON.stringify(clipData),
  });
  return res.ok;
}