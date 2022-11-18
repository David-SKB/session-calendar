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

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  //const themeColor = getTheme();
  //const themeClass = getThemeClass();

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
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
