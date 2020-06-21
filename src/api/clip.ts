import urlSetter from 'api/url-setter';
import { Dispatch } from 'redux';
import { getNewTokenIfRequired } from 'api/authenticate';

export interface NewClipData {
  chapterId: string,
  sideNo: number,
  checkpointNo: number,
  roomNo: number,
  name?: string,
  description?: string,
  videoId: string,
  startTime: number,
  endTime: number,
  tags: string[],
}

/**
 * Create a new clip, return a promise containing a boolean indicating whether successful
 */ 
export const createNewClip = async (clipData: NewClipData, accessToken: string | null, dispatch: Dispatch<any>): Promise<boolean> => {
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

export interface ClipData {
  id: number,
  name?: string,
  description?: string,
  video_id: string,
  start_time: number,
  end_time: number,
  tags: Tag[],
  author?: Author,
  created_at: Date,
}

interface Tag {
  name: string,
}

/**
 * Search for clips
 */
export const getClips = async (chapterId?: string, sideNo?: number, checkpointNo?: number, roomNo?: number): Promise<ClipData[] | null> => {
  const url = '/v1/clip' +
    `${ chapterId ? `?chapterId=${ chapterId }` : '' }` +
    `${ sideNo ? `&sideNo=${ sideNo }` : '' }` +
    `${ checkpointNo ? `&checkpointNo=${ checkpointNo }` : '' }` +
    `${ roomNo ? `&roomNo=${ roomNo }` : '' }`;

  const res = await fetch(urlSetter(url), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return res.ok ? res.json() : null;
}

interface Author {
  username: string,
}

export interface SingleClipData {
  chapter_id: string,
  side_no: number,
  checkpoint_no: number,
  room_no: number,
  video_id: string,
  start_time: number,
  end_time: number,
  name?: string,
  description?: string,
  created_at: Date,
  tags: Tag[],
  author?: Author,
}

/**
 * Get single clip
 */
export const getClip = async (id: number): Promise<SingleClipData | null> => {
  const res = await fetch(urlSetter(`/v1/clip/${ id }`), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return res.ok ? await res.json() : null;
}

/**
 * Delete a single clip
 */
 export const deleteClip = async (id: number, accessToken: string) => {
   const res = await fetch(urlSetter(`/v1/clip/${ id }`), {
     method: 'DELETE',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ accessToken }`
     }
   });
   return res.ok;
 }