import { afterPatch, findInReactTree, ServerAPI, wrapReactType } from 'decky-frontend-lib'
import React, { ReactElement } from 'react'
import HomePageTrophies from '../components/HomePageTrophies'
import SettingsBus from '../lib/SettingsBus'

export function patchHomePage(serverApi: ServerAPI, settings: SettingsBus) {
  return serverApi.routerHook.addPatch('/library/home', (props) => {
    afterPatch(props.children, 'type', (_, ret: ReactElement) => {
      wrapReactType(ret)
      afterPatch(ret.type, 'type', (_, ret2?: ReactElement) => {
        const container = findInReactTree(ret2, (x) => x.className?.includes('ScrollArea'))

        container?.children.splice(1, 0, <HomePageTrophies settings={settings} />)

        return ret2
      })
      return ret
    })
    return props
  })
}
