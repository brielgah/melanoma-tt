import { ILesion } from "./lesion";
import { IReminder } from "./reminder";

export default interface User {
  id: number;
  userName: string;
  password: string;
  name: string;
  lastName: string;
  hasWritePermission: boolean;
  lesions?: ILesion[];
  reminders?: IReminder[];
  sharedLesions?: ILesion[];
}
