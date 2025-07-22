function FileItem({ file, onDelete }) {
  return (
    <li>
      <span>{file.filename}</span>
      {' — '}
      <a href={file.s3Url} target="_blank" rel="noopener noreferrer">Download</a>
      {' '}
      <button onClick={() => onDelete(file.id)}>Delete</button>
    </li>
  );
}

export default FileItem;
