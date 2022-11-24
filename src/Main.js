import React, { useState, useContext, useEffect } from "react";
import "./App.css";
//import { getTheme, getThemeClass } from "./util";
import GlobalContext from "./context/GlobalContext";
import ContextWrapper from "./context/ContextWrapper";
import App from "./App";
import EventModal from "./components/EventModal";
import './themes.css';
import { getAllEvents } from "./services/EventService";
import dayjs from "dayjs";

function DataLoaded(props) {
  const { showEventModal } = useContext(GlobalContext);
  console.log("[MAIN] LOADING DATA... " + props.eventList);
  if (props.isDataLoaded) {
    console.log("[MAIN] DATA LOADED: " + props.eventList);
    return (
      <React.Fragment>
        {showEventModal && <EventModal />}
        <ContextWrapper eventList={props.eventList} isDataLoaded={props.isDataLoaded}>
          <App eventList={props.eventList} isDataLoaded={props.isDataLoaded} />
        </ContextWrapper>
      </React.Fragment>
    );
  }
  console.log("[MAIN] DATA NOT LOADED YET" + props.eventList);
  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <ContextWrapper eventList={props.eventList}>
      </ContextWrapper>
    </React.Fragment>
  );
}

function Main(props) {
  //const [currenMonth, setCurrentMonth] = useState(getMonth());
  //const { monthIndex, showEventModal, dataLoaded, setDataLoaded, eventList, getEvents } = useContext(GlobalContext);
  const [eventList, getEvents] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  //const themeColor = getTheme();
  //const themeClass = getThemeClass();

  console.log("[MAIN] INIT MAIN: " + dayjs() + " " + dataLoaded);

  useEffect(() => {
    if (dataLoaded) {
      console.log("[MAIN] DATA LOADED IN MAIN.EFFECT: " + dataLoaded);
    }
  }, [dataLoaded]);

  useEffect(() => {
    console.log("[MAIN] MAIN.EFFECT LOADING EVENTS: " + dataLoaded);
    getAllEvents().then((response) => {
      const allEvents = response
      //localStorage.setItem("savedEvents", JSON.stringify(allEvents));
      getEvents(allEvents);
      setDataLoaded(true);
    });
  }, []);

  return (
    <DataLoaded isDataLoaded={dataLoaded} eventList={eventList} />
  );
}

export default Main;
