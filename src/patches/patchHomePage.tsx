import { ReactElement } from "react";
import HomePageTrophies from "../components/HomePageTrophies";
import SettingsBus from "../SettingsBus";
import { routerHook } from "@decky/api";
import { afterPatch, findClassByName, findInTree, wrapReactType } from "@decky/ui";

export function patchHomePage(settings: SettingsBus) {

  return routerHook.addPatch("/library/home", (props) => {
    const className = findClassByName("ScrollArea");
    if (!className) return props;

    afterPatch(props.children, "type", (_, ret: ReactElement) => {
      wrapReactType(ret);

      afterPatch(ret.type, "type", (_, ret2: ReactElement) => {
        const container = findInTree(ret2, (x) => x.className?.includes(className), {
          walkable: ["props", "children"],
        });

        container?.children.splice(1, 0, <HomePageTrophies settings={settings} />);

        return ret2;
      });

      return ret;
    });

    return props;
  });
}
