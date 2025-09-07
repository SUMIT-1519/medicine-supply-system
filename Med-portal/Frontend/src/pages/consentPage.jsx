import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./consent.css"
import Display from "../components/displayprescription";
import PrecDetail from "../components/prescDetails";



function Consent() {
    const params = useParams()
    const navigate = useNavigate()
    const [presc, setPresc] = useState({})
    const [med, setMed] = useState([])

    useEffect(() => {
        const id = params.id;
        axios.get('http://localhost:5000/presc/' + id).then((res) => {
            setPresc(res.data);
            setMed(res.data.med)

        })
    })

    function handleYes() {
        console.log(params)
        const id = params.id;
        axios.post('http://localhost:5000/presc/order/' + id).then(() => {
            axios.get('http://localhost:5000/presc/' + id).then((res) => {
                console.log(res.data)
                axios.post('http://localhost:5000/mail/delivered', res.data).then((res1) => console.log(res1.data))
            })
            alert("Order Placed")
            navigate("/");
        })
    }

    function handleNo() {
        console.log("NO")
        navigate('/');
    }

    return (<div className="a">
        <center>
            <pre>
                Do you want to confirm and proceed <br /> with the prescription?
            </pre>
            <button className="abc" onClick={handleYes}>Yes, I want to proceed</button>
            <button className="xyz" onClick={handleNo}>No
                <span className="popup">If you don't want to proceed, you can consider taking screenshot of the prescription</span>
            </button>
            <div className="b">
            <PrecDetail name={presc.name} doctor={presc.doctor} email={presc.email} />
            {med.map((item) => {
                return(<Display name={item.name} frequency={item.frequency} days={item.days} />)
            })}
            </div>
        </center>



    </div>);
}

export default Consent;