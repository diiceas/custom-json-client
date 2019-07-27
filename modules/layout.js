import { Settings } from './modules.js';
import { SettingsService } from './modules.js';

const _htmlElements = { body: document.body };

class Layout {
  constructor() {
    const settingsService = new SettingsService();
    new Settings(settingsService).get().then(({ background, font }) => {
      this.setBackgroundColor(background.color);
      this.setFontColor(font.color);
    });
  }

  setBackgroundColor(color) {
    _htmlElements.body.style.backgroundColor = color;
  }

  setFontColor(color) {
    _htmlElements.body.style.color = color;
  }
}

export { Layout };
