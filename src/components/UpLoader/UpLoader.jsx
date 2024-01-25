import React, { useState } from 'react';
import styles from "./uploader.module.scss"
import axios from 'axios';

const UpLoader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append('musicFile', selectedFile);

        await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          },
        });

        setUploading(false);
        setSelectedFile(null);
        setUploadProgress(0);
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploading(false);
      }
    }
  };

  return (
    <div className={styles.musicUploadForm}>
    <label htmlFor="fileInput">Choose a music file:</label>
    <input
      type="file"
      id="fileInput"
      onChange={handleFileChange}
    />
    <p>Selected File: {selectedFile ? selectedFile.name : 'None'}</p>
    <button onClick={handleUpload} disabled={!selectedFile || uploading}>
      {uploading ? 'Uploading...' : 'Upload'}
    </button>
    {uploading && (
      <div className={styles.uploadProgress}>
        <div
          className={styles.progressBar}
          style={{ width: `${uploadProgress}%` }}
        >
          {uploadProgress}%
        </div>
      </div>
    )}
  </div>
  );
};

export default UpLoader;
