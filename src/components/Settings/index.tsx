import { useState } from "react";
import SettingsBus from "../../SettingsBus";
import TrophyPosition from "../../../types/TrophyPosition";
import { DropdownItem, PanelSection, PanelSectionRow, SliderField, ToggleField } from "@decky/ui";

export default function Settings({ settings }: { settings: SettingsBus }) {
  const [topOffset, setTopOffset] = useState<number>(settings.value.homePageTrophiesOffset.top);
  const [sideOffset, setSideOffset] = useState<number>(settings.value.homePageTrophiesOffset.side);

  const appPagePositionOptions = [
    { data: TrophyPosition.Left, label: "Left" },
    { data: TrophyPosition.Center, label: "Center" },
    { data: TrophyPosition.Right, label: "Right" },
  ];

  const homePagePositionOptions = [
    { data: TrophyPosition.Left, label: "Left" },
    { data: TrophyPosition.Right, label: "Right" },
  ];

  return (
    <>
      <PanelSection title="Game Page">
        <PanelSectionRow>
          <ToggleField
            label="Show"
            description="Show the trophy on a game page"
            checked={settings.value.appPageTrophyShow}
            onChange={(value) => settings.next({ ...settings.value, appPageTrophyShow: value })}
          />
        </PanelSectionRow>

        <PanelSectionRow>
          <DropdownItem
            label="Position"
            menuLabel="Position"
            description="Position of the trophy on a game page"
            rgOptions={appPagePositionOptions}
            selectedOption={settings.value.appPageTrophyPosition}
            onChange={({ data }) => settings.next({ ...settings.value, appPageTrophyPosition: data })}
          />
        </PanelSectionRow>
      </PanelSection>

      <PanelSection title="Home Page">
        <PanelSectionRow>
          <ToggleField
            label="Show"
            description="Show trophies on the home page"
            checked={settings.value.homePageTrophiesShow}
            onChange={(value) => settings.next({ ...settings.value, homePageTrophiesShow: value })}
          />
        </PanelSectionRow>

        <PanelSectionRow>
          <DropdownItem
            label="Position"
            menuLabel="Position"
            description="Position of tropies on the home page"
            rgOptions={homePagePositionOptions}
            selectedOption={settings.value.homePageTrophiesPosition}
            onChange={({ data }) => {
              settings.next({
                ...settings.value,
                homePageTrophiesPosition: data,
                homePageTrophiesOffset: data === TrophyPosition.Left ? { top: 16, side: 16 } : { top: 48, side: 16 },
              });
              setTopOffset(16);
              setSideOffset(16);
            }}
          />
        </PanelSectionRow>

        <PanelSectionRow>
          <SliderField
            label="Top Offset"
            min={0}
            max={800}
            step={1}
            notchCount={2}
            notchLabels={[
              { notchIndex: 0, label: "0px" },
              { notchIndex: 1, label: "800px" },
            ]}
            notchTicksVisible={false}
            value={topOffset}
            showValue={true}
            editableValue={true}
            onChange={(value) => {
              settings.next({
                ...settings.value,
                homePageTrophiesOffset: { top: value, side: settings.value.homePageTrophiesOffset.side },
              });
              setTopOffset(value);
            }}
          />
        </PanelSectionRow>

        <PanelSectionRow>
          <SliderField
            label={settings.value.homePageTrophiesPosition === TrophyPosition.Left ? "Left Offset" : "Right Offset"}
            min={0}
            max={640}
            step={1}
            notchCount={2}
            notchLabels={[
              { notchIndex: 0, label: "0px" },
              { notchIndex: 1, label: "640px" },
            ]}
            notchTicksVisible={false}
            value={sideOffset}
            showValue={true}
            editableValue={true}
            onChange={(value) => {
              settings.next({
                ...settings.value,
                homePageTrophiesOffset: { top: settings.value.homePageTrophiesOffset.top, side: value },
              });
              setSideOffset(value);
            }}
          />
        </PanelSectionRow>
      </PanelSection>

      <PanelSection title="Library Page">
        <PanelSectionRow>
          <ToggleField
            label="Replace"
            description="Replace default 100% achievements medal with a platinum trophy"
            checked={settings.value.libraryPageTrophyReplace}
            onChange={(value) => settings.next({ ...settings.value, libraryPageTrophyReplace: value })}
          />
        </PanelSectionRow>
      </PanelSection>
    </>
  );
}
