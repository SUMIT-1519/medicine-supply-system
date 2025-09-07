import React, { useEffect, useState ,useRef} from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

var id;

export default function Status() {
  const available=useRef(true);
  const request = useLocation();
  useEffect(() => {
    id = request.state.key;
    const doctorId = localStorage.getItem('doctorId');
    // console.log(id)
    axios.get('http://localhost:5000/presc/' + id).then((res) => {
      const prescriptionData = res.data;

      // Prepare data for availability check
      const requestData = {
        ...prescriptionData,
        doctorId: doctorId // Include doctorId for hospital address lookup
      };
      console.log(requestData);
        axios.post("http://localhost:5000/check", requestData).then((res) => {
        // available.current=res.data.availability

        // console.log(available.current)
        const { pdfPath, availableStores }=res.data;
        const emailData = {
          email:  prescriptionData.email,
          availability: availableStores,
          pdfPath: pdfPath,
          prescriptionId:id
        };
    
        // Call the send-prescription-email API
       axios.post("http://localhost:5000/mail", emailData);
    
        console.log('Email sent successfully');
        // console.log(res.availableStores);
        })
      })
      
    })
    
    
    
  console.log("Status :"+available.current);
  if (available.current === true) {
    return (
      <div>
        <Available />
      </div>
    )
  }
  else {
    return (
      <div>
        <NotAvailable />
      </div>
    )
  }
}

function Available() {
  const navigate=useNavigate();
  function handleSubmit() {
    console.log(id)
    axios.get('http://localhost:5000/presc/'+id).then((res)=>{
      console.log(res.data)
      axios.post('http://localhost:5000/mail',res.data).then((res1)=>console.log(res1.data))
      alert("Consent Request Sent")
      navigate("/");
    })
  }
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "white" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100 text-center">
            <MDBCol>
              <MDBBtn color='dark' size="lg" onClick={toggleShow}>
                <MDBIcon fas icon="info me-2" /> Get update
              </MDBBtn>
              <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader className="border-bottom-0">
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="text-start text-black p-4">
                      <MDBTypography
                        tag="h5"
                        className="modal-title text-uppercase mb-5"
                        id="exampleModalLabel"
                      >
                        MEDICINE AVAILABLE!
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/5278/5278681.png">


                        </img>
                      </MDBTypography>


                      <MDBTypography
                        tag="h4"
                        className="mb-5"
                        style={{ color: "#35558a", align: "center" }}

                      >


                        <Button variant="primary" onClick={handleSubmit}>proceed to consent form.</Button>{' '}

                      </MDBTypography>

                    </MDBModalBody>


                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );

}

function NotAvailable() {
  const [basicModal, setBasicModal] = useState(false);
  const navigate=useNavigate();
  function handleSubmit() {
    console.log(id)
    axios.get('http://localhost:5000/presc/'+id).then((res)=>{
      console.log(res.data)
      axios.post('http://localhost:5000/mail/notAvail',res.data).then((res1)=>console.log(res1.data))
      alert("Prescription Emailed")
      navigate("/");
    })
  }

  const toggleShow = () => setBasicModal(!basicModal);
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "white" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100 text-center">
            <MDBCol>
              <MDBBtn color='dark' size="lg" onClick={toggleShow}>
                <MDBIcon fas icon="info me-2" /> Get update
              </MDBBtn>
              <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader className="border-bottom-0">
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="text-start text-black p-5">
                      <MDBTypography
                        tag="h5"
                        className="modal-title text-uppercase mb-5"
                        id="exampleModalLabel"
                      >
                        MEDICINE NOT AVAILABLE!
                        <img
                          src="https://www.shutterstock.com/image-vector/house-not-available-icon-flat-260nw-1030785001.jpg">


                        </img>
                        SORRY! PLEASE CHECK BACK AGAIN LATER!
                      </MDBTypography>


                      <MDBTypography
                        tag="h4"
                        className="mb-5"
                        style={{ color: "#35558a", align: "center" }}

                      >


                        <Button variant="primary" onClick={handleSubmit}>proceed.</Button>{' '}

                      </MDBTypography>

                    </MDBModalBody>

                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );

}
