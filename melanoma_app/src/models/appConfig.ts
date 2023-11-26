interface AppConfig {
  enableReminders: boolean;
  shouldCreateReminderOnNewLesion: boolean;
  reminderCycleLength: number;
}

export const DefaultAppConfig = {
  enableReminders: false,
  shouldCreateReminderOnNewLesion: false,
  reminderCycleLength: 0,
};

export default AppConfig;
