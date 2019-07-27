let _settingsService;
const _localStorageSettingsKey = 'settings';

class Settings {
  constructor(settingsService) {
    if (!settingsService) {
      throw new Exception('settingsService is not defined');
    }
    _settingsService = settingsService;
  }

  get() {
    let settings = localStorage.getItem(_localStorageSettingsKey);
    if (settings) {
      return Promise.resolve(JSON.parse(settings));
    } else {
      return _settingsService.get().then(settings => {
        localStorage.setItem(_localStorageSettingsKey, JSON.stringify(settings));
        return settings;
      });
    }
  }
}

export { Settings };
