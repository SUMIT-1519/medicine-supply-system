import React from "react";

export default function Display(props) {
    return (
        <div className="prescription-form" data-aos="fade-down">
            <h1> Name: {props.name} </h1>
            <h2> Number of Times: {props.frequency} </h2>
            <h2> Number of Days: {props.days} </h2>
        </div>
    )
}