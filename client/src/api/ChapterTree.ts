export interface Chapter {
  id: number;
  chapter_no?: number;
  name: string;
  official: boolean;
  created_at: Date;
  updated_at: Date;
  sides: Side[];
}

export interface Side {
  id: number;
  chapter_id: number;
  name?: any;
  official: boolean;
  created_at: Date;
  updated_at: Date;
  checkpoints: Checkpoint[];
}

export interface Checkpoint {
  id: number;
  side_id: number;
  name: string;
  abbreviation: string;
  created_at: Date;
  updated_at: Date;
  rooms: Room[];
}

export interface Room {
  id: number;
  debug_id: string;
  room_number: number;
  checkpoint_id: number;
  nickname?: any;
  created_at: Date;
  updated_at: Date;
}