import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { getTheme, getThemeClass } from "../util";
import '../themes.css';
//import { getAllEvents, createEvent } from "../services/EventService";

export default function Day({ day, rowIdx, isDataLoaded, eventList }) {
  const themeColor = getTheme();
  const themeClass = getThemeClass();
  //const borderClass = getThemeClass("border");
  console.log("[DAY] LOADING DATA: " + isDataLoaded + " " + eventList);
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);
  //console.log("[DAY] FILTEREDEVENTS: " + filteredEvents);
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.start_date).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-".concat(themeColor, "-600 text-white rounded-full w-7")
      : "";
  }
  return (
    <div className={"border flex flex-col " + themeClass}>
      
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {isDataLoaded && dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.event_label}-200 p-1 mr-0 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.event_title}
          </div>
        ))}
      </div>
    </div>
  );
}
