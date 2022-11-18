import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import { getTheme, getThemeClass } from "../util";
import '../themes.css';

export default function Sidebar() {
  const themeColor = getTheme();
  const themeClass = getThemeClass();
  //const accentColor = getTheme("accentColor");

  return (
    <aside className={"border border-" + themeColor + "-700 p-5 w-64 " + themeClass}>
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
