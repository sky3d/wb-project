export interface Renga {
  id: string,
  name: string,
  description?: string,
  owner?: string,
  options?: any,
  rengaPart?: number,
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

// Verse

export interface VerseOptions {
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
  //OneLine = 1,
  TwoLines = 2,
  ThreeLines = 3
}

export enum VerseSeason {
  None = 0,
  Winter,
  Spring,
  Summer,
  Authum
}

interface RengaEntity {
  rengaId: string
  rengaPart: number
}

export interface Verse extends RengaEntity {
  number: number
  description: string
  season: VerseSeason
  topics: VerseTopics
  format: VerseFormat
  line1: string
  line2: string
  line3: string
  author: string
  options: VerseOptions
}

export const VERSE_TOPIC_NAMES = {
  [VerseTopic.Moon]: 'луна',
  [VerseTopic.Love]: 'любовь',
  [VerseTopic.Blossom]: 'цветение'
}
