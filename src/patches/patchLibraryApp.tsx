import { afterPatch, appDetailsClasses, findInReactTree, ServerAPI, wrapReactType } from 'decky-frontend-lib'
import React, { ReactElement } from 'react'

import AppPageTrophy from '../components/AppPageTrophy'
import SettingsBus from '../lib/SettingsBus'

export function patchLibraryApp(serverAPI: ServerAPI, settings: SettingsBus) {
  return serverAPI.routerHook.addPatch('/library/app/:appid', (props: { children: ReactElement }) => {
    afterPatch(
      props.children.props,
      'renderFunc',
      ([{ appid: appId }]: Record<string, unknown>[], ret1: ReactElement) => {
        wrapReactType(ret1.props.children)
        afterPatch(ret1.props.children.type, 'type', (_, ret2: ReactElement) => {
          const container = findInReactTree(ret2, (el) => el?.className === appDetailsClasses.InnerContainer)

          container?.children.splice(1, 0, <AppPageTrophy appId={String(appId)} settings={settings} />)

          return ret2
        })
        return ret1
      }
    )
    return props
  })
}
