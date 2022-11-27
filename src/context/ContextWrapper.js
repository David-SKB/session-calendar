import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { isObjectEmpty } from "../util";

function savedEventsReducer(state, { type, payload }) {
  //console.log("[CW] STATE: " + state);
  //console.log("[CW] TYPE: " + type);
  //console.log("[CW] PAYLOAD: " + payload);
  //const [dataSubmitted, setDataSubmitted] = useState(false);
  switch (type) {
    case "push":
      console.log("[CW] POSTING EVENT: " + payload);
    return [...state, payload];
    case "update":
      return state.map((evt) =>
        evt.id === payload.id ? payload : evt
      );
    case "load":
      return payload;
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents(props) {
  console.log("[CW] INIT EVENTS: " + props);
  const storageEvents = props.eventList;
  var count = (isObjectEmpty(props.eventList) ? 0 : Object.keys(props.eventList).length);
  const stringEvents = (count > 0 ? JSON.stringify(storageEvents) : []);
  const parsedEvents = (count > 0 ? JSON.parse(stringEvents) : []);
  console.log("[CW] PARSEDEVENTS: " + parsedEvents);
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );
  console.log("[CW] INIT CW: " + (props.eventList));

  const filteredEvents = useMemo(() => {
    //DEBUG
    //console.log("[CW] PROPS DATATYPE: " + typeof props.eventList);
    //props.eventList == null ? console.log("[CW] PROPS CONDITION NULLTYPE [TRUE]: " + props.eventList) : console.log("[CW] PROPS CONDITION NULLTYPE [FALSE]: " + props.eventList);
    //props.eventList == undefined ? console.log("[CW] PROPS CONDITION UNDEFINED [TRUE]: " + props.eventList) : console.log("[CW] PROPS CONDITION UNDEFINED [FALSE]: " + props.eventList);
    //props.eventList == "" ? console.log("[CW] PROPS CONDITION EMPTYSTRING [TRUE]: " + props.eventList) : console.log("[CW] PROPS CONDITION EMPTYSTRING [FALSE]: " + props.eventList);
    var count = (isObjectEmpty(props.eventList) ? 0 : Object.keys(props.eventList).length);
    if (count > 0) {
      console.log("[CW] PROPS EVENT DATA: " + props.eventList);
      console.log("[CW] LABELS: " + labels);
      const stringEvents = (count > 0 ? JSON.stringify(props.eventList) : []);
      const parsedEvents = (count > 0 ? JSON.parse(stringEvents) : []);
      return parsedEvents.filter((evt) =>
        labels
          .filter((lbl) => lbl.checked)
          .map((lbl) => lbl.label)
          .includes(evt.event_label)
      );
    };
    return [];

  }, [savedEvents, labels, props.isDataLoaded]);

  useEffect(() => {
    if (props.isDataLoaded) {
      console.log("[CW] DATA LOADED BITCH " + props.isDataLoaded + props.eventList);
      dispatchCalEvent({ type: "load", payload: props.eventList });
    }
  }, [props.isDataLoaded]);

  useEffect(() => {
    var count = (isObjectEmpty(props.eventList) ? 0 : Object.keys(props.eventList).length);
    const stringEvents = (count > 0 ? JSON.stringify(props.eventList) : []);
    const parsedEvents = (count > 0 ? JSON.parse(stringEvents) : []);
    console.log("[CW] EVENTLIST UPDATED: " + parsedEvents);

  }, [props.eventList]);

  useEffect(() => {
    //console.log("[CW] THE GHOST EFFECT: " + props.eventList);
    //console.log("[CW] THE GHOST EFFECTOR: " + JSON.parse(props.eventList));

    if (props.isDataLoaded) {
      console.log("[CW] DATA LOADED: " + props.isDataLoaded + " " + props.eventList);
    } else {
      console.log("[CW] DATA NOT LOADED YET: " + props.isDataLoaded);
    }
  }, [savedEvents]);

  useEffect(() => {
    savedEvents == null ? console.log("[CW] PROPSEFFECT CONDITION EMPTYSTRING [TRUE]: " + savedEvents) : console.log("[CW] PROPSEFFECT CONDITION EMPTYSTRING [FALSE]: " + savedEvents);
    if (savedEvents != null) {
      setLabels((prevLabels) => {
        return [...new Set(savedEvents.map((evt) => evt.event_label))].map(
          (label) => {
            const currentLabel = prevLabels.find(
              (lbl) => lbl.label === label
            );
            return {
              label,
              checked: currentLabel ? currentLabel.checked : true,
            };
          }
        );
      });
    };

  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
      {props.isDataLoaded}
    </GlobalContext.Provider>
  );
}