import { getTrophy } from "./getTrophy";
import Trophy from "../../types/Trophy";

export function getMyTrophies(): Record<Trophy, number> {
  const trophies = {
    [Trophy.Bronze]: 0,
    [Trophy.Silver]: 0,
    [Trophy.Golden]: 0,
    [Trophy.Platinum]: 0,
  };

  appAchievementProgressCache.m_achievementProgress?.mapCache?.forEach((item) => {
    if (!item.percentage) return;

    const percentage = appAchievementProgressCache.GetAchievementProgress(item.appid);
    const trophy = getTrophy(percentage);

    if (trophy) trophies[trophy]++;
  });

  return trophies;
}
