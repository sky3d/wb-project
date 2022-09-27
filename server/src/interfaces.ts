export declare namespace Domain {
  export interface Renga {
    id: string
    name: string
    description?: string
    owner?: string
    options?: any
    rengaPart?: number
  }
}

export interface RengaOptions {
  activeVerseNumber: number
}

export enum RengaStatus {
  NotSet = 0,
  Draft = 1,
  InPlay,
  Closed
}

export interface VerseMeta {
  canonicalName?: VerseCanonicalName
}

export enum VerseCanonicalName {
  None = 1,
  Hokku, // STARTING
  Wakiki, // SIDE, SECOND
  Daisan, // THIRD
  Ageku // FINAL
}

export enum VerseStatus {
  NotSet = 0
}

export interface VerseTopics {
  topics: string[]
}

export enum VerseTopic {
  None = 1,
  Moon, // mm
  Blossom, // fl
  Love // lv
}

export enum VerseFormat {
  // OneLine = 1,
  TwoLine = 2,
  ThreeLine = 3
}

export enum VerseSeason {
  None = 0,
  Winter,
  Spring,
  Summer,
  Authum
}

const VERSE_TOPIC_NAMES = {
  [VerseTopic.Moon]: 'луна',
  [VerseTopic.Love]: 'любовь',
  [VerseTopic.Blossom]: 'цветение'
}
