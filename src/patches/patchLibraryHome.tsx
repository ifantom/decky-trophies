import { findModule, findSP } from 'decky-frontend-lib'

import Platinum from '../../assets/trophies/trophy-platinum.png'

export function patchLibrary() {
  const document = findSP().window.document
  let style = document.getElementById('achievement-trophies-library-patch')

  if (!style) {
    style = document.createElement('style')
    style.id = 'achievement-trophies-library-patch'
    style.textContent = `
      .${appPortraitClasses.ClassAllAchieved} svg {
        background: url(${encodeURI(Platinum)});
        background-size: 40px;
        background-repeat: no-repeat;
        background-position: center;
        left: -16px !important;
        top: -12px !important;
      }
      
      .${appPortraitClasses.ClassAllAchieved} svg * {
        display: none;
      }
    `
    document.head.append(style)
  }
}

export function unpatchLibrary() {
  let style = findSP().window.document.getElementById('achievement-trophies-library-patch')

  style?.remove()
}

const appPortraitClasses: Record<'ClassAllAchieved', string> = findModule(
  (mod) => typeof mod === 'object' && mod?.Capsule?.includes('appportrait_')
)
