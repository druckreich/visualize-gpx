export class AllTracks {
  static readonly type = '[Main] ALL TRACKS';
  constructor() { }
}

export class TrackByName {
  static readonly type = '[Main] TRACK BY NAME';
  constructor(public name: string) { }
}



