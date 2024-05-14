import { useState } from 'react';
import firebaseApp from './Config'; // Path to your Config.js file
import './App.css'
const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    state: '',
    favoriteFood: '',
    remarks: ''
  });
  const [documentId, setDocumentId] = useState(null); // State to store the document ID
  const [showModal, setShowModal] = useState(false); // State to control modal display

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStepSubmit = () => {
    // Get a reference to the Firestore database
    const firestore = firebaseApp.firestore();

    // If it's the first step, create a new document in the "userInputs" collection
    if (step === 1) {
      firestore.collection('userInputs').add(formData)
        .then((docRef) => {
          console.log('Document saved successfully');
          // Store the document ID
          setDocumentId(docRef.id);
          // Move to the next step
          setStep(step + 1);
        })
        .catch((error) => {
          console.error('Error saving document: ', error);
        });
    } else {
      // If it's not the first step, update the existing document
      firestore.collection('userInputs').doc(documentId).update(formData)
        .then(() => {
          console.log('Document updated successfully');
          // If it's the last step, show the modal
          if (step === 3) {
            setShowModal(true);
          } else {
            // Move to the next step
            setStep(step + 1);
          }
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    }
  };

  const handleModalOk = () => {
    // Reset form data and step
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      state: '',
      favoriteFood: '',
      remarks: ''
    });
    setStep(1);
    setShowModal(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Step 1: Personal Information</h2>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <button onClick={handleStepSubmit}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: Contact Information</h2>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <button onClick={handleStepSubmit}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Step 3: Additional Information</h2>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Favorite Food:</label>
              <input
                type="text"
                name="favoriteFood"
                value={formData.favoriteFood}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Remarks:</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
              ></textarea>
            </div>
            <button onClick={handleStepSubmit}>Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Form Completed</h2>
            <p>Thank you for completing the form!</p>
            <button onClick={handleModalOk}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
