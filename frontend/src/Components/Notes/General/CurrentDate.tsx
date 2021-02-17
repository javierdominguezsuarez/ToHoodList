import React from 'react'

export default function CurrentDate() {

    const localDate = new Date(Date.now());

    const months = [
       "January",
       "February",
       "March",
       "April",
       "May",
       "June",
       "July",
       "August",
       "September",
       "October",
       "November",
       "December",
    ];
    
    const days = [
       "Sunday",
       "Monday ",
       "Tuesday",
       "Wednesday",
       "Thursday",
       "Friday",
       "Saturday",
    ];

    return (
        <h3 style={{color: "white", fontSize: 30}}>{localDate.getDate()}, {months[localDate.getMonth()]}</h3>
    )
}
