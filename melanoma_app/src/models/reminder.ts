import { ILesion } from "./lesion";

export default class Reminder {
  id: number;
  lesion: string;
  date: Date;

  constructor(id: number, lesion: string, date: Date) {
    this.id = id;
    this.lesion = lesion;
    this.date = date;
  }

  getLabel() {
    return `${this.lesion} - ${this.date.toLocaleDateString()}`;
  }
}

export interface IReminder {
  id: number;
  targetTimeStamp: string;
  lesion: Partial<ILesion>;
  cycleLength: number;
}

export function reminderFromInterface(reminder: IReminder) {
  return new Reminder(
    reminder.id,
    reminder.lesion.name ?? "",
    new Date(reminder.targetTimeStamp)
  );
}
