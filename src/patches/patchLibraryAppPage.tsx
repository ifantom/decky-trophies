import AppPageTrophy from "../components/AppPageTrophy";
import SettingsBus from "../SettingsBus";
import { routerHook } from "@decky/api";
import { afterPatch, appDetailsClasses, findInTree, wrapReactType } from "@decky/ui";
import { ReactElement } from "react";

export function patchLibraryAppPage(settings: SettingsBus) {
  return routerHook.addPatch("/library/app/:appid", (props) => {
    const node = findInTree(props, (x) => x?.renderFunc, { walkable: ["props", "children"] });
    if (!node.renderFunc) return props;

    afterPatch(node, "renderFunc", ([{ appid: appId }]: Record<string, number>[], ret1?: ReactElement) => {
      if (!ret1?.props?.children?.type?.type) return ret1;

      wrapReactType(ret1.props.children);

      afterPatch(ret1.props.children.type, "type", (_, ret2: ReactElement) => {
        const container = findInTree(ret2, (el) => el?.className === appDetailsClasses.InnerContainer, {
          walkable: ["props", "children"],
        });

        container?.children?.splice(1, 0, <AppPageTrophy appId={appId} settings={settings} />);

        return ret2;
      });

      return ret1;
    });

    return props;
  });
}
