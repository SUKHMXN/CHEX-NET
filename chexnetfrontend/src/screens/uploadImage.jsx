import React, { useState } from 'react';
import UploadModal from "../components/Modal.jsx"

function ImageUpload() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="App">
      <button onClick={openModal} className="upload-btn">
        Upload Image
      </button>
      {showModal && <UploadModal closeModal={closeModal} />}
    </div>
  );
  
}

export default ImageUpload;