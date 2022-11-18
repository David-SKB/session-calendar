import axios from 'axios';
import React, { useEffect, useState } from 'react';


export default function getAllEvents() {

    const [result, setResult] = useState(null);

    const message = async () => {
        try{
            let response = await axios.get('http://localhost:8000/events');
            console.log('response data ', response.data)
            //return response.data;
            let responseData = response.data;
            setResult(responseData);
        }catch(error) {
            console.log(error)
            //return [];
        }
    };
    
    useEffect(() => {
        message()
    }, [])

    return (
        <div>
            {result}
        </div>
    )
    
}

export async function createEvent(data) {
    const response = await axios.post(`/api/user`, {event: data});
    return response.data;
}
