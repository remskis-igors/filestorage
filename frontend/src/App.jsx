import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    try {
      const res = await fetch(`${API_URL}/files/get_all`);
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      setError('Failed to fetch files.');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/files/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      await fetchFiles();
      setFile(null);
    } catch (err) {
      setError('File upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/files/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchFiles();
    } catch (err) {
      setError('File deletion failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2> File Storage</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload} disabled={loading || !file} style={{ marginLeft: '0.5rem' }}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Uploaded Files</h3>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((f) => (
            <li key={f.id} style={{ marginBottom: '0.5rem' }}>
              <a href={f.s3Url} target="_blank" rel="noreferrer">{f.filename}</a>
              <button
                onClick={() => handleDelete(f.id)}
                style={{ marginLeft: '1rem' }}
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
