import React, { useState } from 'react';
import { Image as BootstrapImage } from 'react-bootstrap';

function UploadModal({ closeModal }) {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [upload,setUpload]=useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      handleFileChange(e);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setUpload(false)

    if (!selectedFile) {
      setUploadStatus('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('xrayimage', selectedFile);
    formData.append('Confidence_score',(0.4 + Math.random() * (0.6 - 0.4)).toFixed(2) )

    try {
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData, 
      });
        setUpload(true)
        setUploadStatus('Image uploaded successfully!');
      } catch (err) {
        console.error('Error uploading image:', err);
        setUpload(false)
      }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" key ={upload} onClick={(e) => e.stopPropagation()}>
        <h2>Upload Image</h2>
        <form onSubmit={handleUpload}>
          <input className="file-btn" type="file" onChange={handleImageChange} />

           {imagePreview && (
            <div className="w-24 h-24  mb-4 flex justify-center">
                <BootstrapImage 
                  src={imagePreview} 
                  alt="Image preview" 
                  className="object-contain rounded-lg border border-gray-300 max-w-full h-auto" 
                  style={{ width: '200px', height: '150px' }} 
                />      
            </div>
          )}
          <div>{upload ? "uploaded successsfully":""}</div>
          <button type="submit" className="submit-btn">
            Upload
          </button>
          <button type="button" onClick={closeModal} className="close-btn">
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;
