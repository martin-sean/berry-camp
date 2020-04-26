export interface DataTree {
  [key: string]: Chapter,
}

export interface Chapter {
  chapter_no?: number,
  name: string,
  official?: boolean,
  sides: {
    [key: string]: Side,
  },
}

export interface Side {
  name: string,
  official?: boolean,
  checkpoints: {
    [key: string]: Checkpoint,
  },
}

export interface Checkpoint {
  name: string,
  abbreviation: string,
  rooms: {
    [key: string]: Room,
  },
}

export interface Room {
  name: string,
  image: string,
  debug_id: string,
}