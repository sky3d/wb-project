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
  Published,
  Closed
}

export enum RengaRole {
  Member = 1,
  Moderator = 2,
  Admin = 3,
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
  // OneLine = 1,
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
}

interface VerseNumberedEntity extends RengaEntity {
  number: number
}

export interface Verse extends RengaEntity, VerseNumberedEntity {
  rengaPart: number
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

export interface Variant extends VerseNumberedEntity {
  text: string,
  author: string,
}

// User profile
export type UserProfile = {
  profile: UserProfileLike,
  raw: UserRawProfile
}

export type UserRawProfile = Record<string, any>

export type UserProfileLike = {
  id: string,
  name?: string,
  avatar?: string,
  provider: string,
}

export interface UserMeta {
  id: string,
  name: string,
  avatar: string,
  // accessToken: string
  // refreshToken: string
  // user: {
  //   id: string,
  //   name: string,
  //   avatar: string,
  // }
}
