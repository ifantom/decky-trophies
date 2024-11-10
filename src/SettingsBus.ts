import TrophyPosition from "../types/TrophyPosition";
import SettingsState from "../types/SettingsState";

export default class SettingsBus {
  value: SettingsState;

  private callbacks: Map<number, (value: SettingsState) => void> = new Map();

  constructor() {
    this.value = this._getFromLocalStorage();
  }

  next(value: SettingsState): void {
    this.value = value;

    this._saveToLocalStorage();

    Promise.resolve().then(() => this.callbacks.forEach((callback) => callback(value)));
  }

  subscribe(callback: (value: SettingsState) => void): () => void {
    const key = Date.now();
    this.callbacks.set(key, callback);

    return this.unsubscribe.bind(this, key);
  }

  unsubscribe(key?: number): void {
    if (key !== undefined) {
      this.callbacks.delete(key);
    } else {
      this.callbacks.clear();
    }
  }

  private _getFromLocalStorage(): SettingsState {
    try {
      const string = localStorage.getItem("decky-trophies-settings");
      const state = JSON.parse(string ?? "undefined");

      return {
        appPageTrophyShow: state.appPageTrophyShow ?? true,
        appPageTrophyPosition: state.appPageTrophyPosition ?? TrophyPosition.Center,
        libraryPageTrophyReplace: state.libraryPageTrophyReplace ?? true,
        homePageTrophiesShow: state.homePageTrophiesShow ?? true,
        homePageTrophiesPosition: state.homePageTrophiesPosition ?? TrophyPosition.Left,
        homePageTrophiesOffset: state.homePageTrophiesOffset ?? { top: 16, side: 16 },
      };
    } catch (error) {
      return {
        appPageTrophyShow: true,
        appPageTrophyPosition: TrophyPosition.Center,
        libraryPageTrophyReplace: true,
        homePageTrophiesShow: true,
        homePageTrophiesPosition: TrophyPosition.Left,
        homePageTrophiesOffset: { top: 16, side: 16 },
      };
    }
  }

  private _saveToLocalStorage(): void {
    try {
      localStorage.setItem("decky-trophies-settings", JSON.stringify(this.value));
    } catch (error) {}
  }
}
