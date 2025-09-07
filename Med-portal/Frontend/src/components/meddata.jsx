import React from "react"

export default function MedData(props) {
    return (
        <div className="contact-card">
            <h3> Name: <div className="med-color">{props.name}</div> </h3>
            <p> <b>Description:</b> {props.description} </p>
            <p> <b>Expiry Date:</b> {props.expirydate} </p>
            <p> <b>Quantity:</b> {props.quantity} </p>
            <p> <b>Purchase Date:</b> {props.purchasedate} </p>
            <p> <b>Price:</b> {props.price} </p>
        </div>
    )
}