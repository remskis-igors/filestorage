import FileItem from './FileItem';
import api from '../api';

function FileList({ files, onDelete }) {
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this file?");
    if (!confirm) return;

    try {
      await api.delete(`/files/${id}`);
      onDelete(); // refresh list
    } catch (error) {
      console.error("Failed to delete file:", error);
      alert("Error deleting file. Please try again.");
    }
  };

  if (files.length === 0) return <p className="empty-list">No files uploaded.</p>;

  return (
    <div className="file-list-container">
      <h3>Uploaded Files ({files.length})</h3>
      <ul className="file-list">
        {files.map((file) => (
          <FileItem key={file.id} file={file} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default FileList;
