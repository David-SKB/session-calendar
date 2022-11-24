import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
//import { getTheme, getThemeClass } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import './themes.css';

function App(props) {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  if (props.isDataLoaded) {
  console.log("[APP] PROPS DATA: " + props.isDataLoaded + " " + props.eventList);
  }
  //const themeColor = getTheme();
  //const themeClass = getThemeClass();
  //const forceUpdate = useForceUpdate();
  //const [eventList, getEvents] = useState([]);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className={"h-screen flex flex-col theme-red"}>
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          {props.isDataLoaded && <Month month={currenMonth} isDataLoaded={props.isDataLoaded} eventList={props.eventList}/>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
