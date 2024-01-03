import React from 'react'
import { definePlugin, ServerAPI, staticClasses } from 'decky-frontend-lib'
import { FaTrophy } from 'react-icons/fa'

import { patchHomePage, patchLibrary, patchLibraryApp, unpatchLibrary } from './patches'
import SettingsBus from './lib/SettingsBus'
import Settings from './components/Settings'

export default definePlugin((serverAPI: ServerAPI) => {
  const settings = new SettingsBus()

  const libraryAppPatch = patchLibraryApp(serverAPI, settings)
  const homePagePatch = patchHomePage(serverAPI, settings)

  let libraryPageTrophyReplace = settings.value.libraryPageTrophyReplace

  if (libraryPageTrophyReplace) patchLibrary()

  settings.subscribe((value) => {
    if (value.libraryPageTrophyReplace === libraryPageTrophyReplace) return

    libraryPageTrophyReplace = value.libraryPageTrophyReplace

    return libraryPageTrophyReplace ? patchLibrary() : unpatchLibrary()
  })

  return {
    title: <div className={staticClasses.Title}>Achievement Trophies</div>,
    icon: <FaTrophy />,
    content: <Settings settings={settings} />,
    onDismount() {
      serverAPI.routerHook.removePatch('/library/app/:appid', libraryAppPatch)
      serverAPI.routerHook.removePatch('/library/home', homePagePatch)
      settings.unsubscribe()
      unpatchLibrary()
    }
  }
})
