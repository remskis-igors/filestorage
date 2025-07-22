import { useState } from 'react';
import api from '../api';

function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    await api.post('/files/upload', formData);
    onUpload(); // обновить список
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
