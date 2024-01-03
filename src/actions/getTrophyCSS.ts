import { TROPHY_IMAGES } from '../../assets/trophies'
import TrophyPosition from '../../types/TrophyPosition'
import Trophy from '../../types/Trophy'

export function getTrophyCSS(trophy: Trophy, position: TrophyPosition): string {
  const image = encodeURI(TROPHY_IMAGES[trophy])

  switch (position) {
    case TrophyPosition.Left:
      return `
        [class*=basicappdetailssectionstyler_ActionRow]:before {
          content: '';
          width: 48px;
          height: 48px;
          background-image: url(${image});
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          margin-left: -4px;
        }
      `

    case TrophyPosition.Center:
      return `
        [class*=appdetailsplaysection_MiniAchievements]:before {
          content: '';
          width: 40px;
          height: 100%;
          background-image: url(${image});
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          margin-right: 8px;
          margin-left: 8px;
        }
      `

    case TrophyPosition.Right:
      return `
        [class*=basicappdetailssectionstyler_ActionRow]:after {
          content: '';
          width: 48px;
          height: 48px;
          background-image: url(${image});
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          margin-right: -4px;
        }
      `
  }

  return '';
}
