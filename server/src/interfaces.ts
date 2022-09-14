export declare namespace Domain {
  export interface Renga {
    id: string,
    name: string,
  }
}

export enum RengaStatus {
  NotSet = 0,
  Draft = 1,
  Active,
  Closed
}
