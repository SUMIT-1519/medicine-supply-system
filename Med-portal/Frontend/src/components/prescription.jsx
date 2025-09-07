import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Display from "../components/displayprescription";
import PrecDetail from "./prescDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Prescription(props) {
    const [details, setDetails] = useState({
        name: "",
        doctor: "",
        email: ""
    })
    // const id;
    const [medicine, setMedicine] = useState({
        name: "",
        frequency: 0,
        days: 0,
        quantity: 0
    })

    const [presc,setPresc]=useState([])
    function addMedicine(prescription) {
        setPresc(prevValue => {
            return [...prevValue, prescription]
        })
    }


    function handleChange1(event) {
        const { name, value } = event.target;
        setDetails(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleChange2(event) {
        const { name, value } = event.target;
        let newValue = parseInt(value) || 0; // Parse the input value as an integer
    
        // Update frequency and days, then recalculate the quantity
        if (name === "frequency") {
            setMedicine(prevMedicine => ({
                ...prevMedicine,
                [name]: newValue,
                quantity: newValue * prevMedicine.days // Update quantity based on the new frequency
            }));
        } else if (name === "days") {
            setMedicine(prevMedicine => ({
                ...prevMedicine,
                [name]: newValue,
                quantity: prevMedicine.frequency * newValue // Update quantity based on the new days
            }));
        } else {
            setMedicine(prevMedicine => ({
                ...prevMedicine,
                [name]: value // Update other fields
            }));
        }
    }
    

    function handleSubmit(event) {
        setPresc(prevValue => {
            return [...prevValue, medicine]
        })
        setMedicine({
            name: "",
            frequency: 0,
            days: 0,
            quantity:0
        })
        event.preventDefault();
    }
    
    const navigate = useNavigate();

    function handlePresc(event){
        const doctorId = localStorage.getItem("doctorId");  
        const pr1 = {
            name: details.name,
            doctor: details.doctor,
            email: details.email,
            med: presc,
            doctorId:doctorId // Pass the doctor's email here
        };
        
        console.log(pr1);
        
        axios.post("http://localhost:5000/presc", pr1)
            .then((res) => {
                navigate('/status', {
                    state: {
                        key: res.data._id
                    }
                });
            })
            .catch((err) => {
                console.error(err);
            });
    
        event.preventDefault();
    }
    return (
        <div>
        <Form className="lovw">
            <Form.Group className="mb-3">
                <Form.Label>Name of Patient</Form.Label>
                <Form.Control type="text" placeholder="Enter Patient's Name" className="tish" name="name"
                    value={details.name}
                    onChange={handleChange1} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Name of Doctor</Form.Label>
                <Form.Control type="text" placeholder="Enter Doctor's Name" className="tish" name="doctor"
                    value={details.frequency}
                    onChange={handleChange1} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Patient's Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Patient's Email ID" className="tish" name="email"
                    value={details.email}
                    onChange={handleChange1} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Name of Medicine</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" className="tish" name="name"
                    value={medicine.name}
                    onChange={handleChange2} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Number of times in a day</Form.Label>
                <Form.Control type="number" placeholder="Enter Number of Times" className="tish" name="frequency"
                    value={medicine.frequency}
                    onChange={handleChange2} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Number of days</Form.Label>
                <Form.Control type="number" placeholder="Enter Number of Days" className="tish" name="days"
                    value={medicine.days}
                    onChange={handleChange2} />
            </Form.Group>
            <div className="container1">
                <div className="container2">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            </div>
            </div>
        </Form>
        <br></br><br></br>
        <PrecDetail
            name={details.name}
            doctor={details.doctor}
            email={details.email} />
        {presc.map((prescItem, index) => {
            return (
                <Display
                    key={index}
                    id={index}
                    name={prescItem.name}
                    frequency={prescItem.frequency}
                    days={prescItem.days}
                />
            );
        })}
        <div className="container1">
            <div className="container2">
        <Button variant="primary" type="submit" onClick={handlePresc}>
                Proceed with prescription
            </Button>
            </div>
            </div>
    </div>
    )
}