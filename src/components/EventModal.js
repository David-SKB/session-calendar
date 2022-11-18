import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getTheme, getThemeClass } from "../util";
import '../themes.css';
import dayjs from "dayjs";

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal() {
  const themeColor = getTheme();
  const themeClass = getThemeClass("primary-color");
  const accentColor = getTheme("primary-color");
  const {
    setShowEventModal,
    dispatchCalEvent,
    selectedEvent,
    daySelected,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [eventStartTime, setEventStartTime] = useState(
    selectedEvent ? selectedEvent.eventStartTime : ""
  );
  const [eventEndTime, setEventEndTime] = useState(
    selectedEvent ? selectedEvent.eventEndTime : ""
  );
  const [eventStart, setEventStart] = useState(
    selectedEvent ? selectedEvent.eventStart : ""
  );
  const [eventEnd, setEventEnd] = useState(
    selectedEvent ? selectedEvent.eventEnd : ""
  );
  const [eventStartDay, setEventStartDay] = useState(
    selectedEvent ? selectedEvent.eventStartDay : ""
  );
  
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const eventID = new Date(replaceRange((eventStart ? eventStart : daySelected.toDate().toISOString()), 11, 16, eventStartTime.valueOf())).valueOf();
    //console.log("HANDLESUBMIT: " + eventID);
    //console.log("SELECTEDEVENT: " + selectedEvent);
    //console.log(eventStart);
    //console.log(eventStartTime.valueOf());
    //console.log(eventID);

    const calendarEvent = {
      title,
      description,
      event_label: selectedLabel,
      day: eventStart ? eventStart : daySelected,
      eventStart: eventStart ? eventStart : daySelected,
      eventEnd,
      eventStartTime,
      eventEndTime,
      id: selectedEvent ? selectedEvent.id : eventID,
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  function replaceRange(s, start, end, substitute) {
    console.log("REPLACERANGE: " + s + "SUB: " + substitute);
    return s.substring(0, start) + substitute + s.substring(end);
}
  /** DEBUG **/
  //console.log(daySelected.toDate());
  //console.log(daySelected.valueOf());
  //console.log(daySelected);
  //console.log(daySelected.toISOString());
  //console.log(daySelected.toISOString().slice(0, 16));
  //console.log(eventStart.slice(0, 10));

  /*console.log("2022-11-13T08:30");
  console.log(selectedEvent);
  console.log("merger 1: " + daySelected.toDate().toISOString() + "T" + eventStartTime)
  //console.log("test merger: " + new Date(eventStart + "T" + eventStartTime.valueOf()).valueOf());
  console.log("test merger: " + new Date(replaceRange(daySelected.toDate().toISOString(), 11, 16, eventStartTime)).valueOf());
  console.log("DATE NOW: " + Date.now());
  console.log("EVENT START TIME: " + eventStartTime.valueOf());
  console.log("EVENT START DAY: " + eventStartDay);//empty
  console.log("EVENT START: " + eventStart);//empty
  console.log("EVENT START RAW: " + new Date(eventStart).valueOf());//empty
  console.log("DAY SELECTED1: " + new Date(daySelected).toISOString().slice(0, 10));
  console.log("DAY SELECTED2: " + daySelected);
  console.log("DAY SELECTED3: " + daySelected.toDate());*/
  //console.log(dayjs().toISOString().slice(0, 10));
  return (
    <div className={"h-screen w-full fixed left-0 top-0 flex justify-center items-center"}>
      <form className={"bg-" + themeColor + "-200 rounded-lg shadow-2xl w-1/4"}>
        <header className={"bg-gray-100 px-4 py-2 flex justify-between items-center " + themeClass}>
          <span className={"material-icons-outlined text-gray-400" }>
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className={"material-icons-outlined text-gray-400 cursor-pointer"}
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className={"material-icons-outlined text-gray-400 "}>
                close
              </span>
            </button>
          </div>
        </header>
        <div className={"p-3 " }>
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className={"pt-3 border-0 text-gray-600 bg-" + themeColor + "-200 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="self-center material-icons-outlined text-gray-400">
              calendar_month
            </span>
            
            <input
                type="date"
                name="eventStart"
                id="eventStart"
                value={eventStart ? new Date(eventStart).toISOString().slice(0, 10) : new Date(daySelected).toISOString().slice(0, 10)}
                required
                className={"justify-center border-none bg-" + themeColor + "-200"}
                onChange={(e) => {setEventStart(e.target.value); }}
                min={dayjs().toISOString().slice(0, 10)}
              />

            {<span className="self-center material-icons-outlined text-gray-400">
              schedule
            </span>}
            <div>
              <input
                type="time"
                name="eventStartTime"
                id="eventStartTime"
                value={eventStartTime}
                required
                className={"w-1/2 justify-center border-none bg-" + themeColor + "-200"}
                onChange={(e) => setEventStartTime(e.target.value)}
                min={dayjs().toISOString().slice(0, 10)}
              />
              <input
                type="time"
                name="eventEndTime"
                id="eventEndTime"
                value={eventEndTime}
                required
                className={"w-1/2 justify-center border-none bg-" + themeColor + "-200"}
                onChange={(e) => setEventEndTime(e.target.value)}
                min={eventStartTime ? eventStartTime : dayjs().toISOString().slice(0, 10)}
              />
            </div>
            

            <span className="self-center material-icons-outlined text-gray-400">
              segment
              </span>


            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className={"pt-3 bg-" + themeColor + "-200 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="self-center material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className={"bg-" + accentColor + "-500 hover:bg-" + accentColor + "-600 px-6 py-2 rounded text-white"}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
