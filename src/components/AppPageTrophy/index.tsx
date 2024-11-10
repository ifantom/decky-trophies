import { ReactElement, useEffect, useState } from "react";
import { getTrophy, getTrophyCSS } from "../../functions";
import SettingsBus from "../../SettingsBus";
import TrophyPosition from "../../../types/TrophyPosition";

export default function AppPageTrophy({ appId, settings }: { appId: number; settings: SettingsBus }): ReactElement {
  const [position, setPosition] = useState<TrophyPosition>(settings.value.appPageTrophyPosition);
  const [show, setShow] = useState<boolean>(settings.value.appPageTrophyShow);

  useEffect(() => {
    return settings.subscribe((value) => {
      if (value.appPageTrophyPosition !== position) setPosition(value.appPageTrophyPosition)
      if (value.appPageTrophyShow !== show) setShow(value.appPageTrophyShow)
    });
  });

  if (!show) return <></>;

  const progress = appAchievementProgressCache.GetAchievementProgress(appId);

  if (!progress) return <></>;

  const trophy = getTrophy(progress);

  if (!trophy) return <></>;

  const css = getTrophyCSS(trophy, position);

  return <style>{css}</style>;
}
