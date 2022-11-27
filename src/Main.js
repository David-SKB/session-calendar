import React, { useState, useContext, useEffect } from "react";
import "./App.css";
//import { getTheme, getThemeClass } from "./util";
//import GlobalContext from "./context/GlobalContext";
import ContextWrapper from "./context/ContextWrapper";
import App from "./App";
import './themes.css';
import { getAllEvents } from "./services/EventService";
import dayjs from "dayjs";

function DataLoaded(props) {
  console.log("[MAIN] [DATALOADED] RELOAD DATA VALUE: " + props.reloadData + " " + props.setReloadData);
  //const [dataSubmitted, setDataSubmitted] = useState(false);
  console.log("[MAIN] LOADING DATA... " + props.eventList);
  return (
    <React.Fragment>
      <ContextWrapper eventList={props.eventList} isDataLoaded={props.isDataLoaded}>
        <App eventList={props.eventList} isDataLoaded={props.isDataLoaded} reloadData={props.reloadData} setReloadData={props.setReloadData} />
      </ContextWrapper>
    </React.Fragment>
  );
}

function Main(props) {
  //const { loadData, reloadData, setReloadData, showEventModal } = useContext(GlobalContext);
  const [eventList, getEvents] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  //const themeColor = getTheme();
  //const themeClass = getThemeClass();
  console.log("[MAIN] INIT MAIN: " + dayjs() + " " + dataLoaded + " " + reloadData);

  /*useEffect(() => {
    if (dataLoaded) {
      console.log("[MAIN] DATA LOADED IN MAIN.EFFECT: " + dataLoaded);
    }
  }, [dataLoaded]);*/

  useEffect(() => {
    console.log("[MAIN] MAIN.EFFECT LOADING EVENTS: " + dataLoaded);
    getAllEvents().then((response) => {
      const allEvents = response
      getEvents(allEvents);
      setDataLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      setDataLoaded(false);
      console.log("[MAIN] RELOAD DATA.EFFECT: " + reloadData);
      getAllEvents().then((response) => {
        const allEvents = response
        getEvents(allEvents);
        setDataLoaded(true);
      });
    }
  }, [reloadData]);

  return (
    <DataLoaded isDataLoaded={dataLoaded} eventList={eventList} reloadData={reloadData} setReloadData={setReloadData} />
  );
}

export default Main;
