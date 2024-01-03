import { getTrophy } from './getTrophy'
import Trophy from '../../types/Trophy'

declare const appAchievementProgressCache: {
  m_achievementProgress: { mapCache: { total?: number; unlocked?: number }[] }
}

export function getMyTrophies(): Record<Trophy, number> {
  const trophies = {
    [Trophy.Bronze]: 0,
    [Trophy.Silver]: 0,
    [Trophy.Golden]: 0,
    [Trophy.Platinum]: 0
  }

  appAchievementProgressCache.m_achievementProgress.mapCache.forEach((item) => {
    const trophy = getTrophy(item?.total ?? 0, item?.unlocked ?? 0)

    if (trophy) trophies[trophy]++
  })

  return trophies
}
