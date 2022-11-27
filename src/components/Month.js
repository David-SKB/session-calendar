import React from "react";
import Day from "./Day";
export default function Month({ month, isDataLoaded, eventList }) {

  console.log("[MONTH] INIT MONTH: " + isDataLoaded + " " + eventList);
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {
            row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} isDataLoaded={isDataLoaded} eventList={eventList}/>
            ))
          }
        </React.Fragment>
      ))}
    </div>
  );
}