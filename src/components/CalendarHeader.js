import dayjs from "dayjs";
import React, { useContext } from "react";
//import logo from "../assets/logo.png";
//import logo_4PLAY from "../assets/4PLAY_LOGO.png";
import logo_wildcard from "../assets/ROGUE_SYMBOL.webp";
import GlobalContext from "../context/GlobalContext";
import { getTheme } from "../util";
//import { getThemeClass } from "../util";
import '../themes.css';

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const themeColor = getTheme();
  const accentColor = getTheme("accentColor");
  //const themeClass = getThemeClass();
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className={"px-4 py-2 flex items-center"}>
      <img src={logo_wildcard} alt="calendar" className={"mr-2 w-12 h-12"} />
      <h1 className={"mr-10 text-xl text-" + accentColor + "-500 font-bold"}>
        Studio Calendar
      </h1>
      <button
        onClick={handleReset}
        className={"border border-" + themeColor + "-700 rounded py-2 px-4 mr-5"}
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className={"material-icons-outlined cursor-pointer text-" + accentColor + "-600 mx-2"}>
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className={"material-icons-outlined cursor-pointer text-" + accentColor + "-600 mx-2"}>
          chevron_right
        </span>
      </button>
      <h2 className={"ml-4 text-xl text-" + accentColor + "-500 "}>
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
    </header>
  );
}
