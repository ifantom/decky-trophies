import SettingsBus from "./SettingsBus";
import Settings from "./components/Settings";
import { FaTrophy } from "react-icons/fa";
import { definePlugin, staticClasses } from "@decky/ui";
import { patchHomePage, patchLibraryAppPage, patchLibraryPage, unpatchLibraryPage } from "./patches";
import { routerHook } from "@decky/api";

declare global {
  let appAchievementProgressCache: {
    m_achievementProgress?: { mapCache?: Map<number | string, SteamAchievementProgressCache> };
    GetAchievementProgress: (appId: number) => number;
  };
}

export default definePlugin(() => {
  const settings = new SettingsBus();

  const homePagePatch = patchHomePage(settings);
  const libraryAppPagePatch = patchLibraryAppPage(settings);

  let libraryPageTrophyReplace = settings.value.libraryPageTrophyReplace;
  if (libraryPageTrophyReplace) patchLibraryPage();

  settings.subscribe((value) => {
    console.log("settings.subscribe", value);

    if (value.libraryPageTrophyReplace === libraryPageTrophyReplace) return;

    libraryPageTrophyReplace = value.libraryPageTrophyReplace;

    return libraryPageTrophyReplace ? patchLibraryPage() : unpatchLibraryPage();
  });

  return {
    title: <div className={staticClasses.Title}>Achievement Trophies</div>,
    icon: <FaTrophy />,
    content: <Settings settings={settings} />,
    onDismount() {
      settings.unsubscribe();

      routerHook.removePatch("/library/app/:appid", libraryAppPagePatch);
      routerHook.removePatch("/library/home", homePagePatch);
      unpatchLibraryPage();
    },
  };
});
