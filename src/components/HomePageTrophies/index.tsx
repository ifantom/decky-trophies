import React, { ReactElement, useEffect, useState } from 'react'

import SettingsBus from '../../lib/SettingsBus'
import { getMyTrophies } from '../../actions'
import { TROPHY_IMAGES } from '../../../assets/trophies'
import style from './style.css'
import Trophy from '../../../types/Trophy'
import TrophyPosition from '../../../types/TrophyPosition'
import TrophyOffset from '../../../types/TrophyOffset'

export default function HomePageTrophies({ settings }: { settings: SettingsBus }): ReactElement {
  const [show, setShow] = useState<boolean>(settings.value.homePageTrophiesShow)
  const [position, setPosition] = useState<TrophyPosition>(settings.value.homePageTrophiesPosition)
  const [offset, setOffset] = useState<TrophyOffset>(settings.value.homePageTrophiesOffset)

  useEffect(() => {
    return settings.subscribe((value) => {
      if (value.homePageTrophiesShow !== show) {
        setShow(value.homePageTrophiesShow)
      }

      if (value.homePageTrophiesPosition !== position) {
        setPosition(value.homePageTrophiesPosition)
      }

      if (value.homePageTrophiesOffset.top !== offset.top || value.homePageTrophiesOffset.side !== offset.side) {
        setOffset(value.homePageTrophiesOffset)
      }
    })
  })

  if (!show) return <></>

  const trophies = getMyTrophies()

  const containerClass = `HomePageTrophies__Container ${
    position === TrophyPosition.Right ? 'HomePageTrophies__Container--Right' : ''
  }`

  return (
    <div
      className={containerClass}
      style={
        position === TrophyPosition.Right
          ? { top: `${offset.top}px`, right: `${offset.side}px` }
          : { top: `${offset.top}px`, left: `${offset.side}px` }
      }
    >
      <style>{style}</style>

      <div className="HomePageTrophies__Trophy">
        <img src={TROPHY_IMAGES[Trophy.Platinum]} width="40px" height="40px" alt="Platinum Trophy" />
        <div>{trophies[Trophy.Platinum]}</div>
      </div>

      <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
        <div className="HomePageTrophies__Trophy">
          <img src={TROPHY_IMAGES[Trophy.Golden]} width="36px" height="36px" alt="Golden Trophy" />
          <div style={{ color: '#FFF383' }}>{trophies[Trophy.Golden]}</div>
        </div>

        <div className="HomePageTrophies__Trophy">
          <img src={TROPHY_IMAGES[Trophy.Silver]} width="36px" height="36px" alt="Silver Trophy" />
          <div style={{ color: '#D1D9E0' }}>{trophies[Trophy.Silver]}</div>
        </div>

        <div className="HomePageTrophies__Trophy">
          <img src={TROPHY_IMAGES[Trophy.Bronze]} width="36px" height="36px" alt="Bronze Trophy" />
          <div style={{ color: '#E0AE9D' }}>{trophies[Trophy.Bronze]}</div>
        </div>
      </div>
    </div>
  )
}
