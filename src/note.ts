export class Note{
  readonly hz: number;
  readonly base: number;
  readonly note: number;
  constructor(hz: number) {
    this.hz = hz;
    this.base = 55;
    this.note = Math.log(this.hz / this.base) / Math.log(2) * 12;
  }

  name(): string {
    const names = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
    const note12 = (this.note >= 0) ? this.note % 12 : this.note % 12 + 12;
    var i = Math.floor((note12 + 0.5) % 12);
    return names[i];
  }

  diff(): number {
    return (this.note + 0.5) % 1 - 0.5;
  }
}

