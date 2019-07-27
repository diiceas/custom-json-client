class SettingsService {
  get() {
    return fetch('http://localhost:3000/settings').then(response => response.json());
  }
}

export { SettingsService };
