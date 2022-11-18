import React from "react";
//import { getAllEvents, createEvent } from "../services/EventService";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  eventStart: null,
  setEventStart: (eventStart) => {},
  eventStartDay: null,
  setEventStartDay: (eventStart) => {},
  eventEnd: null,
  setEventEnd: (eventEnd) => {},
  eventStartTime: null,
  setEventStartTime: (eventStartTime) => {},
  eventEndTime: null,
  setEventEndTime: (eventEndTime) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},
  filteredEvents: [],
  allEvents: [],
  
});

export default GlobalContext;
