export default class Remainder {
  lesion: string;
  date: Date;

  constructor(lesion: string, date: Date) {
    this.lesion = lesion;
    this.date = date;
  }

  getLabel() {
    return `${this.lesion} - ${this.date.toLocaleDateString()}`;
  }
}
