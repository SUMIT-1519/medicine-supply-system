import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const PreBookPage = () => {
  const { prescriptionId } = useParams(); 
  const [availability, setAvailability] = useState([]);
  const [pdfPath, setPdfPath] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prescription, setPrescription] = useState(null); // Store prescription details

  useEffect(() => {
    const fetchPrescription = async () => {
      // Replace with actual logic to fetch prescription data by prescriptionId
      // This could be from an API or state management
      try {
        const response = await axios.get(`http://localhost:5000/presc/${prescriptionId}`);
        setPrescription(response.data);
      } catch (error) {
        console.error('Error fetching prescription data:', error);
      }
    };

    fetchPrescription();
  }, [prescriptionId]);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (prescription) {
        try {
          const response = await axios.post('http://localhost:5000/check', prescription);
          setAvailability(response.data.availableStores);
          setPdfPath(response.data.pdfPath);
        } catch (error) {
          console.error('Error fetching availability:', error);
        }
      }
    };

    fetchAvailability();
  }, [prescription]);

  const handlePreBook = async (storeId) => {
    setIsSubmitting(true);
    try {
      await axios.post(`http://localhost:5000/prebook/`, {
        // Include any necessary data for prebooking, if applicable
        storeId:storeId,
        prescriptionId:prescriptionId
      });
      alert('Medicine prebooked successfully!');
    } catch (error) {
      console.error('Error prebooking medicine:', error);
      alert('Error prebooking medicine');
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <h1>Prebook Medicines</h1>
      {availability.length > 0 ? (
        availability.map((item) => (
          <div key={item.medicine}>
            <h2>{item.medicine}</h2>
            <ul>
              {item.stores.map((store) => (
                <li key={store.storeId}>
                  <div>
                    <h3>{store.storeName}</h3>
                    <p>Address: {store.storeAddress}</p>
                    <p>Contact: {store.contactNumber}</p>
                    <p>Available Quantity: {store.availableQuantity}</p>
                    <p>Distance: {store.distance} meters</p>
                    <button
                      onClick={() => handlePreBook(store.storeId)}
                      disabled={isSubmitting}
                    >
                      Prebook
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No availability information found.</p>
      )}

      {pdfPath && (
        <a href={`http://localhost:5000/${pdfPath}`} download>
          Download Prescription PDF
        </a>
      )}
    </div>
  );
};

export default PreBookPage;
