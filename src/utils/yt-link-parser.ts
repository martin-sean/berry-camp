// Parse a youtube link. 
export default (videoLink: string) => {
  let videoId: string | null = null;
  let startTime: number | null = null;
  let endTime: number | null = null;
  
  // Get the video id
  let idMatch: RegExpMatchArray | null;
  if ((idMatch = videoLink.match(/v=([\w|-]+)/))) {
    videoId = idMatch[1];
  } else if ( (idMatch = videoLink.match(/(youtu.be|embed)\/([\w|-]+)/)) ) {
    videoId = idMatch[2];
  }

  // Search for start time (t) param match
  const timeMatches = videoLink.match(/t=(\d+)(m(\d+)s)?/);
  if (timeMatches) {
    // If minutes and seconds are provided
    if (timeMatches[1] && timeMatches[3]) {
      startTime = parseInt(timeMatches[1]) * 60 + parseInt(timeMatches[3]);
    // If just seconds are provided
    } else if (timeMatches[1]) {
      startTime = parseInt(timeMatches[1]);
    }
  } else {
    // Search for start and end time param matches
    const startTimeMatch = videoLink.match(/start=(\d+)/);
    const endTimeMatch = videoLink.match(/end=(\d+)/);
    startTime = startTimeMatch && parseInt(startTimeMatch[1]);
    endTime = endTimeMatch && parseInt(endTimeMatch[1]);
  }
  return { videoId, startTime, endTime };
}