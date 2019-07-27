import { Layout, Users, UsersService } from './modules.js';

let htmlElements = {
  clearStorageButton: document.querySelector('.clear-storage-button'),
  reloadPageButton: document.querySelector('.reload-page-button')
};

class Main {
  static load() {
    Main.initEventHandlers();
    [Layout, Users].forEach(Constructor => new Constructor());
  }

  static initEventHandlers() {
    htmlElements.clearStorageButton.addEventListener('click', () => {
      localStorage.clear();
    });

    htmlElements.reloadPageButton.addEventListener('click', () => {
      location.reload();
    });
  }
}

Main.load();
