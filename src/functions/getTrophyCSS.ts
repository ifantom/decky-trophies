import { TROPHY_IMAGES } from "../../assets/trophies";
import TrophyPosition from "../../types/TrophyPosition";
import Trophy from "../../types/Trophy";
import { basicAppDetailsSectionStylerClasses, playSectionClasses } from "@decky/ui";

export function getTrophyCSS(trophy: Trophy, position: TrophyPosition): string {
  const image = encodeURI(TROPHY_IMAGES[trophy]);

  switch (position) {
    case TrophyPosition.Left:
      return `
        [class*=${basicAppDetailsSectionStylerClasses.ActionRow}]:before {
          content: '';
          width: 48px;
          height: 48px;
          background-image: url(${image});
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          margin-left: -4px;
        }
      `;

    case TrophyPosition.Center:
      return `
        [class*=${playSectionClasses.MiniAchievements}]:before {
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
      `;

    case TrophyPosition.Right:
      return `
        [class*=${basicAppDetailsSectionStylerClasses.ActionRow}]:after {
          content: '';
          width: 48px;
          height: 48px;
          background-image: url(${image});
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          margin-right: -4px;
        }
      `;
  }

  return "";
}
