import React,{useState} from "react";
import Prescription from "../components/prescription";


export default function PrescriptionPage() {
    const [presc,setPresc]=useState([])
    function addMedicine(prescription) {
        setPresc(prevValue => {
            return [...prevValue, prescription]
        })
    }
    return (
        <div>
        <Prescription />
        </div>
    )
}