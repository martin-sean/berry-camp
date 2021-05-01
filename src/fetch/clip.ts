import urlSetter from 'fetch/url-setter';
import { getNewTokenIfRequired } from 'fetch/authenticate';
import { Dispatch } from 'redux';
import { Actions } from 'redux/actions';

export interface NewClipData {
  chapterId?: string,
  sideNo?: number,
  checkpointNo?: number,
  roomNo?: number,
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
export const createNewClip = async (clipData: NewClipData, dispatch: Dispatch<Actions>, accessToken?: string): Promise<boolean> => {
  // Refresh access token if required
  const newAccessToken = await getNewTokenIfRequired(accessToken, dispatch);
  if (!newAccessToken) return false;
  // Fetch the response
  const res = await fetch(urlSetter('/clip'), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ newAccessToken }`
    },
    body: JSON.stringify(clipData),
  });
  return res.ok;
}

/**
 * Edit an existing clip
 * @param clipId Clip to update
 * @param clipData Data to update with
 * @param accessToken User access token
 * @param updateTags Flag to indicate tags need updating
 */
export const editClip = async (
  clipId: number,
  clipData: NewClipData,
  accessToken: string | undefined,
  updateTags: boolean,
  dispatch: Dispatch<Actions>
): Promise<boolean> => {
  const newAccessToken = await getNewTokenIfRequired(accessToken, dispatch);
  if (!newAccessToken) return false;
  // Fetch the response, flag if tags need updating
  const res = await fetch(urlSetter(`/clip/${ clipId }${ updateTags ? '?updateTags=true' : '' }`), {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ newAccessToken }`
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
  likes: number,
  userLikes?: boolean
}

interface Tag {
  name: string,
}

interface Author {
  username: string,
}

/**
 * Search for clips
 */
export const getClips = async (
  chapterId?: string,
  sideNo?: number,
  checkpointNo?: number,
  roomNo?: number,
): Promise<ClipData[] | undefined> => {
  const url = '/clip' +
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
  // Cheeky conversion of string to number
  const clips = await res.json() as any[];
  clips.map(clip => clip.likes = parseInt(clip.likes));
  return res.ok ? clips : undefined;
}

/**
 * Search for clips while authorized
 */
export const getClipsAuth = async (
  accessToken: string,
  dispatch: Dispatch<Actions>,
  chapterId?: string,
  sideNo?: number,
  checkpointNo?: number,
  roomNo?: number,
): Promise<ClipData[] | undefined> => {
  const newAccessToken = await getNewTokenIfRequired(accessToken, dispatch);
  
  const url = '/clip/auth' +
    `${ chapterId ? `?chapterId=${ chapterId }` : '' }` +
    `${ sideNo ? `&sideNo=${ sideNo }` : '' }` +
    `${ checkpointNo ? `&checkpointNo=${ checkpointNo }` : '' }` +
    `${ roomNo ? `&roomNo=${ roomNo }` : '' }`;

  const res = await fetch(urlSetter(url), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ newAccessToken }`
    },
    credentials: 'include',
  });
  // Cheeky conversion of string to number
  const clips = await res.json() as any[];
  clips.map(clip => clip.likes = parseInt(clip.likes));
  return res.ok ? clips : undefined;
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
export const getClip = async (clipId: number): Promise<SingleClipData | null> => {
  const res = await fetch(urlSetter(`/clip/${ clipId }`), {
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
 export const deleteClip = async (clipId: number, accessToken: string, dispatch: Dispatch<Actions>) => {
   const newAccessToken = await getNewTokenIfRequired(accessToken, dispatch);
   if (!newAccessToken) return false;

   const res = await fetch(urlSetter(`/clip/${ clipId }`), {
     method: 'DELETE',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ newAccessToken }`
     }
   });
   return res.ok;
 }

 /**
  * Like a clip
  */
 export const likeClip = async (clipId: number, accessToken: string, dispatch: Dispatch<Actions>) => {
   const newAccessToken = await getNewTokenIfRequired(accessToken, dispatch);
   
   const res = await fetch(urlSetter(`/clip/${ clipId }/like`), {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ newAccessToken }`
    }
   });
   return res.ok;
 }

 export const unlikeClip = async (clipId: number, accessToken: string, dispatch: Dispatch<Actions>) => {
  const newAccessToken = await getNewTokenIfRequired(accessToken, dispatch);
   
  const res = await fetch(urlSetter(`/clip/${ clipId }/like`), {
   method:'DELETE',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${ newAccessToken }`
   }
  });
  return res.ok;
 }