export class AllTracks {
  static readonly type = '[Main] ALL TRACKS';
  constructor() { }
}

export class GPXByTrackname {
  static readonly type = '[Main] GPX BY TRACK NAME';
  constructor(public name: string) { }
}

export class GPXByTracknameSuccess {
  static readonly type = '[Main] GPX BY TRACK NAME SUCCESS';
  constructor(public gpx: string) { }
}



