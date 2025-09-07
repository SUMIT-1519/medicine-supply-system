export default function PrecDetail(props){
    return(
    <div className="prescription-form" data-aos="fade-right">
        <h1 align="centre">Prescription</h1>
        <h2 align="centre">Patient's Name : {props.name}</h2>
        <h2 align="centre">Doctor's Name : {props.doctor}</h2>
        <h2 align="centre">Caretaker's Email: {props.email}</h2>
    </div>)
}