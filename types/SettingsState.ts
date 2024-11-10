import TrophyPosition from "./TrophyPosition";
import TrophyOffset from "./TrophyOffset";

export default interface SettingsState {
  appPageTrophyShow: boolean;
  appPageTrophyPosition: TrophyPosition;
  libraryPageTrophyReplace: boolean;
  homePageTrophiesShow: boolean;
  homePageTrophiesPosition: TrophyPosition;
  homePageTrophiesOffset: TrophyOffset;
}
