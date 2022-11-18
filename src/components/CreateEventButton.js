import React, { useContext } from "react";
import plusImg from "../assets/CALENDAR_ICON.png";
import GlobalContext from "../context/GlobalContext";
import { getTheme, getThemeClass } from "../util";
import '../themes.css';

export default function CreateEventButton() {
  const themeColor = getTheme();
  const themeClass = getThemeClass();
  //const accentColor = getTheme("accentColor");
  const { setShowEventModal } = useContext(GlobalContext);
  console.log(themeClass);

  return (
    <button
      onClick={() => setShowEventModal(true)}
      className={"border p-2 rounded-full flex items-center hover:border-" + themeColor + "-900 " + themeClass}
    >
      <img src={plusImg} alt="create_event" className="w-7 h-7" />
      <span className="pl-3 pr-7"> Create Event</span>
    </button>
  );
}
