import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";
import { getMonth, getTheme, getThemeClass } from "../util";
import '../themes.css';

export default function CreateEventButton() {
  const themeColor = getTheme();
  const themeClass = getThemeClass();
  const accentColor = getTheme("accentColor");
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className={"border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl " + themeClass}
    >
      <img src={plusImg} alt="create_event" className="w-7 h-7" />
      <span className="pl-3 pr-7"> Create</span>
    </button>
  );
}
