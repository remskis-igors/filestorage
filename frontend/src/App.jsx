import { useEffect, useState } from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import FileList from './components/FileList';
import api from './api';

function App() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const fetchFiles = async () => {
    try {
      const res = await api.get('/files/get_all');
      setFiles(res.data);
    } catch (err) {
      setError('Failed to fetch files.');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container">
      <h2>File Storage</h2>
      <UploadForm onUpload={fetchFiles} />
      {error && <p className="error">{error}</p>}
      <FileList files={files} onDelete={fetchFiles} />
    </div>
  );
}

export default App;
