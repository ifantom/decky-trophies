import React, { ReactElement, useEffect, useState } from 'react'

import { getMyAchievementsForApp, getTrophy, getTrophyCSS } from '../../actions'
import SettingsBus from '../../lib/SettingsBus'
import TrophyPosition from '../../../types/TrophyPosition'

export default function AppPageTrophy({ appId, settings }: { appId: string; settings: SettingsBus }): ReactElement {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [position, setPosition] = useState<TrophyPosition>(settings.value.appPageTrophyPosition)
  const [show, setShow] = useState<boolean>(settings.value.appPageTrophyShow)

  useEffect(() => {
    if (appId) {
      getMyAchievementsForApp(appId).then(setAchievements)
    }
  }, [appId])

  useEffect(() => {
    return settings.subscribe((value) => {
      if (value.appPageTrophyPosition !== position) {
        setPosition(value.appPageTrophyPosition)
      }

      if (value.appPageTrophyShow !== show) {
        setShow(value.appPageTrophyShow)
      }
    })
  })

  if (!show || !achievements.length) return <></>

  const achieved = achievements.filter((achievement) => achievement.bAchieved)

  if (!achieved.length) return <></>

  const trophy = getTrophy(achievements.length, achieved.length)

  if (!trophy) return <></>

  const css = getTrophyCSS(trophy, position)

  return <style>{css}</style>
}
