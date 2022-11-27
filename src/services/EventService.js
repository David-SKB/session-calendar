import axios from 'axios';
import dayjs from 'dayjs';
import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

export async function createEvent(data) {
    console.log("[ES] [PUT] START TIME: " + dayjs() + " " + data);
    const headers = {
        'Content-Type': 'application/json'
    };
    let success = await axios.post('http://localhost:8000/event', data, headers)
    .then(response => success = response
    ).catch(function(err) {
       console.log("[ES] [PUT] ERROR: " + err); 
       return err;
    }).then(function () {
        // always executed
        console.log('[ES] [PUT] SUCCESS: ' + success);
        console.log("[ES] [PUT] COMPLETE TIME: " + dayjs());  
        return success;
      });
      return success;
}

export async function getAllEvents() {
    //const [event_list, setEventList] = useState([])
    //const [eventList, getEvents] = useState([]);
    //const [dataLoaded, setDataLoaded] = useContext(GlobalContext);
    console.log("[ES] [GET] START TIME: " + dayjs());
    let event_list = await axios.get('http://localhost:8000/events').then(response => event_list = response.data
    ).catch(function(err) {
       console.log("[ES] [GET]ERROR: " + err); 
       return err;
    }).then(function () {
        // always executed
        console.log('[ES] [GET] event_list DATA: ' + event_list);
        //localStorage.setItem("savedEvents", JSON.stringify(event_list));
        console.log("[ES] [GET] COMPLETE TIME: " + dayjs());  
        //getEvents(JSON.stringify(event_list));
        //setDataLoaded(true);
        return event_list;
      });
      return event_list; 
}

export async function getAllEvents2() {
    const [eventList, getEvents] = useState([]);
    const [dataLoaded, setDataLoaded] = useContext(GlobalContext);
    console.log("[ES] START TIME: " + dayjs());

    const getAllEvents = () => {
        axios.get('http://localhost:8000/events')
        .then((response) => {
            const allEvents = response.data
            localStorage.setItem("savedEvents", JSON.stringify(allEvents));
            getEvents(allEvents);
            setDataLoaded(true);
            console.log("[ES] COMPLETE TIME: " + dayjs());
        })
        .catch(function(err) {
            console.log("[ES] ERROR: " + err); 
        });

    }; 
}